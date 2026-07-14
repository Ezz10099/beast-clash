(function () {
  "use strict";

  const FAN_PERIOD = 300;
  const FAN_TELL = 44;
  const FAN_FIRE_WINDOW = 4;
  const SURGE_PERIOD = 250;
  const SURGE_TELL = 38;
  const SURGE_FRAMES = 18;
  const SURGE_RECOVERY = 34;
  const RELAY_RANGE = 128;
  const SEPARATION_RANGE = 27;

  function roleForEnemy(enemy, wave) {
    if (!enemy || enemy.boss || enemy.elite) return "core";
    if (enemy.family === "caster") {
      return wave >= 6 && enemy.id % 2 === 0 ? "fan" : "sniper";
    }
    if (enemy.family === "chaser") {
      if (wave >= 9 && enemy.id % 3 === 0) return "surger";
      if (wave >= 5 && enemy.id % 2 === 0) return "flanker";
      return "pursuer";
    }
    return "core";
  }

  function cycleInfo(time, id, period) {
    const shifted = Math.max(0, Math.floor(time)) + Math.abs(Math.floor(id || 0)) * 37;
    return {
      cycle: Math.floor(shifted / period),
      phase: shifted % period,
    };
  }

  function fanAngles(baseAngle) {
    return [baseAngle - 0.22, baseAngle, baseAngle + 0.22];
  }

  function formationSide(id) {
    return Math.abs(Math.floor(id || 0)) % 2 === 0 ? -1 : 1;
  }

  function clampValue(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function distanceBetween(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  const pureApi = {
    roleForEnemy,
    cycleInfo,
    fanAngles,
    formationSide,
  };

  if (typeof window === "undefined" || typeof document === "undefined") return;

  const fxCanvas = document.querySelector("#enemyFx");
  const gameCanvas = document.querySelector("#game");
  const gameCard = document.querySelector(".game-card");

  if (
    !fxCanvas ||
    !gameCanvas ||
    !gameCard ||
    typeof state === "undefined" ||
    typeof EnemySystem === "undefined" ||
    typeof update !== "function" ||
    typeof draw !== "function"
  ) {
    window.PixelMageEnemyVariety = Object.freeze(pureApi);
    return;
  }

  if (window.PixelMageEnemyVarietyInstalled) return;
  window.PixelMageEnemyVarietyInstalled = true;

  const ctx = fxCanvas.getContext("2d");
  if (!ctx) {
    window.PixelMageEnemyVariety = Object.freeze(pureApi);
    return;
  }

  function initializeEnemy(enemy) {
    if (!enemy || enemy._varietyInitialized) return;
    enemy._varietyInitialized = true;
    enemy._varietyRole = roleForEnemy(enemy, state.wave);
    enemy._varietyBaseSpeed = enemy.speed;
    enemy._varietySide = formationSide(enemy.id);
    enemy._varietyPreparedCycle = -1;
    enemy._varietyDashCycle = -1;
    enemy._varietyFanPreparedCycle = -1;
    enemy._varietyFanFiredCycle = -1;
    enemy._varietyRelayTarget = 0;
    enemy._varietyRelaySource = 0;
    enemy._varietyPhase = "idle";
    enemy._varietyTargetX = enemy.x;
    enemy._varietyTargetY = enemy.y;
    enemy._varietyDashVx = 0;
    enemy._varietyDashVy = 0;
  }

  function restoreBaseSpeed(enemy) {
    if (Number.isFinite(enemy._varietyBaseSpeed)) enemy.speed = enemy._varietyBaseSpeed;
  }

  function slowScale(enemy) {
    return enemy.slowUntil > state.time ? 0.55 : 1;
  }

  function applyFlanker(enemy, player) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const side = enemy._varietySide;
    const scale = slowScale(enemy);
    const curve = distance > 52 ? 0.29 : 0.18;
    enemy.x += (-dy / distance) * side * curve * scale;
    enemy.y += (dx / distance) * side * curve * scale;
    if (distance < 42) {
      enemy.x -= (dx / distance) * 0.13 * scale;
      enemy.y -= (dy / distance) * 0.13 * scale;
    }
    enemy._varietyPhase = "flank";
  }

  function applySurger(enemy, player) {
    const timing = cycleInfo(state.time, enemy.id, SURGE_PERIOD);
    const tellEnd = SURGE_TELL;
    const dashEnd = tellEnd + SURGE_FRAMES;
    const recoveryEnd = dashEnd + SURGE_RECOVERY;

    if (timing.phase < tellEnd) {
      if (enemy._varietyPreparedCycle !== timing.cycle) {
        enemy._varietyPreparedCycle = timing.cycle;
        enemy._varietyTargetX = player.x;
        enemy._varietyTargetY = player.y;
        if (typeof addSparks === "function") addSparks(enemy.x, enemy.y, 7, "#ffb86c");
        if (typeof playSound === "function") playSound("warning");
      }
      enemy.speed = enemy._varietyBaseSpeed * 0.2;
      enemy._varietyPhase = "surgeTell";
      return;
    }

    if (timing.phase < dashEnd && enemy._varietyPreparedCycle === timing.cycle) {
      if (enemy._varietyDashCycle !== timing.cycle) {
        const dx = enemy._varietyTargetX - enemy.x;
        const dy = enemy._varietyTargetY - enemy.y;
        const length = Math.max(1, Math.hypot(dx, dy));
        enemy._varietyDashVx = (dx / length) * 3.25;
        enemy._varietyDashVy = (dy / length) * 3.25;
        enemy._varietyDashCycle = timing.cycle;
      }
      const scale = slowScale(enemy);
      enemy.speed = enemy._varietyBaseSpeed * 0.08;
      enemy.x += enemy._varietyDashVx * scale;
      enemy.y += enemy._varietyDashVy * scale;
      enemy._varietyPhase = "surge";
      if (state.time % 2 === 0 && typeof addSparks === "function") addSparks(enemy.x, enemy.y, 1, "#ffb86c");
      return;
    }

    if (timing.phase < recoveryEnd) {
      enemy.speed = enemy._varietyBaseSpeed * 0.48;
      enemy._varietyPhase = "recover";
      return;
    }

    enemy._varietyPhase = "pursue";
  }

  function prepareFanCaster(enemy, player, timing) {
    if (enemy._varietyFanPreparedCycle === timing.cycle) return;
    if (enemy.attackState === "aim") return;
    enemy._varietyFanPreparedCycle = timing.cycle;
    enemy._varietyTargetX = player.x;
    enemy._varietyTargetY = player.y;
    enemy._varietyPhase = "fanTell";
    enemy.attackState = "reposition";
    enemy.attackTimer = Math.max(enemy.attackTimer, FAN_TELL + 3);
    if (typeof addSparks === "function") addSparks(enemy.x, enemy.y, 8, "#c7a7ff");
    if (typeof playSound === "function") playSound("warning");
  }

  function fireFan(enemy) {
    const dx = enemy._varietyTargetX - enemy.x;
    const dy = enemy._varietyTargetY - enemy.y;
    const baseAngle = Math.atan2(dy, dx);
    for (const angle of fanAngles(baseAngle)) {
      EnemySystem.fireProjectile(
        enemy.x,
        enemy.y,
        Math.cos(angle) * 1.82,
        Math.sin(angle) * 1.82,
        "#c7a7ff",
        205,
      );
    }
    enemy.attackState = "reposition";
    enemy.attackTimer = 88;
    enemy._varietyPhase = "fanRecover";
    if (typeof addSparks === "function") addSparks(enemy.x, enemy.y, 10, "#c7a7ff");
  }

  function applyFanCaster(enemy, player) {
    const timing = cycleInfo(state.time, enemy.id, FAN_PERIOD);
    if (timing.phase < FAN_TELL) {
      prepareFanCaster(enemy, player, timing);
      if (enemy._varietyFanPreparedCycle === timing.cycle) {
        enemy.attackState = "reposition";
        enemy.attackTimer = Math.max(enemy.attackTimer, FAN_TELL - timing.phase + 2);
        enemy._varietyPhase = "fanTell";
      }
      return;
    }

    if (
      timing.phase < FAN_TELL + FAN_FIRE_WINDOW &&
      enemy._varietyFanPreparedCycle === timing.cycle &&
      enemy._varietyFanFiredCycle !== timing.cycle
    ) {
      enemy._varietyFanFiredCycle = timing.cycle;
      fireFan(enemy);
      return;
    }

    if (enemy._varietyPhase === "fanTell") enemy._varietyPhase = "fanRecover";
  }

  function separateChasers(chasers) {
    if (state.wave < 3) return;
    for (let firstIndex = 0; firstIndex < chasers.length; firstIndex += 1) {
      const first = chasers[firstIndex];
      for (let secondIndex = firstIndex + 1; secondIndex < chasers.length; secondIndex += 1) {
        const second = chasers[secondIndex];
        const dx = first.x - second.x;
        const dy = first.y - second.y;
        const distance = Math.hypot(dx, dy);
        if (distance >= SEPARATION_RANGE) continue;
        const length = Math.max(1, distance);
        const force = (SEPARATION_RANGE - distance) / SEPARATION_RANGE * 0.16;
        const nx = distance < 0.01 ? (first.id < second.id ? -1 : 1) : dx / length;
        const ny = distance < 0.01 ? 0 : dy / length;
        first.x += nx * force;
        first.y += ny * force;
        second.x -= nx * force;
        second.y -= ny * force;
      }
    }
  }

  function assignRelayLinks(casters, chasers, player) {
    for (const enemy of casters) enemy._varietyRelayTarget = 0;
    for (const enemy of chasers) enemy._varietyRelaySource = 0;
    if (state.wave < 6) return;

    const claimed = new Set();
    for (const caster of casters) {
      let target = null;
      let nearest = RELAY_RANGE;
      for (const chaser of chasers) {
        if (claimed.has(chaser.id)) continue;
        const distance = distanceBetween(caster, chaser);
        if (distance < nearest) {
          nearest = distance;
          target = chaser;
        }
      }
      if (!target) continue;
      claimed.add(target.id);
      caster._varietyRelayTarget = target.id;
      target._varietyRelaySource = caster.id;

      const dx = player.x - target.x;
      const dy = player.y - target.y;
      const length = Math.max(1, Math.hypot(dx, dy));
      const boost = 0.11 * slowScale(target);
      target.x += (dx / length) * boost;
      target.y += (dy / length) * boost;
    }
  }

  function clampEnemy(enemy) {
    enemy.x = clampValue(enemy.x, 18, 302);
    enemy.y = clampValue(enemy.y, 64, 452);
  }

  function stepVariety() {
    if (state.mode !== "playing" || state.menuOpen || !state.player) return;

    const living = state.enemies.filter(function (enemy) { return enemy.hp > 0; });
    const chasers = [];
    const casters = [];

    for (const enemy of living) {
      initializeEnemy(enemy);
      restoreBaseSpeed(enemy);
      if (enemy.boss || enemy.elite) continue;
      if (enemy.family === "chaser") chasers.push(enemy);
      if (enemy.family === "caster") casters.push(enemy);
    }

    for (const enemy of chasers) {
      if (enemy._varietyRole === "flanker") applyFlanker(enemy, state.player);
      else if (enemy._varietyRole === "surger") applySurger(enemy, state.player);
      else enemy._varietyPhase = "pursue";
    }

    for (const enemy of casters) {
      if (enemy._varietyRole === "fan") applyFanCaster(enemy, state.player);
      else enemy._varietyPhase = enemy.attackState === "aim" ? "aim" : "reposition";
    }

    separateChasers(chasers);
    assignRelayLinks(casters, chasers, state.player);
    for (const enemy of living) clampEnemy(enemy);
  }

  function drawRelayLinks(living) {
    const byId = new Map(living.map(function (enemy) { return [enemy.id, enemy]; }));
    ctx.save();
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 5]);
    for (const caster of living) {
      if (!caster._varietyRelayTarget) continue;
      const target = byId.get(caster._varietyRelayTarget);
      if (!target) continue;
      ctx.globalAlpha = 0.46;
      ctx.strokeStyle = "#c7a7ff";
      ctx.beginPath();
      ctx.moveTo(caster.x, caster.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
      ctx.globalAlpha = 0.68;
      ctx.fillStyle = "#fff0be";
      ctx.fillRect(Math.round(target.x - 2), Math.round(target.y - 2), 4, 4);
    }
    ctx.restore();
  }

  function drawFlanker(enemy) {
    const side = enemy._varietySide;
    ctx.save();
    ctx.globalAlpha = 0.62;
    ctx.strokeStyle = "#9bf6ff";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, 15, side < 0 ? Math.PI * 0.62 : -Math.PI * 0.38, side < 0 ? Math.PI * 1.38 : Math.PI * 0.38);
    ctx.stroke();
    ctx.restore();
  }

  function drawSurger(enemy) {
    if (enemy._varietyPhase !== "surgeTell" && enemy._varietyPhase !== "surge") return;
    ctx.save();
    ctx.strokeStyle = "#ffb86c";
    ctx.lineWidth = enemy._varietyPhase === "surge" ? 3 : 2;
    ctx.globalAlpha = enemy._varietyPhase === "surge" ? 0.82 : 0.72;
    if (enemy._varietyPhase === "surgeTell") ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy._varietyPhase === "surge" ? 18 : 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(enemy.x, enemy.y);
    ctx.lineTo(enemy._varietyTargetX, enemy._varietyTargetY);
    ctx.stroke();
    ctx.restore();
  }

  function drawFanCaster(enemy) {
    if (enemy._varietyPhase !== "fanTell") return;
    const dx = enemy._varietyTargetX - enemy.x;
    const dy = enemy._varietyTargetY - enemy.y;
    const distance = Math.max(40, Math.hypot(dx, dy));
    const baseAngle = Math.atan2(dy, dx);
    ctx.save();
    ctx.globalAlpha = 0.62;
    ctx.strokeStyle = "#c7a7ff";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 5]);
    for (const angle of fanAngles(baseAngle)) {
      ctx.beginPath();
      ctx.moveTo(enemy.x, enemy.y);
      ctx.lineTo(enemy.x + Math.cos(angle) * distance, enemy.y + Math.sin(angle) * distance);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, 18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawVarietyFx() {
    ctx.clearRect(0, 0, fxCanvas.width || 320, fxCanvas.height || 480);
    if (state.mode !== "playing" || state.menuOpen || gameCard.dataset.screen !== "playing") return;

    const living = state.enemies.filter(function (enemy) { return enemy.hp > 0; });
    drawRelayLinks(living);
    for (const enemy of living) {
      if (enemy._varietyRole === "flanker") drawFlanker(enemy);
      else if (enemy._varietyRole === "surger") drawSurger(enemy);
      else if (enemy._varietyRole === "fan") drawFanCaster(enemy);
    }
  }

  const baseUpdate = update;
  const baseDraw = draw;
  update = function () {
    baseUpdate();
    stepVariety();
  };
  draw = function () {
    baseDraw();
    drawVarietyFx();
  };

  window.PixelMageEnemyVariety = Object.freeze({
    ...pureApi,
    step: stepVariety,
    draw: drawVarietyFx,
  });
})();
