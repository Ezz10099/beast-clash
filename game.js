const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const healthText = document.querySelector("#healthText");
const waveText = document.querySelector("#waveText");
const scoreText = document.querySelector("#scoreText");
const restartButton = document.querySelector("#restartButton");
const controls = document.querySelector(".controls");
const upgradePanel = document.querySelector("#upgradePanel");
const upgradeChoices = document.querySelector("#upgradeChoices");

const W = canvas.width;
const H = canvas.height;
const TOTAL_WAVES = 5;
const BEST_SCORE_KEY = "pixel_mage_best_score_v1";
const WAVE_BANNER_DURATION = 60;
const SLIME_VARIANTS = Object.freeze({
  moss: {
    hpBonus: 0,
    speedBonus: 0,
    width: 20,
    height: 18,
    body: "#3fa66b",
    highlight: "#73d685",
  },
  swift: {
    hpBonus: -1,
    speedBonus: 0.16,
    width: 17,
    height: 15,
    body: "#3576a8",
    highlight: "#70c1e8",
  },
  iron: {
    hpBonus: 2,
    speedBonus: -0.12,
    width: 26,
    height: 23,
    body: "#68548f",
    highlight: "#a58ad1",
  },
});
const WAVE_DEFINITIONS = Object.freeze([
  { slimes: ["moss", "moss", "moss"], hp: 2, speed: 0.42 },
  { slimes: ["moss", "moss", "moss", "swift"], hp: 2, speed: 0.45 },
  { slimes: ["moss", "moss", "moss", "swift", "swift"], hp: 3, speed: 0.48 },
  { slimes: ["moss", "moss", "moss", "swift", "swift", "iron"], hp: 3, speed: 0.52 },
  { slimes: ["swift", "iron"], hp: 4, speed: 0.54, bossHp: 16, bossSpeed: 0.36 },
]);
const keys = {
  left: false,
  right: false,
  up: false,
  down: false,
  fire: false,
};

const state = {
  mode: "menu",
  time: 0,
  wave: 0,
  score: 0,
  bestScore: loadBestScore(),
  defeated: 0,
  player: null,
  enemies: [],
  bolts: [],
  sparks: [],
  waveBannerTimer: 0,
  waveBannerText: "",
  screenShake: 0,
  damageFlash: 0,
};

const UPGRADES = Object.freeze([
  {
    id: "power",
    title: "Empowered Bolt",
    describe: (player) => `Bolt damage ${player.damage} → ${player.damage + 1}`,
    apply: (player) => { player.damage += 1; },
  },
  {
    id: "rapid",
    title: "Rapid Casting",
    describe: (player) => player.cooldownMax <= 8 ? "Casting is already at maximum speed" : "Cast bolts more frequently",
    apply: (player) => { player.cooldownMax = Math.max(8, player.cooldownMax - 3); },
  },
  {
    id: "vitality",
    title: "Vital Spark",
    describe: (player) => `Maximum HP ${player.maxHp} → ${player.maxHp + 1}; fully heal`,
    apply: (player) => { player.maxHp += 1; player.hp = player.maxHp; },
  },
  {
    id: "speed",
    title: "Wind Step",
    describe: () => "Move faster and recover 1 HP",
    apply: (player) => { player.speed += 0.32; player.hp = Math.min(player.maxHp, player.hp + 1); },
  },
  {
    id: "volley",
    title: "Twin Cast",
    describe: (player) => player.boltCount === 1 ? "Fire a three-bolt spread" : "Strengthen every bolt in the spread",
    apply: (player) => {
      if (player.boltCount === 1) player.boltCount = 3;
      else player.damage += 1;
    },
  },
]);

function loadBestScore() {
  try {
    return Math.max(0, Number.parseInt(localStorage.getItem(BEST_SCORE_KEY) || "0", 10) || 0);
  } catch {
    return 0;
  }
}

function saveBestScore() {
  if (state.score <= state.bestScore) return;
  state.bestScore = state.score;
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(state.bestScore));
  } catch {
    // The run remains playable when storage is unavailable.
  }
}

function resetGame() {
  state.time = 0;
  state.wave = 0;
  state.score = 0;
  state.defeated = 0;
  state.player = {
    x: W / 2,
    y: H - 72,
    w: 16,
    h: 20,
    hp: 3,
    maxHp: 3,
    speed: 2.05,
    damage: 1,
    cooldownMax: 17,
    boltCount: 1,
    invincible: 0,
    cooldown: 0,
  };
  state.bolts = [];
  state.sparks = [];
  state.waveBannerTimer = 0;
  state.waveBannerText = "";
  state.screenShake = 0;
  state.damageFlash = 0;
  startWave(1);
}

function startWave(wave) {
  const definition = WAVE_DEFINITIONS[wave - 1];
  state.wave = wave;
  state.mode = "playing";
  state.bolts = [];
  state.enemies = [];
  state.waveBannerText = definition.bossHp ? "FINAL WAVE" : `WAVE ${wave}`;
  state.waveBannerTimer = WAVE_BANNER_DURATION;
  setControlsEnabled(true);
  hideUpgradePanel();

  if (definition.bossHp) {
    state.enemies.push(makeEnemy(W / 2, 82, {
      boss: true,
      hp: definition.bossHp,
      speed: definition.bossSpeed,
      variant: "boss",
    }));
  }

  for (let index = 0; index < definition.slimes.length; index += 1) {
    const variant = definition.slimes[index];
    const variantConfig = SLIME_VARIANTS[variant];
    const position = getSpawnPosition(index, definition.slimes.length, Boolean(definition.bossHp));
    state.enemies.push(makeEnemy(position.x, position.y, {
      boss: false,
      hp: Math.max(1, definition.hp + variantConfig.hpBonus),
      speed: Math.max(0.2, definition.speed + variantConfig.speedBonus),
      variant,
    }));
  }

  addSparks(W / 2, 92, definition.bossHp ? 24 : 12, definition.bossHp ? "#ffd166" : "#9bf6ff");
}

function getSpawnPosition(index, count, hasBoss) {
  if (hasBoss) {
    return { x: index === 0 ? 76 : W - 76, y: 132 };
  }
  const columns = Math.min(4, count);
  const column = index % columns;
  const row = Math.floor(index / columns);
  const spacing = W / (columns + 1);
  return { x: spacing * (column + 1), y: 88 + row * 46 };
}

function makeEnemy(x, y, options) {
  const { boss, hp, speed, variant } = options;
  const variantConfig = SLIME_VARIANTS[variant];
  return {
    x,
    y,
    w: boss ? 34 : variantConfig.width,
    h: boss ? 30 : variantConfig.height,
    hp,
    maxHp: hp,
    speed,
    boss,
    variant,
    bodyColor: boss ? "#7b2d43" : variantConfig.body,
    highlightColor: boss ? "#c44569" : variantConfig.highlight,
    touchCooldown: 0,
    attackState: boss ? "chase" : null,
    attackTimer: boss ? 120 : 0,
    targetX: x,
    targetY: y,
    dashVx: 0,
    dashVy: 0,
  };
}

function castSpell() {
  const player = state.player;

  if (!player || player.cooldown > 0 || state.mode !== "playing") {
    return;
  }

  player.cooldown = player.cooldownMax;
  const velocities = player.boltCount === 3 ? [-1.15, 0, 1.15] : [0];
  for (const vx of velocities) {
    state.bolts.push({
      x: player.x + vx * 3,
      y: player.y - 16,
      r: 4,
      vx,
      vy: -5.6,
      damage: player.damage,
      spent: false,
    });
  }
  addSparks(player.x, player.y - 18, 5, "#9bf6ff");
}

function update() {
  state.time += 1;
  state.waveBannerTimer = Math.max(0, state.waveBannerTimer - 1);
  state.screenShake = Math.max(0, state.screenShake - 1);
  state.damageFlash = Math.max(0, state.damageFlash - 1);
  if (state.mode === "playing") {
    updatePlayer();
    updateBolts();
    updateEnemies();
    updateMode();
  }
  updateSparks();
}

function updatePlayer() {
  const player = state.player;
  let dx = 0;
  let dy = 0;

  if (keys.left) dx -= 1;
  if (keys.right) dx += 1;
  if (keys.up) dy -= 1;
  if (keys.down) dy += 1;

  if (dx !== 0 || dy !== 0) {
    const length = Math.hypot(dx, dy);
    player.x += (dx / length) * player.speed;
    player.y += (dy / length) * player.speed;
  }

  player.x = clamp(player.x, 20, W - 20);
  player.y = clamp(player.y, 76, H - 34);

  if (player.cooldown > 0) player.cooldown -= 1;
  if (player.invincible > 0) player.invincible -= 1;
  if (keys.fire) castSpell();
}

function updateBolts() {
  for (const bolt of state.bolts) {
    bolt.x += bolt.vx;
    bolt.y += bolt.vy;
  }

  for (const enemy of state.enemies) {
    for (const bolt of state.bolts) {
      if (!bolt.spent && enemy.hp > 0 && rectCircle(enemy, bolt)) {
        enemy.hp -= bolt.damage;
        bolt.spent = true;
        addSparks(bolt.x, bolt.y, 7, enemy.boss ? "#ffd166" : "#b8f2a2");
        if (enemy.hp <= 0) break;
      }
    }
  }

  const defeated = state.enemies.filter((enemy) => enemy.hp <= 0);
  for (const enemy of defeated) {
    state.score += enemy.boss ? 1000 : state.wave * 100;
    addSparks(enemy.x, enemy.y, enemy.boss ? 34 : 12, enemy.boss ? "#ffd166" : enemy.highlightColor);
    state.screenShake = Math.max(state.screenShake, enemy.boss ? 16 : 3);
  }
  state.enemies = state.enemies.filter((enemy) => enemy.hp > 0);
  state.defeated += defeated.length;
  state.bolts = state.bolts.filter((bolt) => !bolt.spent && bolt.y > -20 && bolt.x > -20 && bolt.x < W + 20);
}

function updateEnemies() {
  const player = state.player;

  for (const enemy of state.enemies) {
    enemy.touchCooldown = Math.max(0, enemy.touchCooldown - 1);
    if (enemy.boss) updateBoss(enemy, player);
    else moveEnemyToward(enemy, player, 0.35);

    if (overlap(player, enemy) && player.invincible <= 0 && enemy.touchCooldown <= 0) {
      player.hp -= 1;
      player.invincible = 70;
      enemy.touchCooldown = 58;
      addSparks(player.x, player.y, 16, "#ff6b6b");
      state.screenShake = Math.max(state.screenShake, 10);
      state.damageFlash = 8;
    }
  }
}

function moveEnemyToward(enemy, target, wobbleAmount = 0) {
  const dx = target.x - enemy.x;
  const dy = target.y - enemy.y;
  const length = Math.max(1, Math.hypot(dx, dy));
  const wobble = Math.sin((state.time + enemy.x) / 18) * wobbleAmount;
  enemy.x += (dx / length) * enemy.speed + wobble;
  enemy.y += (dy / length) * enemy.speed;
}

function updateBoss(enemy, player) {
  enemy.attackTimer -= 1;

  if (enemy.attackState === "chase") {
    moveEnemyToward(enemy, player, 0.16);
    if (enemy.attackTimer <= 0) {
      enemy.attackState = "telegraph";
      enemy.attackTimer = 42;
      enemy.targetX = player.x;
      enemy.targetY = player.y;
      addSparks(enemy.x, enemy.y, 12, "#ffd166");
    }
    return;
  }

  if (enemy.attackState === "telegraph") {
    if (enemy.attackTimer <= 0) {
      const dx = enemy.targetX - enemy.x;
      const dy = enemy.targetY - enemy.y;
      const length = Math.max(1, Math.hypot(dx, dy));
      enemy.dashVx = (dx / length) * 5.4;
      enemy.dashVy = (dy / length) * 5.4;
      enemy.attackState = "dash";
      enemy.attackTimer = 24;
      addSparks(enemy.x, enemy.y, 18, "#ff8c42");
    }
    return;
  }

  if (enemy.attackState === "dash") {
    enemy.x += enemy.dashVx;
    enemy.y += enemy.dashVy;
    enemy.x = clamp(enemy.x, 20, W - 20);
    enemy.y = clamp(enemy.y, 66, H - 30);
    if (state.time % 2 === 0) addSparks(enemy.x, enemy.y, 2, "#ff8c42");
    if (enemy.attackTimer <= 0) {
      enemy.attackState = "recover";
      enemy.attackTimer = 34;
    }
    return;
  }

  if (enemy.attackTimer <= 0) {
    enemy.attackState = "chase";
    enemy.attackTimer = 135;
  }
}

function updateSparks() {
  for (const spark of state.sparks) {
    spark.x += spark.vx;
    spark.y += spark.vy;
    spark.life -= 1;
  }

  state.sparks = state.sparks.filter((spark) => spark.life > 0);
}

function updateMode() {
  const player = state.player;

  if (player.hp <= 0) {
    finishRun("lose");
  } else if (state.enemies.length === 0) {
    if (state.wave >= TOTAL_WAVES) finishRun("win");
    else showUpgradePanel();
  }
}

function finishRun(mode) {
  state.mode = mode;
  clearInput();
  setControlsEnabled(false);
  saveBestScore();
}

function showUpgradePanel() {
  state.mode = "upgrade";
  clearInput();
  setControlsEnabled(false);
  upgradeChoices.replaceChildren();

  for (const upgrade of pickUpgradeChoices()) {
    const button = document.createElement("button");
    const title = document.createElement("strong");
    const detail = document.createElement("span");
    button.className = "upgrade-choice";
    button.type = "button";
    title.textContent = upgrade.title;
    detail.textContent = upgrade.describe(state.player);
    button.append(title, detail);
    button.addEventListener("click", () => {
      upgrade.apply(state.player);
      startWave(state.wave + 1);
    }, { once: true });
    upgradeChoices.append(button);
  }

  upgradePanel.hidden = false;
}

function hideUpgradePanel() {
  upgradePanel.hidden = true;
  upgradeChoices.replaceChildren();
}

function pickUpgradeChoices() {
  const shuffled = UPGRADES.filter((upgrade) => upgrade.id !== "rapid" || state.player.cooldownMax > 8);
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled.slice(0, 3);
}

function clearInput() {
  for (const key of Object.keys(keys)) keys[key] = false;
}

function setControlsEnabled(enabled) {
  controls.classList.toggle("is-disabled", !enabled);
  for (const button of controls.querySelectorAll("button")) button.disabled = !enabled;
}

function addSparks(x, y, count, color) {
  for (let i = 0; i < count; i += 1) {
    state.sparks.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 2.6,
      vy: (Math.random() - 0.5) * 2.6,
      life: 14 + Math.random() * 12,
      color,
    });
  }
}

function draw() {
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "#080b12";
  ctx.fillRect(0, 0, W, H);
  ctx.save();
  if (state.screenShake > 0) {
    const strength = Math.min(4, state.screenShake * 0.35);
    ctx.translate((Math.random() - 0.5) * strength * 2, (Math.random() - 0.5) * strength * 2);
  }
  drawBackground();

  if (state.mode === "menu") {
    drawMenu();
  } else {
    drawBolts();
    drawEnemies();
    drawPlayer();
    drawSparks();
    drawBanner();
    drawWaveAnnouncement();
  }
  ctx.restore();

  if (state.damageFlash > 0) {
    ctx.fillStyle = `rgba(255, 62, 62, ${0.04 + state.damageFlash * 0.018})`;
    ctx.fillRect(0, 0, W, H);
  }

  updateHud();
}

function drawBackground() {
  ctx.fillStyle = "#121827";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#18223a";
  for (let y = 40; y < H; y += 24) {
    for (let x = 0; x < W; x += 24) {
      if ((x + y / 2) % 48 === 0) {
        ctx.fillRect(x, y, 12, 12);
      }
    }
  }

  ctx.fillStyle = "#24314e";
  ctx.fillRect(0, 0, W, 50);
  ctx.fillStyle = "#2e6b4f";
  for (let i = 0; i < 8; i += 1) {
    const x = i * 44 - 10;
    ctx.fillRect(x + 12, 24, 12, 26);
    ctx.fillRect(x + 4, 12, 28, 18);
    ctx.fillRect(x + 10, 4, 16, 12);
  }

  ctx.fillStyle = "#0c101b";
  ctx.fillRect(0, H - 26, W, 26);
}

function drawMenu() {
  drawPanel(28, 118, 264, 210);
  drawText("PIXEL MAGE", W / 2, 164, 22, "#ffd166", "center");
  drawText("Five waves. One boss.", W / 2, 195, 12, "#f3ead7", "center");
  drawText("Choose upgrades. Finish the run.", W / 2, 225, 10, "#aab1c7", "center");
  drawText("Tap / Space to start", W / 2, 268, 12, "#9bf6ff", "center");
  drawMage(W / 2, 360, false);
}

function drawPlayer() {
  const flicker = state.player.invincible > 0 && Math.floor(state.time / 5) % 2 === 0;
  if (!flicker) drawMage(state.player.x, state.player.y, keys.left || keys.right || keys.up || keys.down);
}

function drawMage(x, y, moving) {
  const bob = moving ? Math.sin(state.time / 5) * 2 : 0;
  const px = Math.round(x);
  const py = Math.round(y + bob);

  ctx.fillStyle = "#0a0d15";
  ctx.fillRect(px - 9, py + 10, 18, 5);

  ctx.fillStyle = "#5b3d9a";
  ctx.fillRect(px - 7, py - 4, 14, 18);
  ctx.fillStyle = "#7d5bd6";
  ctx.fillRect(px - 4, py - 1, 8, 13);

  ctx.fillStyle = "#f4c38b";
  ctx.fillRect(px - 5, py - 14, 10, 9);
  ctx.fillStyle = "#22283d";
  ctx.fillRect(px - 7, py - 18, 14, 5);
  ctx.fillRect(px - 3, py - 25, 6, 9);
  ctx.fillStyle = "#9bf6ff";
  ctx.fillRect(px + 8, py - 8, 4, 12);
}

function drawEnemies() {
  for (const enemy of state.enemies) {
    if (enemy.boss) {
      drawBoss(enemy);
    } else {
      drawSlime(enemy);
    }
  }
}

function drawSlime(enemy) {
  const x = Math.round(enemy.x);
  const y = Math.round(enemy.y);
  const pulse = Math.sin(state.time / 8 + x) * 1.5;
  const scaleX = enemy.w / 20;
  const scaleY = enemy.h / 18;

  ctx.save();
  ctx.translate(x, y + pulse);
  ctx.scale(scaleX, scaleY);
  ctx.fillStyle = "#0a0d15";
  ctx.fillRect(-11, 9, 22, 5);
  ctx.fillStyle = enemy.bodyColor;
  ctx.fillRect(-10, -5, 20, 16);
  ctx.fillStyle = enemy.highlightColor;
  ctx.fillRect(-5, -10, 10, 6);
  ctx.fillStyle = "#101420";
  ctx.fillRect(-5, 0, 3, 3);
  ctx.fillRect(3, 0, 3, 3);
  ctx.restore();
  const barWidth = Math.max(24, enemy.w + 4);
  drawHealthBar(enemy.x - barWidth / 2, enemy.y - enemy.h - 4, barWidth, enemy.hp / enemy.maxHp);
}

function drawBoss(enemy) {
  const x = Math.round(enemy.x);
  const y = Math.round(enemy.y);
  const pulse = Math.sin(state.time / 10) * 2;

  if (enemy.attackState === "telegraph") {
    const warningPulse = 24 + Math.sin(state.time / 3) * 4;
    ctx.save();
    ctx.strokeStyle = "#ffd166";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, warningPulse, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(enemy.targetX, enemy.targetY);
    ctx.stroke();
    ctx.restore();
  }

  ctx.fillStyle = "#0a0d15";
  ctx.fillRect(x - 19, y + 16, 38, 7);
  ctx.fillStyle = enemy.attackState === "dash" ? "#d95d39" : enemy.attackState === "telegraph" ? "#a74643" : "#7b2d43";
  ctx.fillRect(x - 17, y - 10 + pulse, 34, 28);
  ctx.fillStyle = "#c44569";
  ctx.fillRect(x - 10, y - 18 + pulse, 20, 10);
  ctx.fillStyle = "#ffd166";
  ctx.fillRect(x - 16, y - 22 + pulse, 7, 7);
  ctx.fillRect(x + 9, y - 22 + pulse, 7, 7);
  ctx.fillStyle = "#101420";
  ctx.fillRect(x - 8, y + pulse, 4, 4);
  ctx.fillRect(x + 5, y + pulse, 4, 4);
  drawHealthBar(enemy.x - 24, enemy.y - 30, 48, enemy.hp / enemy.maxHp);
}

function drawBolts() {
  for (const bolt of state.bolts) {
    ctx.fillStyle = "#9bf6ff";
    ctx.fillRect(Math.round(bolt.x) - 2, Math.round(bolt.y) - 7, 4, 12);
    ctx.fillStyle = "#e0fbff";
    ctx.fillRect(Math.round(bolt.x) - 1, Math.round(bolt.y) - 10, 2, 3);
  }
}

function drawSparks() {
  for (const spark of state.sparks) {
    ctx.fillStyle = spark.color;
    ctx.fillRect(Math.round(spark.x), Math.round(spark.y), 3, 3);
  }
}

function drawBanner() {
  if (state.mode === "win") {
    drawPanel(32, 164, 256, 140);
    drawText("RUN COMPLETE", W / 2, 205, 21, "#ffd166", "center");
    drawText(`Score ${state.score}`, W / 2, 238, 13, "#f3ead7", "center");
    drawText("Tap to begin another run", W / 2, 271, 10, "#9bf6ff", "center");
  }

  if (state.mode === "lose") {
    drawPanel(32, 164, 256, 140);
    drawText("THE GROVE FALLS", W / 2, 205, 19, "#ff6b6b", "center");
    drawText(`Reached Wave ${state.wave}`, W / 2, 238, 13, "#f3ead7", "center");
    drawText("Tap to try another build", W / 2, 271, 10, "#9bf6ff", "center");
  }
}

function drawWaveAnnouncement() {
  if (state.waveBannerTimer <= 0 || state.mode !== "playing") return;
  const elapsed = WAVE_BANNER_DURATION - state.waveBannerTimer;
  const alpha = Math.min(1, elapsed / 10, state.waveBannerTimer / 16);
  ctx.save();
  ctx.globalAlpha = alpha;
  drawPanel(88, 58, 144, 50);
  drawText(state.waveBannerText, W / 2, 83, 16, state.wave === TOTAL_WAVES ? "#ff9d66" : "#ffd166", "center");
  ctx.restore();
}

function drawPanel(x, y, w, h) {
  ctx.fillStyle = "#0c101b";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "#27314a";
  ctx.fillRect(x + 4, y + 4, w - 8, h - 8);
  ctx.fillStyle = "#1b2233";
  ctx.fillRect(x + 8, y + 8, w - 16, h - 16);
}

function drawText(text, x, y, size, color, align = "left") {
  ctx.fillStyle = color;
  ctx.font = `bold ${size}px monospace`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function drawHealthBar(x, y, w, percent) {
  ctx.fillStyle = "#0a0d15";
  ctx.fillRect(Math.round(x), Math.round(y), w, 5);
  ctx.fillStyle = "#ff6b6b";
  ctx.fillRect(Math.round(x + 1), Math.round(y + 1), Math.max(0, Math.round((w - 2) * percent)), 3);
}

function updateHud() {
  const player = state.player;

  healthText.textContent = player ? `HP ${Math.max(0, player.hp)}/${player.maxHp}` : "HP 3/3";

  if (state.mode === "menu") {
    waveText.textContent = `${TOTAL_WAVES} Waves`;
    scoreText.textContent = `Best ${state.bestScore}`;
  } else if (state.mode === "win") {
    waveText.textContent = "Complete";
    scoreText.textContent = `Score ${state.score}`;
  } else if (state.mode === "lose") {
    waveText.textContent = `Wave ${state.wave}/${TOTAL_WAVES}`;
    scoreText.textContent = `Score ${state.score}`;
  } else if (state.mode === "upgrade") {
    waveText.textContent = "Upgrade";
    scoreText.textContent = `Score ${state.score}`;
  } else {
    waveText.textContent = `Wave ${state.wave}/${TOTAL_WAVES}`;
    scoreText.textContent = `Score ${state.score}`;
  }
}

function overlap(a, b) {
  return (
    Math.abs(a.x - b.x) * 2 < a.w + b.w &&
    Math.abs(a.y - b.y) * 2 < a.h + b.h
  );
}

function rectCircle(rect, circle) {
  const nearestX = clamp(circle.x, rect.x - rect.w / 2, rect.x + rect.w / 2);
  const nearestY = clamp(circle.y, rect.y - rect.h / 2, rect.y + rect.h / 2);
  const dx = circle.x - nearestX;
  const dy = circle.y - nearestY;
  return dx * dx + dy * dy < circle.r * circle.r;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function handleStartAction() {
  if (state.mode === "menu" || state.mode === "win" || state.mode === "lose") {
    resetGame();
  }
}

const keyboardMap = {
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  Space: "fire",
};

window.addEventListener("keydown", (event) => {
  const key = keyboardMap[event.code];

  if (key) {
    event.preventDefault();
    keys[key] = true;
  }

  if (event.code === "Space" || event.code === "Enter") {
    handleStartAction();
  }
});

window.addEventListener("keyup", (event) => {
  const key = keyboardMap[event.code];
  if (key) keys[key] = false;
});

canvas.addEventListener("pointerdown", handleStartAction);
restartButton.addEventListener("click", resetGame);

for (const button of document.querySelectorAll("[data-key]")) {
  const key = button.dataset.key;

  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    handleStartAction();
    keys[key] = true;
    if (key === "fire") castSpell();
  });

  button.addEventListener("pointerup", () => {
    keys[key] = false;
  });

  button.addEventListener("pointercancel", () => {
    keys[key] = false;
  });

  button.addEventListener("pointerleave", () => {
    keys[key] = false;
  });
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
