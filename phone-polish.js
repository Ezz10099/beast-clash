(function () {
  "use strict";

  const gameCard = document.querySelector(".game-card");
  const healthText = document.querySelector("#healthText");
  const waveText = document.querySelector("#waveText");
  const healthMeter = document.querySelector("#healthMeter");
  const waveMeter = document.querySelector("#waveMeter");
  const newRunButton = document.querySelector("#newRunButton");
  const menuStatus = document.querySelector("#menuStatus");
  const canvas = document.querySelector("#game");

  if (!gameCard || !healthText || !waveText || !healthMeter || !waveMeter) return;

  function makeSegments(container, count) {
    container.replaceChildren();
    container.style.setProperty("--meter-count", String(count));
    for (let index = 0; index < count; index += 1) {
      const segment = document.createElement("i");
      segment.className = "meter-segment";
      segment.setAttribute("aria-hidden", "true");
      container.append(segment);
    }
    return Array.from(container.children);
  }

  let healthSegments = makeSegments(healthMeter, 5);
  const waveSegments = makeSegments(waveMeter, 12);

  function parseHealth(value) {
    const match = String(value || "").match(/(\d+)\s*\/\s*(\d+)/);
    if (!match) return null;
    return { current: Number(match[1]), maximum: Math.max(1, Number(match[2])) };
  }

  function parseWave(value) {
    const text = String(value || "");
    let match = text.match(/(?:Wave|الموجة)\s*(\d+)\s*\/\s*(\d+)/i);
    if (match) return { current: Number(match[1]), maximum: Number(match[2]) };
    match = text.match(/(?:\bW|الموجة\s+)(\d+)/i);
    if (match) return { current: Number(match[1]), maximum: 12 };
    match = text.match(/(?:Wave|الموجة)\s*(\d+)\s*(?:Clear|اكتملت)?/i);
    if (match) return { current: Number(match[1]), maximum: 12 };
    if (/Complete|اكتمل/i.test(text)) return { current: 12, maximum: 12 };
    return { current: 0, maximum: 12 };
  }

  function updateMeters() {
    const health = parseHealth(healthText.textContent);
    if (health) {
      if (healthSegments.length !== health.maximum) healthSegments = makeSegments(healthMeter, health.maximum);
      healthSegments.forEach(function (segment, index) {
        segment.dataset.filled = String(index < health.current);
      });
      const ratio = health.current / health.maximum;
      gameCard.dataset.healthState = ratio <= 0.25 ? "critical" : ratio <= 0.5 ? "low" : "safe";
    }

    const wave = parseWave(waveText.textContent);
    waveSegments.forEach(function (segment, index) {
      const waveNumber = index + 1;
      segment.dataset.filled = String(waveNumber <= wave.current);
      segment.dataset.current = String(wave.current > 0 && waveNumber === Math.min(12, wave.current));
    });
  }

  updateMeters();
  if (typeof MutationObserver === "function") {
    const observer = new MutationObserver(updateMeters);
    observer.observe(healthText, { childList: true, characterData: true, subtree: true });
    observer.observe(waveText, { childList: true, characterData: true, subtree: true });
  }

  let restartArmedUntil = 0;
  let restartTimer = null;
  let savedRestartLabel = "";
  let savedMenuStatus = "";

  function isArabic() {
    return document.documentElement && document.documentElement.lang === "ar";
  }

  function disarmRestart() {
    restartArmedUntil = 0;
    if (restartTimer !== null) {
      clearTimeout(restartTimer);
      restartTimer = null;
    }
    if (newRunButton) {
      newRunButton.classList.remove("new-run-confirming");
      if (savedRestartLabel) newRunButton.textContent = savedRestartLabel;
    }
    if (menuStatus && savedMenuStatus) menuStatus.textContent = savedMenuStatus;
    savedRestartLabel = "";
    savedMenuStatus = "";
  }

  if (newRunButton) {
    newRunButton.addEventListener("click", function (event) {
      const label = newRunButton.textContent.trim();
      const destructive = label === "Restart Trial" || label === "إعادة الاختبار" || newRunButton.classList.contains("new-run-confirming");
      if (!destructive) {
        disarmRestart();
        return;
      }

      const now = Date.now();
      if (restartArmedUntil > now) {
        disarmRestart();
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      savedRestartLabel = label;
      savedMenuStatus = menuStatus ? menuStatus.textContent : "";
      restartArmedUntil = now + 3200;
      newRunButton.classList.add("new-run-confirming");
      newRunButton.textContent = isArabic() ? "اضغط مرة أخرى لإعادة الاختبار" : "Tap again to restart";
      if (menuStatus) {
        menuStatus.textContent = isArabic()
          ? "لن تُحذف المحاولة إلا إذا ضغطت الزر مرة أخرى."
          : "Your run is safe unless you tap the button again.";
      }
      restartTimer = setTimeout(disarmRestart, 3200);
    }, true);
  }

  if (canvas) {
    canvas.addEventListener("pointerdown", function (event) {
      if (event.pointerType !== "mouse") document.body.dataset.lastInput = "touch";
    });
  }

  window.PixelMagePhonePolish = Object.freeze({
    parseHealth,
    parseWave,
    updateMeters,
    disarmRestart,
  });
})();
