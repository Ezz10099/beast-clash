const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const healthText = document.querySelector("#healthText");
const goalText = document.querySelector("#goalText");
const restartButton = document.querySelector("#restartButton");

const W = canvas.width;
const H = canvas.height;
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
  bossSpawned: false,
  defeated: 0,
  player: null,
  enemies: [],
  bolts: [],
  sparks: [],
};

function resetGame() {
  state.mode = "playing";
  state.time = 0;
  state.bossSpawned = false;
  state.defeated = 0;
  state.player = {
    x: W / 2,
    y: H - 72,
    w: 16,
    h: 20,
    hp: 3,
    invincible: 0,
    cooldown: 0,
  };
  state.bolts = [];
  state.sparks = [];
  state.enemies = [
    makeEnemy(62, 122, false),
    makeEnemy(160, 92, false),
    makeEnemy(252, 132, false),
  ];
}

function makeEnemy(x, y, boss) {
  return {
    x,
    y,
    w: boss ? 34 : 20,
    h: boss ? 30 : 18,
    hp: boss ? 12 : 3,
    maxHp: boss ? 12 : 3,
    speed: boss ? 0.38 : 0.58,
    boss,
    touchCooldown: 0,
  };
}

function castSpell() {
  const player = state.player;

  if (!player || player.cooldown > 0 || state.mode !== "playing") {
    return;
  }

  player.cooldown = 17;
  state.bolts.push({
    x: player.x,
    y: player.y - 16,
    r: 4,
    vy: -5.6,
  });
  addSparks(player.x, player.y - 18, 5, "#9bf6ff");
}

function update() {
  if (state.mode !== "playing") {
    return;
  }

  state.time += 1;
  updatePlayer();
  updateBolts();
  updateEnemies();
  updateSparks();
  updateMode();
}

function updatePlayer() {
  const player = state.player;
  const speed = 2.05;
  let dx = 0;
  let dy = 0;

  if (keys.left) dx -= 1;
  if (keys.right) dx += 1;
  if (keys.up) dy -= 1;
  if (keys.down) dy += 1;

  if (dx !== 0 || dy !== 0) {
    const length = Math.hypot(dx, dy);
    player.x += (dx / length) * speed;
    player.y += (dy / length) * speed;
  }

  player.x = clamp(player.x, 20, W - 20);
  player.y = clamp(player.y, 76, H - 34);

  if (player.cooldown > 0) player.cooldown -= 1;
  if (player.invincible > 0) player.invincible -= 1;
  if (keys.fire) castSpell();
}

function updateBolts() {
  for (const bolt of state.bolts) {
    bolt.y += bolt.vy;
  }

  for (const enemy of state.enemies) {
    for (const bolt of state.bolts) {
      if (rectCircle(enemy, bolt)) {
        enemy.hp -= 1;
        bolt.y = -100;
        addSparks(bolt.x, bolt.y + 12, 7, enemy.boss ? "#ffd166" : "#b8f2a2");
      }
    }
  }

  const before = state.enemies.length;
  state.enemies = state.enemies.filter((enemy) => enemy.hp > 0);
  state.defeated += before - state.enemies.length;
  state.bolts = state.bolts.filter((bolt) => bolt.y > -20);
}

function updateEnemies() {
  const player = state.player;

  if (!state.bossSpawned && state.defeated >= 3) {
    state.bossSpawned = true;
    state.enemies.push(makeEnemy(W / 2, 82, true));
    addSparks(W / 2, 94, 24, "#ffd166");
  }

  for (const enemy of state.enemies) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const length = Math.max(1, Math.hypot(dx, dy));
    const wobble = Math.sin((state.time + enemy.x) / 18) * 0.35;

    enemy.x += (dx / length) * enemy.speed + wobble;
    enemy.y += (dy / length) * enemy.speed;
    enemy.touchCooldown = Math.max(0, enemy.touchCooldown - 1);

    if (overlap(player, enemy) && player.invincible <= 0 && enemy.touchCooldown <= 0) {
      player.hp -= 1;
      player.invincible = 70;
      enemy.touchCooldown = 58;
      addSparks(player.x, player.y, 16, "#ff6b6b");
    }
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
    state.mode = "lose";
  } else if (state.bossSpawned && state.enemies.length === 0) {
    state.mode = "win";
  }
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
  drawBackground();

  if (state.mode === "menu") {
    drawMenu();
  } else {
    drawBolts();
    drawEnemies();
    drawPlayer();
    drawSparks();
    drawBanner();
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
  drawText("Game 0 Prototype", W / 2, 195, 12, "#f3ead7", "center");
  drawText("Finish a tiny game first.", W / 2, 225, 10, "#aab1c7", "center");
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

  ctx.fillStyle = "#0a0d15";
  ctx.fillRect(x - 11, y + 9, 22, 5);
  ctx.fillStyle = "#3fa66b";
  ctx.fillRect(x - 10, y - 5 + pulse, 20, 16);
  ctx.fillStyle = "#73d685";
  ctx.fillRect(x - 5, y - 10 + pulse, 10, 6);
  ctx.fillStyle = "#101420";
  ctx.fillRect(x - 5, y + pulse, 3, 3);
  ctx.fillRect(x + 3, y + pulse, 3, 3);
  drawHealthBar(enemy.x - 12, enemy.y - 18, 24, enemy.hp / enemy.maxHp);
}

function drawBoss(enemy) {
  const x = Math.round(enemy.x);
  const y = Math.round(enemy.y);
  const pulse = Math.sin(state.time / 10) * 2;

  ctx.fillStyle = "#0a0d15";
  ctx.fillRect(x - 19, y + 16, 38, 7);
  ctx.fillStyle = "#7b2d43";
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
    drawPanel(32, 174, 256, 120);
    drawText("YOU WIN", W / 2, 218, 22, "#ffd166", "center");
    drawText("Game 0 has an ending.", W / 2, 250, 11, "#f3ead7", "center");
  }

  if (state.mode === "lose") {
    drawPanel(32, 174, 256, 120);
    drawText("TRY AGAIN", W / 2, 218, 22, "#ff6b6b", "center");
    drawText("Small game. Real progress.", W / 2, 250, 11, "#f3ead7", "center");
  }
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

  healthText.textContent = player ? `HP ${Math.max(0, player.hp)}` : "HP 3";

  if (state.mode === "menu") {
    goalText.textContent = "Tap to start";
  } else if (state.mode === "win") {
    goalText.textContent = "Complete";
  } else if (state.mode === "lose") {
    goalText.textContent = "Restart";
  } else if (!state.bossSpawned) {
    goalText.textContent = `Slimes ${state.defeated}/3`;
  } else {
    goalText.textContent = "Defeat the boss";
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
