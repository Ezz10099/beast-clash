(function () {
  "use strict";

  const arabicGameButton = document.getElementById("arabicGameButton");
  const englishGameButton = document.getElementById("englishGameButton");
  const cellRunnerButton = document.getElementById("cellRunnerButton");
  const launcherStatus = document.getElementById("launcherStatus");

  function randomPart() {
    if (window.crypto && typeof window.crypto.getRandomValues === "function") {
      const values = new Uint32Array(1);
      window.crypto.getRandomValues(values);
      return values[0].toString(36).slice(0, 6);
    }
    return Math.floor(Math.random() * 0xffffff).toString(36).padStart(4, "0").slice(0, 6);
  }

  function makeToken(prefix) {
    const stamp = Date.now().toString(36).slice(-7);
    return (prefix + "-" + stamp + "-" + randomPart()).slice(0, 32);
  }

  function buildGameUrl(language) {
    const url = new URL("index.html", window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("fresh", makeToken(language === "ar" ? "owner-ar" : "owner-en"));
    if (language === "ar") url.searchParams.set("lang", "ar");
    return url.href;
  }

  function buildRunnerUrl() {
    const url = new URL("cell-runner.html", window.location.href);
    url.search = "";
    url.hash = "";
    return url.href;
  }

  function navigate(url, message) {
    if (launcherStatus) launcherStatus.textContent = message;
    window.location.assign(url);
  }

  arabicGameButton.addEventListener("click", function () {
    navigate(buildGameUrl("ar"), "Opening a clean Arabic owner check…");
  });

  englishGameButton.addEventListener("click", function () {
    navigate(buildGameUrl("en"), "Opening a clean English comparison…");
  });

  cellRunnerButton.addEventListener("click", function () {
    navigate(buildRunnerUrl(), "Opening the offline Cell Runner…");
  });

  window.PixelMageTestLauncher = Object.freeze({
    buildGameUrl,
    buildRunnerUrl,
    makeToken,
  });
})();
