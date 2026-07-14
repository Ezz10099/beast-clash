(function () {
  "use strict";

  const FX_WIDTH = 320;
  const FX_HEIGHT = 480;
  const ACT_COLORS = Object.freeze({
    1: Object.freeze({ core: "#9bf6ff", haze: "rgba(92, 147, 205, 0.12)" }),
    2: Object.freeze({ core: "#d9b8ff", haze: "rgba(125, 91, 214, 0.14)" }),
    3: Object.freeze({ core: "#ffd166", haze: "rgba(255, 140, 66, 0.14)" }),
  });
  const ESSENCE_COLORS = Object.freeze({
    ember: Object.freeze({ core: "#ff8c42", light: "#ffd08a" }),
    frost: Object.freeze({ core: "#61d4e8", light: "#d9fbff" }),
  });

  function parseHealth(value) {
    const match = String(value || "").match(/(\d+)\s*\/\s*(\d+)/);
    if (!match) return null;
    return { current: Number(match[1]), maximum: Math.max(1, Number(match[2])) };
  }

  function parseWave(value) {
    const text = String(value || "");
    let match = text.match(/(?:\bW|الموجة\s+)(\d+)/i);
    if (match) return Number(match[1]);
    match = text.match(/(?:Wave|الموجة)\s*(\d+)/i);
    if (match) return Number(match[1]);
    if (/Complete|اكتمل/i.test(text)) return 12;
    return 0;
  }

  function parseEssence(value) {
    const text = String(value || "");
    if (/Frost|صقيع/i.test(text)) return "frost";
    return "ember";
  }

  function actForWave(wave) {
    if (wave >= 9) return 3;
    if (wave >= 5) return 2;
    return 1;
  }

  window.PixelMageArenaFx = Object.freeze({ parseHealth, parseWave, parseEssence, actForWave });

  const fxCanvas = document.querySelector("#arenaFx");
  const gameCanvas = document.querySelector("#game");
  const gameCard = document.querySelector(".game-card");
  const healthText = document.querySelector("#healthText");
  const waveText = document.querySelector("#waveText");
  const spellText = document.querySelector("#spellText");
  if (!fxCanvas || !gameCanvas || !gameCard || !healthText || !waveText || !spellText) return;

  const ctx = fxCanvas.getContext("2d");
  if (!ctx) return;

  const reducedMotion = typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fx = {
    health: 5,
    maximumHealth: 5,
    wave: 0,
    act: 1,
    essence: "ember",
    damagePulse: 0,
    wavePulse: 0,
    touchActive: false,
    trail: [],
    lastFrame: 0,
    lastStatusSync: 0,
  };

  function syncDisplayedStatus() {
    const health = parseHealth(healthText.textContent);
    if (health) {
      if (health.current < fx.health) fx.damagePulse = 1;
      fx.health = health.current;
      fx.maximumHealth = health.maximum;
    }

    const wave = parseWave(waveText.textContent);
    if (wave > 0 && wave !== fx.wave) fx.wavePulse = 1;
    fx.wave = wave;
    fx.act = actForWave(wave);
    fx.essence = parseEssence(spellText.textContent);
  }

  function pointFromEvent(event) {
    const rect = gameCanvas.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    return {
      x: Math.max(0, Math.min(FX_WIDTH, (event.clientX - rect.left) * FX_WIDTH / width)),
      y: Math.max(0, Math.min(FX_HEIGHT, (event.clientY - rect.top) * FX_HEIGHT / height)),
      life: 1,
    };
  }

  function addTrailPoint(event) {
    const point = pointFromEvent(event);
    const previous = fx.trail[fx.trail.length - 1];
    if (!previous || Math.hypot(point.x - previous.x, point.y - previous.y) >= 3) {
      fx.trail.push(point);
      if (fx.trail.length > 18) fx.trail.splice(0, fx.trail.length - 18);
    } else {
      previous.life = 1;
    }
  }

  gameCanvas.addEventListener("pointerdown", function (event) {
    fx.touchActive = true;
    addTrailPoint(event);
  });
  gameCanvas.addEventListener("pointermove", function (event) {
    if (fx.touchActive) addTrailPoint(event);
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach(function (type) {
    gameCanvas.addEventListener(type, function () { fx.touchActive = false; });
  });

  function drawAmbient(seconds) {
    const actColor = ACT_COLORS[fx.act] || ACT_COLORS[1];
    const essence = ESSENCE_COLORS[fx.essence] || ESSENCE_COLORS.ember;
    const motion = reducedMotion ? 0 : seconds;

    const glow = ctx.createRadialGradient(FX_WIDTH / 2, FX_HEIGHT * 0.48, 36, FX_WIDTH / 2, FX_HEIGHT * 0.48, 228);
    glow.addColorStop(0, "rgba(0, 0, 0, 0)");
    glow.addColorStop(0.72, actColor.haze);
    glow.addColorStop(1, "rgba(4, 8, 17, 0.38)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, FX_WIDTH, FX_HEIGHT);

    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = actColor.core;
    ctx.lineWidth = 1;
    for (let index = 0; index < 10; index += 1) {
      const phase = index * 0.73;
      const x = 18 + ((index * 47 + motion * (6 + index % 3)) % (FX_WIDTH - 36));
      const y = 58 + ((index * 67 + motion * (4 + index % 2)) % (FX_HEIGHT - 108));
      const size = 3 + index % 3;
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x, y - size);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y + size);
      ctx.closePath();
      ctx.stroke();
      if (index % 3 === 0) {
        ctx.fillStyle = essence.light;
        ctx.globalAlpha = 0.14 + Math.sin(motion * 2 + phase) * 0.04;
        ctx.fillRect(Math.round(x - 1), Math.round(y - 1), 2, 2);
        ctx.globalAlpha = 0.2;
      }
    }
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = essence.core;
    ctx.lineWidth = 2;
    ctx.strokeRect(3.5, 3.5, FX_WIDTH - 7, FX_HEIGHT - 7);
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = actColor.core;
    ctx.strokeRect(8.5, 8.5, FX_WIDTH - 17, FX_HEIGHT - 17);
    ctx.restore();
  }

  function drawTrail() {
    const essence = ESSENCE_COLORS[fx.essence] || ESSENCE_COLORS.ember;
    if (fx.trail.length < 1) return;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let index = 1; index < fx.trail.length; index += 1) {
      const previous = fx.trail[index - 1];
      const point = fx.trail[index];
      const alpha = Math.max(0, Math.min(previous.life, point.life)) * 0.34;
      if (alpha <= 0) continue;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = essence.light;
      ctx.lineWidth = 1.5 + point.life * 1.5;
      ctx.beginPath();
      ctx.moveTo(previous.x, previous.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }

    const latest = fx.trail[fx.trail.length - 1];
    if (latest && latest.life > 0.05) {
      ctx.globalAlpha = latest.life * (fx.touchActive ? 0.62 : 0.3);
      ctx.strokeStyle = essence.light;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(latest.x, latest.y, 6 + (1 - latest.life) * 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = essence.core;
      ctx.fillRect(Math.round(latest.x - 1), Math.round(latest.y - 1), 3, 3);
    }
    ctx.restore();
  }

  function drawWavePulse() {
    if (fx.wavePulse <= 0) return;
    const actColor = ACT_COLORS[fx.act] || ACT_COLORS[1];
    ctx.save();
    ctx.globalAlpha = fx.wavePulse * 0.32;
    ctx.strokeStyle = actColor.core;
    ctx.lineWidth = 2 + fx.wavePulse * 4;
    ctx.strokeRect(4, 4, FX_WIDTH - 8, FX_HEIGHT - 8);
    ctx.globalAlpha = fx.wavePulse * 0.08;
    ctx.fillStyle = actColor.core;
    ctx.fillRect(0, 0, FX_WIDTH, FX_HEIGHT);
    ctx.restore();
  }

  function drawDamageFeedback(seconds) {
    const ratio = fx.maximumHealth > 0 ? fx.health / fx.maximumHealth : 1;
    const criticalPulse = ratio <= 0.25 ? 0.15 + (reducedMotion ? 0.08 : (Math.sin(seconds * 5) + 1) * 0.07) : 0;
    const alpha = Math.max(fx.damagePulse * 0.42, criticalPulse);
    if (alpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#ff465f";
    ctx.fillRect(0, 0, FX_WIDTH, 14);
    ctx.fillRect(0, FX_HEIGHT - 14, FX_WIDTH, 14);
    ctx.fillRect(0, 14, 12, FX_HEIGHT - 28);
    ctx.fillRect(FX_WIDTH - 12, 14, 12, FX_HEIGHT - 28);
    ctx.globalAlpha = alpha * 0.5;
    ctx.strokeStyle = "#fff0be";
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, FX_WIDTH - 4, FX_HEIGHT - 4);
    ctx.restore();
  }

  function advance(delta) {
    const trailFade = reducedMotion ? 0.16 : 0.052;
    fx.trail.forEach(function (point) { point.life -= delta * trailFade * 60; });
    fx.trail = fx.trail.filter(function (point) { return point.life > 0; });
    fx.damagePulse = Math.max(0, fx.damagePulse - delta * 2.5);
    fx.wavePulse = Math.max(0, fx.wavePulse - delta * 1.55);
  }

  function drawFrame(timestamp) {
    const delta = fx.lastFrame ? Math.min(0.05, (timestamp - fx.lastFrame) / 1000) : 0;
    fx.lastFrame = timestamp;
    if (timestamp - fx.lastStatusSync >= 90) {
      syncDisplayedStatus();
      fx.lastStatusSync = timestamp;
    }
    advance(delta);
    ctx.clearRect(0, 0, FX_WIDTH, FX_HEIGHT);

    if (gameCard.dataset.screen === "playing") {
      const seconds = timestamp / 1000;
      drawAmbient(seconds);
      drawTrail();
      drawWavePulse();
      drawDamageFeedback(seconds);
    }

    if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(drawFrame);
  }

  syncDisplayedStatus();
  if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(drawFrame);
})();
