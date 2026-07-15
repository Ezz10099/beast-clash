(function () {
  "use strict";

  const FOCUS_THRESHOLD = 3;
  const WARD_THRESHOLD = 3;
  const WARD_RADIUS = 76;
  const EMBER_CHAIN_RADIUS = 56;
  const DEPTH_SAMPLE_INTERVAL = 6;

  const IDENTITIES = Object.freeze({
    "bolt|ember|split": Object.freeze({
      name: "Wildfire Volley",
      nameAr: "وابل اللهب",
      promise: "Split bolts hunt different threats; burning defeats erupt.",
      promiseAr: "تلاحق الصواعق المنقسمة أهدافًا مختلفة، وينفجر العدو المحترق عند هزيمته.",
    }),
    "bolt|ember|echo": Object.freeze({
      name: "Afterburn Script",
      nameAr: "مخطوطة اللهيب اللاحق",
      promise: "Focus one marked threat; the echo resonates through an active burn.",
      promiseAr: "تركّز على هدف محدد، وتزداد قوة الصدى إذا كان الهدف محترقًا.",
    }),
    "bolt|frost|split": Object.freeze({
      name: "Crystal Hunt",
      nameAr: "مطاردة بلورية",
      promise: "Split bolts spread control; repeated frost hits freeze movement.",
      promiseAr: "توزّع الصواعق المنقسمة الصقيع، وتجمّد الإصابات المتكررة حركة العدو.",
    }),
    "bolt|frost|echo": Object.freeze({
      name: "Shatter Script",
      nameAr: "مخطوطة التحطيم",
      promise: "Precision and echo build frost quickly, then shatter frozen targets.",
      promiseAr: "تراكم الدقة والصدى الصقيع سريعًا، ثم تحطمان الأهداف المتجمدة.",
    }),
    "orbit|ember|split": Object.freeze({
      name: "Solar Rings",
      nameAr: "حلقات شمسية",
      promise: "Three burning rings hold close space and trigger chain eruptions.",
      promiseAr: "تحمي ثلاث حلقات مشتعلة المساحة القريبة وتطلق انفجارات متسلسلة.",
    }),
    "orbit|ember|echo": Object.freeze({
      name: "Cinder Aegis",
      nameAr: "درع الجمر",
      promise: "A sustained burning ward converts blocked shots into a pulse.",
      promiseAr: "يحافظ الصدى على درع مشتعل يحوّل صد المقذوفات إلى نبضة هجومية.",
    }),
    "orbit|frost|split": Object.freeze({
      name: "Glacial Bastion",
      nameAr: "حصن جليدي",
      promise: "Layered rings block lanes and freeze nearby crowds.",
      promiseAr: "تغلق الحلقات المتعددة الممرات وتجمّد الأعداء القريبين.",
    }),
    "orbit|frost|echo": Object.freeze({
      name: "Winter Ward",
      nameAr: "حارس الشتاء",
      promise: "A lasting frost ward blocks fire and locks nearby threats.",
      promiseAr: "يحافظ الصدى على حارس صقيع يصد النيران ويثبت الأعداء القريبين.",
    }),
  });

  function spellKey(spell) {
    const value = spell || {};
    return `${value.form || "bolt"}|${value.essence || "ember"}|${value.law || "split"}`;
  }

  function identityForSpell(spell, language) {
    const identity = IDENTITIES[spellKey(spell)] || IDENTITIES["bolt|ember|split"];
    return {
      name: language === "ar" ? identity.nameAr : identity.name,
      promise: language === "ar" ? identity.promiseAr : identity.promise,
    };
  }

  function splitTargetIds(enemies, primaryId, count) {
    const living = (Array.isArray(enemies) ? enemies : [])
      .filter(function (enemy) { return enemy && enemy.hp > 0; })
      .slice()
      .sort(function (first, second) {
        if (first.id === primaryId) return -1;
        if (second.id === primaryId) return 1;
        const firstPriority = (first.family === "caster" ? 30 : 0) + (first.elite ? 45 : 0) + (first.boss ? 35 : 0);
        const secondPriority = (second.family === "caster" ? 30 : 0) + (second.elite ? 45 : 0) + (second.boss ? 35 : 0);
        if (firstPriority !== secondPriority) return secondPriority - firstPriority;
        return first.id - second.id;
      });
    if (living.length === 0) return [];
    const result = [];
    const wanted = Math.max(1, Number(count) || 1);
    for (let index = 0; index < wanted; index += 1) result.push(living[index % living.length].id);
    return result;
  }

  function freezeDuration(enemy) {
    if (enemy && enemy.boss) return 18;
    if (enemy && enemy.elite) return 28;
    return 42;
  }

  function resonanceEligible(projectile, before, time) {
    if (!projectile || projectile.echoed !== true || !before) return false;
    if (projectile.essence === "ember") return Number(before.burnUntil || 0) > time;
    if (projectile.essence === "frost") return Number(before.slowUntil || 0) > time;
    return false;
  }

  function meterState(spell, focus, ward) {
    if (spell && spell.form === "orbit") {
      return { current: Math.max(0, ward || 0), maximum: WARD_THRESHOLD, kind: "ward" };
    }
    return { current: Math.max(0, focus || 0), maximum: FOCUS_THRESHOLD, kind: "focus" };
  }

  const pureApi = Object.freeze({
    spellKey,
    identityForSpell,
    splitTargetIds,
    freezeDuration,
    resonanceEligible,
    meterState,
  });

  const root = typeof window !== "undefined" ? window : globalThis;
  root.PixelMageSpellDepth = pureApi;
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const fxCanvas = document.querySelector("#spellFx");
  const gameCard = document.querySelector(".game-card");
  const identityText = document.querySelector("#spellIdentityText");
  const comboText = document.querySelector("#spellComboText");
  const meter = document.querySelector("#spellDepthMeter");
  const meterFill = document.querySelector("#spellDepthMeterFill");
  const meterLabel = document.querySelector("#spellDepthMeterLabel");

  if (
    !fxCanvas || !gameCard || !identityText || !comboText || !meter || !meterFill || !meterLabel ||
    typeof state === "undefined" || typeof EnemySystem === "undefined" ||
    typeof update !== "function" || typeof draw !== "function"
  ) return;

  if (window.PixelMageSpellDepthInstalled) return;
  window.PixelMageSpellDepthInstalled = true;

  const fx = fxCanvas.getContext("2d");
  if (!fx) return;

  const language = new URLSearchParams(window.location.search || "").get("lang") === "ar" ? "ar" : "en";
  const hitMemory = new WeakMap();
  const initializedProjectiles = new WeakSet();
  const effects = [];
  const depthState = {
    ward: 0,
    lastSpellKey: "",
    lastUiAt: -Infinity,
    lastSeenTime: 0,
    eventText: "",
    eventUntil: 0,
  };

  function resetTransientDepth() {
    depthState.ward = 0;
    depthState.lastSpellKey = "";
    depthState.lastUiAt = -Infinity;
    depthState.eventText = "";
    depthState.eventUntil = 0;
    effects.length = 0;
  }

  function detectRunBoundary() {
    if (state.time < depthState.lastSeenTime) resetTransientDepth();
    depthState.lastSeenTime = state.time;
  }

  function effect(type, x, y, color, radius) {
    effects.push({ type, x, y, color, radius: radius || 18, life: 28, maxLife: 28 });
    if (effects.length > 48) effects.splice(0, effects.length - 48);
  }

  function eventLabel(english, arabic) {
    depthState.eventText = language === "ar" ? arabic : english;
    depthState.eventUntil = state.time + 72;
  }

  function enemySnapshot() {
    const result = new Map();
    for (const enemy of state.enemies) {
      result.set(enemy.id, {
        enemy,
        hp: enemy.hp,
        burnUntil: enemy.burnUntil,
        slowUntil: enemy.slowUntil,
        x: enemy.x,
        y: enemy.y,
        attackTimer: enemy.attackTimer,
      });
    }
    return result;
  }

  function frozenSnapshots() {
    const result = [];
    for (const enemy of state.enemies) {
      if (Number(enemy._spellDepthFrozenUntil || 0) <= state.time) continue;
      result.push({ enemy, x: enemy.x, y: enemy.y, attackTimer: enemy.attackTimer });
    }
    return result;
  }

  function restoreFrozenEnemies(snapshots) {
    for (const snapshot of snapshots) {
      const enemy = snapshot.enemy;
      if (!enemy || enemy.hp <= 0 || Number(enemy._spellDepthFrozenUntil || 0) <= state.time) continue;
      enemy.x = snapshot.x;
      enemy.y = snapshot.y;
      enemy.attackTimer = snapshot.attackTimer;
      enemy.slowUntil = Math.max(enemy.slowUntil || 0, enemy._spellDepthFrozenUntil);
    }
  }

  function initializeProjectile(projectile) {
    if (!projectile || initializedProjectiles.has(projectile)) return;
    initializedProjectiles.add(projectile);
    if (projectile.kind !== "bolt" || projectile.law !== "split") return;
    const targets = splitTargetIds(state.enemies, projectile.targetId, 3);
    if (targets.length === 0) return;
    const index = Math.max(0, Number(projectile.copyIndex) || 0) % targets.length;
    projectile.targetId = targets[index];
    const target = state.enemies.find(function (enemy) { return enemy.id === projectile.targetId && enemy.hp > 0; });
    if (!target) return;
    const dx = target.x - projectile.x;
    const dy = target.y - projectile.y;
    const length = Math.max(1, Math.hypot(dx, dy));
    projectile.vx = (dx / length) * projectile.speed;
    projectile.vy = (dy / length) * projectile.speed;
  }

  function addDirectHit(enemy, damage, essence) {
    if (!enemy || enemy.hp <= 0 || damage <= 0) return;
    EnemySystem.applySpellHit(enemy, damage, essence);
  }

  function triggerPrecision(projectile, enemy) {
    if (projectile.kind !== "bolt" || !enemy || enemy.hp <= 0) return;
    enemy._spellDepthFocus = Number(enemy._spellDepthFocus || 0) + 1;
    if (enemy._spellDepthFocus < FOCUS_THRESHOLD) return;
    enemy._spellDepthFocus = 0;
    addDirectHit(enemy, projectile.damage * 0.68, projectile.essence);
    effect("precision", enemy.x, enemy.y, "#ffe7ae", 24);
    eventLabel("PRECISION BURST", "ضربة دقيقة");
  }

  function triggerFrost(projectile, enemy) {
    if (projectile.essence !== "frost" || !enemy || enemy.hp <= 0) return;
    if (Number(enemy._spellDepthFrozenUntil || 0) > state.time) {
      enemy._spellDepthFrozenUntil = state.time;
      enemy._spellDepthChill = 0;
      addDirectHit(enemy, projectile.damage * 0.48, "frost");
      effect("shatter", enemy.x, enemy.y, "#d9fbff", 30);
      eventLabel("SHATTER", "تحطيم جليدي");
      return;
    }
    enemy._spellDepthChill = Number(enemy._spellDepthChill || 0) + 1;
    const threshold = enemy.boss ? 5 : enemy.elite ? 4 : 3;
    if (enemy._spellDepthChill < threshold) return;
    enemy._spellDepthChill = 0;
    enemy._spellDepthFrozenUntil = state.time + freezeDuration(enemy);
    enemy.slowUntil = Math.max(enemy.slowUntil || 0, enemy._spellDepthFrozenUntil);
    effect("freeze", enemy.x, enemy.y, "#61d4e8", Math.max(enemy.w, enemy.h) + 16);
    eventLabel("FROZEN", "تجمّد");
  }

  function triggerResonance(projectile, enemy, before) {
    if (!enemy || enemy.hp <= 0 || !resonanceEligible(projectile, before, state.time)) return;
    addDirectHit(enemy, projectile.damage * 0.42, projectile.essence);
    effect("resonance", enemy.x, enemy.y, projectile.essence === "ember" ? "#ffd08a" : "#9bf6ff", 28);
    eventLabel("ECHO RESONANCE", "تناغم الصدى");
  }

  function triggerEmberChain(projectile, enemy) {
    if (projectile.essence !== "ember" || !enemy || enemy.hp > 0 || enemy._spellDepthEmberBurst) return;
    enemy._spellDepthEmberBurst = true;
    let chained = 0;
    for (const nearby of state.enemies) {
      if (nearby.id === enemy.id || nearby.hp <= 0) continue;
      if (Math.hypot(nearby.x - enemy.x, nearby.y - enemy.y) > EMBER_CHAIN_RADIUS) continue;
      addDirectHit(nearby, projectile.damage * 0.38, "ember");
      chained += 1;
    }
    effect("ember", enemy.x, enemy.y, "#ff8c42", EMBER_CHAIN_RADIUS);
    if (chained > 0) eventLabel("EMBER CHAIN", "سلسلة لهب");
  }

  function processNewHits(projectiles, beforeEnemies) {
    const enemyRefs = new Map(beforeEnemies);
    for (const enemy of state.enemies) {
      if (!enemyRefs.has(enemy.id)) enemyRefs.set(enemy.id, { enemy, hp: enemy.hp, burnUntil: enemy.burnUntil, slowUntil: enemy.slowUntil });
    }

    for (const projectile of projectiles) {
      if (!projectile || !projectile.hitIds) continue;
      const previous = hitMemory.get(projectile) || new Set();
      const currentIds = Object.keys(projectile.hitIds).map(Number);
      for (const enemyId of currentIds) {
        if (previous.has(enemyId)) continue;
        const before = enemyRefs.get(enemyId);
        const enemy = before && before.enemy;
        if (!enemy) continue;
        triggerPrecision(projectile, enemy);
        triggerResonance(projectile, enemy, before);
        triggerFrost(projectile, enemy);
        triggerEmberChain(projectile, enemy);
      }
      hitMemory.set(projectile, new Set(currentIds));
    }
  }

  function blockedByOrbit(shot, orbitProjectiles) {
    for (const projectile of orbitProjectiles) {
      if (!projectile || projectile.kind !== "orbit" || projectile.life <= 0) continue;
      if (Math.hypot(shot.x - projectile.x, shot.y - projectile.y) <= (shot.r || 5) + (projectile.r || 10) + 3) return true;
    }
    return false;
  }

  function emitWardPulse() {
    if (!state.player) return;
    const damage = 0.72 + Math.max(0, state.spellLevel - 1) * 0.06;
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0 || Math.hypot(enemy.x - state.player.x, enemy.y - state.player.y) > WARD_RADIUS) continue;
      addDirectHit(enemy, damage, state.spell.essence);
      const dx = enemy.x - state.player.x;
      const dy = enemy.y - state.player.y;
      const length = Math.max(1, Math.hypot(dx, dy));
      if (!enemy.boss) {
        enemy.x += (dx / length) * (enemy.elite ? 2 : 4);
        enemy.y += (dy / length) * (enemy.elite ? 2 : 4);
      }
    }
    effect("ward", state.player.x, state.player.y, state.spell.essence === "ember" ? "#ffd08a" : "#d9fbff", WARD_RADIUS);
    eventLabel("WARD PULSE", "نبضة الحارس");
  }

  function processBlockedShots(beforeShots, projectileCandidates) {
    if (!state.spell || state.spell.form !== "orbit") {
      depthState.ward = 0;
      return;
    }
    const orbitProjectiles = projectileCandidates.filter(function (projectile) { return projectile && projectile.kind === "orbit"; });
    for (const snapshot of beforeShots) {
      if (!snapshot.shot || snapshot.life <= 0 || snapshot.shot.life > 0) continue;
      if (!blockedByOrbit(snapshot.shot, orbitProjectiles)) continue;
      depthState.ward += 1;
      effect("block", snapshot.shot.x, snapshot.shot.y, "#fff0be", 16);
      if (depthState.ward >= WARD_THRESHOLD) {
        depthState.ward = 0;
        emitWardPulse();
      }
    }
  }

  function currentFocus() {
    if (!state.targetId) return 0;
    const target = state.enemies.find(function (enemy) { return enemy.id === state.targetId && enemy.hp > 0; });
    return target ? Number(target._spellDepthFocus || 0) : 0;
  }

  function axisSummary(spell) {
    if (language === "ar") {
      return (spell.form === "bolt" ? "دقة" : "حماية") + " · " +
        (spell.essence === "ember" ? "سلسلة لهب" : "تجميد وتحطيم") + " · " +
        (spell.law === "split" ? "انتشار فوري" : "تناغم متأخر");
    }
    return (spell.form === "bolt" ? "PRECISION" : "WARD") + " · " +
      (spell.essence === "ember" ? "CHAIN BURN" : "FREEZE + SHATTER") + " · " +
      (spell.law === "split" ? "BROADCAST" : "RESONANCE");
  }

  function enhanceChoicePreviews() {
    const buttons = document.querySelectorAll(".upgrade-choice[data-result], .spellbook-choice[data-spell]");
    for (const button of buttons) {
      const key = button.dataset.result || button.dataset.spell;
      if (!key || button.querySelector(".spell-depth-preview")) continue;
      const parts = key.split("|");
      if (parts.length !== 3) continue;
      const info = identityForSpell({ form: parts[0], essence: parts[1], law: parts[2] }, language);
      const preview = document.createElement("span");
      preview.className = "spell-depth-preview";
      preview.textContent = info.name + " · " + info.promise;
      const copy = button.querySelector(".choice-copy, .spellbook-choice-copy");
      if (copy) copy.append(preview);
    }
  }

  function updateUi(force) {
    if (!force && state.time - depthState.lastUiAt < DEPTH_SAMPLE_INTERVAL) return;
    depthState.lastUiAt = state.time;
    const key = spellKey(state.spell);
    if (key !== depthState.lastSpellKey) {
      depthState.lastSpellKey = key;
      depthState.ward = 0;
    }
    const info = identityForSpell(state.spell, language);
    identityText.textContent = axisSummary(state.spell);
    comboText.textContent = info.name + " · " + info.promise;
    comboText.dataset.combo = key;

    const current = meterState(state.spell, currentFocus(), depthState.ward);
    meterFill.style.width = `${Math.min(100, (current.current / current.maximum) * 100)}%`;
    meter.dataset.kind = current.kind;
    if (depthState.eventUntil > state.time) {
      meterLabel.textContent = depthState.eventText;
    } else if (language === "ar") {
      meterLabel.textContent = current.kind === "ward"
        ? `شحنة الحارس ${current.current}/${current.maximum}`
        : `الدقة ${current.current}/${current.maximum}`;
    } else {
      meterLabel.textContent = current.kind === "ward"
        ? `WARD ${current.current}/${current.maximum}`
        : `PRECISION ${current.current}/${current.maximum}`;
    }

    enhanceChoicePreviews();
  }

  function updateEffects() {
    for (const item of effects) item.life -= 1;
    while (effects.length > 0 && effects[0].life <= 0) effects.shift();
  }

  function drawEffects() {
    fx.clearRect(0, 0, fxCanvas.width || 320, fxCanvas.height || 480);
    if (gameCard.dataset.screen !== "playing" || state.mode !== "playing" || state.menuOpen) return;

    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      if (Number(enemy._spellDepthFocus || 0) > 0 && state.spell.form === "bolt") {
        fx.save();
        fx.strokeStyle = "#ffe7ae";
        fx.globalAlpha = 0.7;
        fx.lineWidth = 2;
        const count = Math.min(2, Number(enemy._spellDepthFocus || 0));
        for (let index = 0; index < count; index += 1) {
          fx.beginPath();
          fx.arc(enemy.x, enemy.y, Math.max(enemy.w, enemy.h) * 0.65 + 8 + index * 4, -0.75, 0.75);
          fx.stroke();
        }
        fx.restore();
      }
      if (Number(enemy._spellDepthFrozenUntil || 0) > state.time) {
        fx.save();
        fx.strokeStyle = "#d9fbff";
        fx.fillStyle = "rgba(97, 212, 232, 0.12)";
        fx.globalAlpha = 0.86;
        fx.lineWidth = 2;
        fx.beginPath();
        fx.arc(enemy.x, enemy.y, Math.max(enemy.w, enemy.h) * 0.72 + 8, 0, Math.PI * 2);
        fx.fill();
        fx.stroke();
        fx.restore();
      }
    }

    if (state.player && state.spell.form === "orbit" && depthState.ward > 0) {
      fx.save();
      fx.strokeStyle = state.spell.essence === "ember" ? "#ffd08a" : "#d9fbff";
      fx.globalAlpha = 0.72;
      fx.lineWidth = 2;
      const arc = (Math.PI * 2 * depthState.ward) / WARD_THRESHOLD;
      fx.beginPath();
      fx.arc(state.player.x, state.player.y, 66, -Math.PI / 2, -Math.PI / 2 + arc);
      fx.stroke();
      fx.restore();
    }

    for (const item of effects) {
      const progress = 1 - item.life / item.maxLife;
      fx.save();
      fx.strokeStyle = item.color;
      fx.fillStyle = item.color;
      fx.globalAlpha = Math.max(0, item.life / item.maxLife) * 0.82;
      fx.lineWidth = item.type === "ward" || item.type === "ember" ? 3 : 2;
      fx.beginPath();
      fx.arc(item.x, item.y, item.radius * (0.45 + progress * 0.75), 0, Math.PI * 2);
      fx.stroke();
      if (item.type === "precision" || item.type === "shatter" || item.type === "resonance") {
        for (let index = 0; index < 4; index += 1) {
          const angle = index * Math.PI / 2 + progress;
          fx.fillRect(
            Math.round(item.x + Math.cos(angle) * item.radius * progress) - 2,
            Math.round(item.y + Math.sin(angle) * item.radius * progress) - 2,
            4,
            4,
          );
        }
      }
      fx.restore();
    }
  }

  const previousUpdate = update;
  const previousDraw = draw;
  update = function () {
    detectRunBoundary();
    const beforeEnemies = enemySnapshot();
    const frozen = frozenSnapshots();
    const beforeProjectiles = state.projectiles.slice();
    const beforeShots = state.enemyProjectiles.map(function (shot) {
      return { shot, life: shot.life, x: shot.x, y: shot.y };
    });

    previousUpdate();

    restoreFrozenEnemies(frozen);
    const projectileCandidates = Array.from(new Set(beforeProjectiles.concat(state.projectiles)));
    for (const projectile of state.projectiles) initializeProjectile(projectile);
    processNewHits(projectileCandidates, beforeEnemies);
    processBlockedShots(beforeShots, projectileCandidates);
    updateEffects();
    updateUi(false);
    depthState.lastSeenTime = state.time;
  };

  draw = function () {
    previousDraw();
    drawEffects();
  };

  updateUi(true);
  window.PixelMageSpellDepth = Object.freeze({
    ...pureApi,
    updateUi,
    draw: drawEffects,
  });
})();
