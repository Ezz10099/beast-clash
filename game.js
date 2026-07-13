const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const healthText = document.querySelector("#healthText");
const waveText = document.querySelector("#waveText");
const scoreText = document.querySelector("#scoreText");
const spellText = document.querySelector("#spellText");
const menuButton = document.querySelector("#menuButton");
const startPanel = document.querySelector("#startPanel");
const startStatus = document.querySelector("#startStatus");
const spellbookText = document.querySelector("#spellbookText");
const resumeRunButton = document.querySelector("#resumeRunButton");
const startRunButton = document.querySelector("#startRunButton");
const upgradePanel = document.querySelector("#upgradePanel");
const upgradeEyebrow = document.querySelector("#upgradeEyebrow");
const upgradeTitle = document.querySelector("#upgradeTitle");
const upgradeHelp = document.querySelector("#upgradeHelp");
const upgradeChoices = document.querySelector("#upgradeChoices");
const menuPanel = document.querySelector("#menuPanel");
const menuEyebrow = document.querySelector("#menuEyebrow");
const menuTitle = document.querySelector("#menuTitle");
const menuStatus = document.querySelector("#menuStatus");
const resumeButton = document.querySelector("#resumeButton");
const soundButton = document.querySelector("#soundButton");
const hapticsButton = document.querySelector("#hapticsButton");
const newRunButton = document.querySelector("#newRunButton");
const controlHint = document.querySelector("#controlHint");

const W = canvas.width;
const H = canvas.height;
const FPS = 60;
const TOTAL_WAVES = 12;
const SAVE_VERSION = 2;
const CHECKPOINT_VERSION = 1;
const SAVE_KEY = "pixel_mage_save_v2";
const LEGACY_BEST_SCORE_KEY = "pixel_mage_best_score_v1";
const LEGACY_SETTINGS_KEY = "pixel_mage_settings_v1";
const WAVE_BANNER_DURATION = 78;
const MAX_PROJECTILES = 96;
const MAX_ENEMY_PROJECTILES = 72;
const MAX_PENDING_CASTS = 24;
const MAX_SPARKS = 360;
const ORBIT_HIT_GAP = 18;
const VALID_FORMS = Object.freeze(["bolt", "orbit"]);
const VALID_ESSENCES = Object.freeze(["ember", "frost"]);
const VALID_LAWS = Object.freeze(["split", "echo"]);

const SPELL_PARTS = Object.freeze({
  forms: Object.freeze({
    bolt: Object.freeze({
      title: "Bolt",
      description: "Fires at the marked enemy; best against one threat.",
      cooldown: 20,
    }),
    orbit: Object.freeze({
      title: "Orbit",
      description: "Circles you; hits nearby crowds and blocks enemy shots.",
      cooldown: 36,
    }),
  }),
  essences: Object.freeze({
    ember: Object.freeze({
      title: "Ember",
      description: "Burns what it hits and splashes damage nearby.",
      color: "#ff8c42",
      light: "#ffd08a",
    }),
    frost: Object.freeze({
      title: "Frost",
      description: "Slows every enemy the spell touches.",
      color: "#61d4e8",
      light: "#d9fbff",
    }),
  }),
  laws: Object.freeze({
    split: Object.freeze({
      title: "Split",
      description: "Casts three smaller copies immediately.",
    }),
    echo: Object.freeze({
      title: "Echo",
      description: "Repeats the spell a moment later.",
    }),
  }),
});

const ENEMY_FAMILIES = Object.freeze({
  chaser: Object.freeze({
    title: "Mote",
    width: 18,
    height: 16,
    hp: 3,
    speed: 0.48,
    score: 45,
    body: "#42a66c",
    light: "#83dc91",
  }),
  caster: Object.freeze({
    title: "Glyph Caster",
    width: 20,
    height: 22,
    hp: 4,
    speed: 0.34,
    score: 65,
    body: "#416aa3",
    light: "#8bc9eb",
  }),
});

const RUN_DEFINITION = Object.freeze([
  Object.freeze({
    wave: 1,
    act: 1,
    title: "First Script",
    cue: "DRAG TO MOVE · SPELLS CAST THEMSELVES",
    duration: 22 * FPS,
    events: Object.freeze([
      Object.freeze({ at: 0, family: "chaser", count: 2 }),
      Object.freeze({ at: 5 * FPS, family: "chaser", count: 2 }),
      Object.freeze({ at: 11 * FPS, family: "chaser", count: 3 }),
      Object.freeze({ at: 17 * FPS, family: "chaser", count: 2 }),
    ]),
  }),
  Object.freeze({
    wave: 2,
    act: 1,
    title: "Crossfire",
    cue: "BLUE AIM LINE = MOVE BEFORE THE SHOT",
    duration: 24 * FPS,
    events: Object.freeze([
      Object.freeze({ at: 0, family: "chaser", count: 3 }),
      Object.freeze({ at: 6 * FPS, family: "caster", count: 1 }),
      Object.freeze({ at: 12 * FPS, family: "chaser", count: 3 }),
      Object.freeze({ at: 18 * FPS, family: "caster", count: 1 }),
    ]),
  }),
  Object.freeze({
    wave: 3,
    act: 1,
    title: "Broken Lines",
    cue: "THE MARK SHOWS BOLT'S CURRENT TARGET",
    duration: 26 * FPS,
    events: Object.freeze([
      Object.freeze({ at: 0, family: "chaser", count: 3 }),
      Object.freeze({ at: 5 * FPS, family: "caster", count: 1 }),
      Object.freeze({ at: 11 * FPS, family: "chaser", count: 3 }),
      Object.freeze({ at: 17 * FPS, family: "caster", count: 2 }),
      Object.freeze({ at: 22 * FPS, family: "chaser", count: 2 }),
    ]),
  }),
  Object.freeze({
    wave: 4,
    act: 1,
    title: "First Guardian",
    cue: "GOLD RING AND LINE WARN OF A CHARGE",
    duration: 30 * FPS,
    guardian: true,
    events: Object.freeze([
      Object.freeze({ at: 0, family: "chaser", count: 3 }),
      Object.freeze({ at: 6 * FPS, family: "caster", count: 2 }),
      Object.freeze({ at: 12 * FPS, family: "chaser", count: 3 }),
      Object.freeze({ at: 22 * FPS, family: "chaser", count: 1, elite: true }),
    ]),
  }),
  Object.freeze({
    wave: 5,
    act: 2,
    title: "Second Act",
    cue: "FORM CHANGES WHERE YOUR SPELL FIGHTS",
    duration: 25 * FPS,
    events: Object.freeze([
      Object.freeze({ at: 0, family: "caster", count: 2 }),
      Object.freeze({ at: 5 * FPS, family: "chaser", count: 3 }),
      Object.freeze({ at: 11 * FPS, family: "caster", count: 2 }),
      Object.freeze({ at: 17 * FPS, family: "chaser", count: 4 }),
      Object.freeze({ at: 21 * FPS, family: "caster", count: 1 }),
    ]),
  }),
  Object.freeze({
    wave: 6,
    act: 2,
    title: "Twin Pressure",
    cue: "ESSENCE CHANGES WHAT EVERY HIT DOES",
    duration: 27 * FPS,
    events: Object.freeze([
      Object.freeze({ at: 0, family: "chaser", count: 4 }),
      Object.freeze({ at: 6 * FPS, family: "caster", count: 2 }),
      Object.freeze({ at: 12 * FPS, family: "chaser", count: 4 }),
      Object.freeze({ at: 18 * FPS, family: "caster", count: 2 }),
      Object.freeze({ at: 23 * FPS, family: "chaser", count: 2 }),
    ]),
  }),
  Object.freeze({
    wave: 7,
    act: 2,
    title: "Crowded Page",
    cue: "LAW CHANGES HOW EACH CAST MULTIPLIES",
    duration: 29 * FPS,
    events: Object.freeze([
      Object.freeze({ at: 0, family: "caster", count: 2 }),
      Object.freeze({ at: 5 * FPS, family: "chaser", count: 4 }),
      Object.freeze({ at: 11 * FPS, family: "caster", count: 2 }),
      Object.freeze({ at: 17 * FPS, family: "chaser", count: 4 }),
      Object.freeze({ at: 23 * FPS, family: "caster", count: 2 }),
    ]),
  }),
  Object.freeze({
    wave: 8,
    act: 2,
    title: "Second Guardian",
    cue: "BAIT THE CHARGE · STRIKE DURING RECOVERY",
    duration: 34 * FPS,
    guardian: true,
    events: Object.freeze([
      Object.freeze({ at: 0, family: "chaser", count: 4 }),
      Object.freeze({ at: 7 * FPS, family: "caster", count: 2 }),
      Object.freeze({ at: 13 * FPS, family: "chaser", count: 3 }),
      Object.freeze({ at: 19 * FPS, family: "caster", count: 2 }),
      Object.freeze({ at: 27 * FPS, family: "chaser", count: 1, elite: true }),
    ]),
  }),
  Object.freeze({
    wave: 9,
    act: 3,
    title: "Mote Stampede",
    cue: "MOTES RUSH FROM EVERY EDGE",
    duration: 20 * FPS,
    events: Object.freeze([
      Object.freeze({ at: 0, family: "chaser", count: 4, entry: "top" }),
      Object.freeze({ at: 4 * FPS, family: "chaser", count: 4, entry: "sides" }),
      Object.freeze({ at: 8 * FPS, family: "chaser", count: 5, entry: "top" }),
      Object.freeze({ at: 12 * FPS, family: "chaser", count: 5, entry: "sides" }),
    ]),
  }),
  Object.freeze({
    wave: 10,
    act: 3,
    title: "Glyph Crossfire",
    cue: "CASTERS ENTER FROM BOTH SIDES",
    duration: 24 * FPS,
    events: Object.freeze([
      Object.freeze({ at: 0, family: "caster", count: 2, entry: "sides" }),
      Object.freeze({ at: 4 * FPS, family: "caster", count: 2, entry: "sides" }),
      Object.freeze({ at: 8 * FPS, family: "chaser", count: 3, entry: "top" }),
      Object.freeze({ at: 12 * FPS, family: "caster", count: 3, entry: "sides" }),
      Object.freeze({ at: 16 * FPS, family: "caster", count: 2, entry: "sides" }),
    ]),
  }),
  Object.freeze({
    wave: 11,
    act: 3,
    title: "Twin Wards",
    cue: "TWO CHARGERS · BREAK EACH TELEGRAPH",
    duration: 24 * FPS,
    events: Object.freeze([
      Object.freeze({ at: 0, family: "chaser", count: 1, elite: true, entry: "center" }),
      Object.freeze({ at: 0, family: "caster", count: 2, entry: "sides" }),
      Object.freeze({ at: 6 * FPS, family: "chaser", count: 4, entry: "sides" }),
      Object.freeze({ at: 12 * FPS, family: "chaser", count: 1, elite: true, entry: "center" }),
      Object.freeze({ at: 14 * FPS, family: "caster", count: 2, entry: "sides" }),
    ]),
  }),
  Object.freeze({
    wave: 12,
    act: 3,
    title: "The Redactor",
    cue: "DODGE THE RING · BAIT THE CHARGE",
    duration: 34 * FPS,
    boss: true,
    events: Object.freeze([
      Object.freeze({ at: 0, family: "chaser", count: 3, entry: "sides" }),
      Object.freeze({ at: 3 * FPS, family: "caster", count: 2, entry: "sides" }),
      Object.freeze({ at: 7 * FPS, boss: true, count: 1 }),
    ]),
  }),
]);

const SUPPORT_UPGRADES = Object.freeze([
  Object.freeze({
    id: "power",
    title: "Arcane Focus",
    describe: function () { return "All spell hits gain +0.25 damage."; },
    apply: function (player, supports) {
      supports.power += 1;
      player.power += 0.25;
    },
  }),
  Object.freeze({
    id: "haste",
    title: "Quickening",
    describe: function () { return "Cast every Form 6% more often."; },
    apply: function (player, supports) {
      supports.haste += 1;
      player.haste = Math.min(0.3, player.haste + 0.06);
    },
  }),
  Object.freeze({
    id: "vitality",
    title: "Vital Spark",
    describe: function (player) { return "Maximum HP " + player.maxHp + " → " + (player.maxHp + 1) + "; heal 2."; },
    apply: function (player, supports) {
      supports.vitality += 1;
      player.maxHp += 1;
      player.hp = Math.min(player.maxHp, player.hp + 2);
    },
  }),
  Object.freeze({
    id: "step",
    title: "Wind Step",
    describe: function () { return "Move 6% faster and heal 1 HP."; },
    apply: function (player, supports) {
      supports.step += 1;
      player.speed += 0.13;
      player.hp = Math.min(player.maxHp, player.hp + 1);
    },
  }),
]);

const SOUND_CUES = Object.freeze({
  click: [{ start: 420, end: 560, duration: 0.035, volume: 0.018, type: "square" }],
  cast: [{ start: 580, end: 920, duration: 0.055, volume: 0.014, type: "square" }],
  hit: [{ start: 190, end: 95, duration: 0.06, volume: 0.022, type: "square" }],
  enemyDown: [
    { start: 260, end: 150, duration: 0.08, volume: 0.023, type: "square" },
    { start: 170, end: 90, duration: 0.09, delay: 0.045, volume: 0.018, type: "triangle" },
  ],
  damage: [{ start: 135, end: 58, duration: 0.18, volume: 0.045, type: "sawtooth" }],
  warning: [
    { start: 300, end: 230, duration: 0.16, volume: 0.025, type: "triangle" },
    { start: 230, end: 180, duration: 0.16, delay: 0.11, volume: 0.024, type: "triangle" },
  ],
  wave: [
    { start: 392, end: 440, duration: 0.09, volume: 0.025, type: "square" },
    { start: 523, end: 587, duration: 0.11, delay: 0.08, volume: 0.026, type: "square" },
  ],
  upgrade: [
    { start: 440, end: 523, duration: 0.09, volume: 0.022, type: "triangle" },
    { start: 659, end: 784, duration: 0.13, delay: 0.07, volume: 0.026, type: "triangle" },
  ],
  win: [
    { start: 523, end: 587, duration: 0.12, volume: 0.03, type: "square" },
    { start: 659, end: 698, duration: 0.14, delay: 0.1, volume: 0.03, type: "square" },
    { start: 784, end: 988, duration: 0.22, delay: 0.21, volume: 0.034, type: "triangle" },
  ],
  lose: [
    { start: 220, end: 185, duration: 0.16, volume: 0.033, type: "triangle" },
    { start: 165, end: 82, duration: 0.28, delay: 0.13, volume: 0.037, type: "sawtooth" },
  ],
});
const SOUND_GAPS = Object.freeze({ cast: 0.08, hit: 0.035, enemyDown: 0.06 });

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function finiteNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return clamp(number, min, max);
}

function safeInteger(value, fallback, min, max) {
  return Math.round(finiteNumber(value, fallback, min, max));
}

function validPart(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function hashNumbers() {
  let hash = 2166136261;
  for (let index = 0; index < arguments.length; index += 1) {
    let value = Number(arguments[index]) >>> 0;
    hash ^= value;
    hash = Math.imul(hash, 16777619);
    hash ^= hash >>> 13;
  }
  return hash >>> 0;
}

function seededUnit() {
  return hashNumbers.apply(null, arguments) / 4294967296;
}

function createRunSeed() {
  const now = Date.now() >>> 0;
  const entropy = Math.floor(Math.random() * 0xffffffff) >>> 0;
  return hashNumbers(now, entropy, 0x504d) || 1;
}

function makeDefaultSave() {
  return {
    version: SAVE_VERSION,
    settings: { sound: true, haptics: true },
    profile: {
      bestScore: 0,
      bestTimeFrames: 0,
      wins: 0,
      discovered: [],
    },
    checkpoint: null,
  };
}

function normalizeSpell(spell) {
  const value = spell && typeof spell === "object" ? spell : {};
  return {
    form: validPart(value.form, VALID_FORMS, "bolt"),
    essence: validPart(value.essence, VALID_ESSENCES, "ember"),
    law: validPart(value.law, VALID_LAWS, "split"),
  };
}

function normalizePlayer(player) {
  const value = player && typeof player === "object" ? player : {};
  const maxHp = safeInteger(value.maxHp, 5, 1, 20);
  return {
    x: finiteNumber(value.x, W / 2, 20, W - 20),
    y: finiteNumber(value.y, H - 72, 76, H - 34),
    w: 16,
    h: 20,
    hp: finiteNumber(value.hp, maxHp, 0.25, maxHp),
    maxHp,
    speed: finiteNumber(value.speed, 2.08, 1, 4),
    power: finiteNumber(value.power, 0, 0, 10),
    haste: finiteNumber(value.haste, 0, 0, 0.3),
    invincible: 0,
    cooldown: 0,
  };
}

function normalizeSupports(supports) {
  const value = supports && typeof supports === "object" ? supports : {};
  return {
    power: safeInteger(value.power, 0, 0, 20),
    haste: safeInteger(value.haste, 0, 0, 20),
    vitality: safeInteger(value.vitality, 0, 0, 20),
    step: safeInteger(value.step, 0, 0, 20),
  };
}

function normalizeCheckpoint(checkpoint) {
  if (!checkpoint || typeof checkpoint !== "object") return null;
  const rawWave = Number(checkpoint.wave || checkpoint.currentWave);
  if (!Number.isFinite(rawWave) || rawWave < 1 || rawWave > TOTAL_WAVES) return null;
  const wave = Math.round(rawWave);

  return {
    version: CHECKPOINT_VERSION,
    phase: checkpoint.phase === "upgrade" ? "upgrade" : "wave",
    seed: safeInteger(checkpoint.seed, 1, 1, 0xffffffff),
    wave,
    score: safeInteger(checkpoint.score, 0, 0, 100000000),
    defeated: safeInteger(checkpoint.defeated, 0, 0, 1000000),
    elapsedFrames: safeInteger(checkpoint.elapsedFrames, 0, 0, 100000000),
    player: normalizePlayer(checkpoint.player),
    spell: normalizeSpell(checkpoint.spell),
    supports: normalizeSupports(checkpoint.supports),
  };
}

const SaveSystem = Object.freeze({
  migrate: function (raw, legacy) {
    const next = makeDefaultSave();
    const source = raw && typeof raw === "object" ? raw : {};
    const old = legacy && typeof legacy === "object" ? legacy : {};
    const sourceSettings = source.settings && typeof source.settings === "object" ? source.settings : old.settings || {};
    const sourceProfile = source.profile && typeof source.profile === "object" ? source.profile : {};
    const discovered = Array.isArray(sourceProfile.discovered)
      ? sourceProfile.discovered.filter(function (key) {
        if (typeof key !== "string") return false;
        const parts = key.split("|");
        return parts.length === 3 &&
          VALID_FORMS.includes(parts[0]) &&
          VALID_ESSENCES.includes(parts[1]) &&
          VALID_LAWS.includes(parts[2]);
      })
      : [];

    next.settings.sound = sourceSettings.sound !== false;
    next.settings.haptics = sourceSettings.haptics !== false;
    next.profile.bestScore = safeInteger(
      sourceProfile.bestScore !== undefined ? sourceProfile.bestScore : source.bestScore !== undefined ? source.bestScore : old.bestScore,
      0,
      0,
      100000000,
    );
    next.profile.bestTimeFrames = safeInteger(sourceProfile.bestTimeFrames, 0, 0, 100000000);
    next.profile.wins = safeInteger(sourceProfile.wins, 0, 0, 1000000);
    next.profile.discovered = Array.from(new Set(discovered)).slice(0, 8);
    next.checkpoint = normalizeCheckpoint(source.checkpoint);
    return next;
  },

  load: function () {
    let raw = null;
    let legacySettings = {};
    let legacyBest = 0;
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) raw = JSON.parse(saved);
    } catch {
      raw = null;
    }
    try {
      legacySettings = JSON.parse(localStorage.getItem(LEGACY_SETTINGS_KEY) || "{}");
    } catch {
      legacySettings = {};
    }
    try {
      legacyBest = Number.parseInt(localStorage.getItem(LEGACY_BEST_SCORE_KEY) || "0", 10) || 0;
    } catch {
      legacyBest = 0;
    }
    const migrated = this.migrate(raw, { settings: legacySettings, bestScore: legacyBest });
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(migrated));
    } catch {
      // The game remains playable when local storage is unavailable.
    }
    return migrated;
  },

  write: function () {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(persistent));
    } catch {
      // The current session remains playable when storage is unavailable.
    }
  },

  setCheckpoint: function (checkpoint) {
    persistent.checkpoint = normalizeCheckpoint(checkpoint);
    this.write();
  },

  clearCheckpoint: function () {
    persistent.checkpoint = null;
    this.write();
  },

  proveCombination: function (spell) {
    const key = spellKey(spell);
    if (!persistent.profile.discovered.includes(key)) {
      persistent.profile.discovered.push(key);
      persistent.profile.discovered.sort();
      this.write();
      return true;
    }
    return false;
  },
});

const persistent = SaveSystem.load();
const settings = persistent.settings;
const keys = { left: false, right: false, up: false, down: false };
const pointerControl = {
  active: false,
  pointerId: null,
  x: W / 2,
  y: H - 72,
};
const lastSoundAt = new Map();
let audioContext = null;

const state = {
  mode: "menu",
  menuOpen: false,
  time: 0,
  seed: 1,
  wave: 0,
  waveFrame: 0,
  runElapsed: 0,
  spawnIndex: 0,
  nextEnemyId: 1,
  targetId: null,
  score: 0,
  bestScore: persistent.profile.bestScore,
  defeated: 0,
  player: null,
  spell: normalizeSpell(null),
  supports: normalizeSupports(null),
  enemies: [],
  projectiles: [],
  enemyProjectiles: [],
  pendingCasts: [],
  sparks: [],
  waveBannerTimer: 0,
  waveBannerText: "",
  lastDiscovery: "",
  screenShake: 0,
  damageFlash: 0,
};

function unlockAudio() {
  if (!settings.sound) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    if (!audioContext) audioContext = new AudioContextClass();
    if (audioContext.state === "suspended") {
      const resume = audioContext.resume();
      if (resume && resume.catch) resume.catch(function () {});
    }
  } catch {
    audioContext = null;
  }
}

function playTone(cue) {
  if (!audioContext || audioContext.state !== "running") return;
  const startAt = audioContext.currentTime + (cue.delay || 0);
  const endAt = startAt + cue.duration;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = cue.type || "square";
  oscillator.frequency.setValueAtTime(Math.max(1, cue.start), startAt);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, cue.end), endAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(cue.volume || 0.02, startAt + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, endAt);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(startAt);
  oscillator.stop(endAt + 0.01);
}

function playSound(name) {
  if (!settings.sound || !SOUND_CUES[name]) return;
  unlockAudio();
  if (!audioContext || audioContext.state !== "running") return;
  const now = audioContext.currentTime;
  const minimumGap = SOUND_GAPS[name] || 0;
  if (now - (lastSoundAt.get(name) === undefined ? -Infinity : lastSoundAt.get(name)) < minimumGap) return;
  lastSoundAt.set(name, now);
  for (const cue of SOUND_CUES[name]) playTone(cue);
}

function triggerHaptic(pattern) {
  if (!settings.haptics || typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
  navigator.vibrate(pattern);
}

function clearInput() {
  for (const key of Object.keys(keys)) keys[key] = false;
  if (pointerControl.pointerId !== null && canvas.hasPointerCapture && canvas.hasPointerCapture(pointerControl.pointerId)) {
    canvas.releasePointerCapture(pointerControl.pointerId);
  }
  pointerControl.active = false;
  pointerControl.pointerId = null;
}

function addSparks(x, y, count, color) {
  for (let index = 0; index < count; index += 1) {
    state.sparks.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 2.6,
      vy: (Math.random() - 0.5) * 2.6,
      life: 14 + Math.random() * 12,
      color,
    });
  }
  if (state.sparks.length > MAX_SPARKS) {
    state.sparks.splice(0, state.sparks.length - MAX_SPARKS);
  }
}

function overlap(a, b) {
  return Math.abs(a.x - b.x) * 2 < a.w + b.w && Math.abs(a.y - b.y) * 2 < a.h + b.h;
}

function rectCircle(rect, circle) {
  const nearestX = clamp(circle.x, rect.x - rect.w / 2, rect.x + rect.w / 2);
  const nearestY = clamp(circle.y, rect.y - rect.h / 2, rect.y + rect.h / 2);
  const dx = circle.x - nearestX;
  const dy = circle.y - nearestY;
  return dx * dx + dy * dy < circle.r * circle.r;
}

function spellName(spell) {
  return SPELL_PARTS.forms[spell.form].title + " · " +
    SPELL_PARTS.essences[spell.essence].title + " · " +
    SPELL_PARTS.laws[spell.law].title;
}

function spellKey(spell) {
  return spell.form + "|" + spell.essence + "|" + spell.law;
}

function spellReadout(spell) {
  return "FORM " + SPELL_PARTS.forms[spell.form].title + " · ESSENCE " +
    SPELL_PARTS.essences[spell.essence].title + " · LAW " + SPELL_PARTS.laws[spell.law].title;
}

function spellRole(spell) {
  const form = spell.form === "bolt" ? "single-target" : "crowd shield";
  const essence = spell.essence === "ember" ? "burn splash" : "slow";
  const law = spell.law === "split" ? "3 now" : "repeat later";
  return form + " · " + essence + " · " + law;
}

function spellPartPromise(axis, value) {
  if (axis === "form") return value === "bolt" ? "hunts the mark" : "guards nearby";
  if (axis === "essence") return value === "ember" ? "burns + splashes" : "slows";
  return value === "split" ? "casts 3 now" : "repeats later";
}

function rewrittenSpell(axis, value) {
  return {
    form: axis === "form" ? value : state.spell.form,
    essence: axis === "essence" ? value : state.spell.essence,
    law: axis === "law" ? value : state.spell.law,
  };
}

function currentWaveDefinition() {
  return RUN_DEFINITION[state.wave - 1] || RUN_DEFINITION[0];
}

function checkpointFromState(phase) {
  return {
    version: CHECKPOINT_VERSION,
    phase,
    seed: state.seed,
    wave: state.wave,
    score: state.score,
    defeated: state.defeated,
    elapsedFrames: state.runElapsed,
    player: {
      x: state.player.x,
      y: state.player.y,
      hp: state.player.hp,
      maxHp: state.player.maxHp,
      speed: state.player.speed,
      power: state.player.power,
      haste: state.player.haste,
    },
    spell: { form: state.spell.form, essence: state.spell.essence, law: state.spell.law },
    supports: {
      power: state.supports.power,
      haste: state.supports.haste,
      vitality: state.supports.vitality,
      step: state.supports.step,
    },
  };
}

const EnemySystem = Object.freeze({
  makeEnemy: function (x, y, event) {
    const id = state.nextEnemyId;
    state.nextEnemyId += 1;
    if (event.boss) {
      return {
        id,
        family: "boss",
        title: "The Redactor",
        x,
        y,
        w: 40,
        h: 38,
        hp: 150,
        maxHp: 150,
        speed: 0.38,
        scoreValue: 1800,
        boss: true,
        elite: false,
        bodyColor: "#7b2d43",
        lightColor: "#e15b78",
        touchCooldown: 0,
        attackState: "hunt",
        attackTimer: 105,
        attackCycle: 0,
        targetX: x,
        targetY: y,
        dashVx: 0,
        dashVy: 0,
        burnUntil: 0,
        nextBurnAt: 0,
        burnDamage: 0,
        slowUntil: 0,
        hitFlash: 0,
      };
    }

    const config = ENEMY_FAMILIES[event.family];
    const elite = event.elite === true;
    const waveScale = (state.wave - 1) * 0.46;
    const hp = elite ? 28 + currentWaveDefinition().act * 8 : config.hp + waveScale;
    return {
      id,
      family: event.family,
      title: elite ? "Ward Guardian" : config.title,
      x,
      y,
      w: elite ? 30 : config.width,
      h: elite ? 28 : config.height,
      hp,
      maxHp: hp,
      speed: elite ? 0.43 + currentWaveDefinition().act * 0.02 : config.speed + currentWaveDefinition().act * 0.025,
      scoreValue: elite ? 460 : config.score + state.wave * 8,
      boss: false,
      elite,
      bodyColor: elite ? "#7455a6" : config.body,
      lightColor: elite ? "#d8b5ff" : config.light,
      touchCooldown: 0,
      attackState: elite ? "hunt" : event.family === "caster" ? "reposition" : "chase",
      attackTimer: elite ? 90 : event.family === "caster" ? 75 + Math.floor(seededUnit(state.seed, id, 8) * 35) : 0,
      targetX: x,
      targetY: y,
      dashVx: 0,
      dashVy: 0,
      burnUntil: 0,
      nextBurnAt: 0,
      burnDamage: 0,
      slowUntil: 0,
      hitFlash: 0,
    };
  },

  moveToward: function (enemy, target, speedScale, wobble) {
    const dx = target.x - enemy.x;
    const dy = target.y - enemy.y;
    const length = Math.max(1, Math.hypot(dx, dy));
    const drift = Math.sin((state.time + enemy.id * 13) / 18) * wobble;
    enemy.x += (dx / length) * enemy.speed * speedScale + drift;
    enemy.y += (dy / length) * enemy.speed * speedScale;
  },

  moveCaster: function (enemy, player, speedScale) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distance = Math.max(1, Math.hypot(dx, dy));
    if (enemy.attackState === "aim") {
      if (enemy.attackTimer <= 0) {
        this.fireAimedShot(enemy, enemy.targetX, enemy.targetY, 2.25, "#87d7ff");
        enemy.attackState = "reposition";
        enemy.attackTimer = 92;
      }
      return;
    }

    const direction = distance < 104 ? -1 : distance > 150 ? 1 : 0;
    enemy.x += (dx / distance) * enemy.speed * speedScale * direction;
    enemy.y += (dy / distance) * enemy.speed * speedScale * direction;
    enemy.x += Math.sin((state.time + enemy.id * 19) / 22) * 0.22;
    if (enemy.attackTimer <= 0) {
      enemy.attackState = "aim";
      enemy.attackTimer = 34;
      enemy.targetX = player.x;
      enemy.targetY = player.y;
      playSound("warning");
    }
  },

  updateElite: function (enemy, player, speedScale) {
    if (enemy.attackState === "hunt") {
      this.moveToward(enemy, player, speedScale, 0.12);
      if (enemy.attackTimer <= 0) {
        enemy.attackState = "telegraph";
        enemy.attackTimer = 40;
        enemy.targetX = player.x;
        enemy.targetY = player.y;
        addSparks(enemy.x, enemy.y, 12, "#d8b5ff");
        playSound("warning");
      }
      return;
    }
    if (enemy.attackState === "telegraph") {
      if (enemy.attackTimer <= 0) {
        const dx = enemy.targetX - enemy.x;
        const dy = enemy.targetY - enemy.y;
        const length = Math.max(1, Math.hypot(dx, dy));
        enemy.dashVx = (dx / length) * 5.1;
        enemy.dashVy = (dy / length) * 5.1;
        enemy.attackState = "dash";
        enemy.attackTimer = 22;
      }
      return;
    }
    if (enemy.attackState === "dash") {
      enemy.x += enemy.dashVx * speedScale;
      enemy.y += enemy.dashVy * speedScale;
      if (state.time % 2 === 0) addSparks(enemy.x, enemy.y, 1, "#d8b5ff");
      if (enemy.attackTimer <= 0) {
        enemy.attackState = "recover";
        enemy.attackTimer = 34;
      }
      return;
    }
    if (enemy.attackTimer <= 0) {
      enemy.attackState = "hunt";
      enemy.attackTimer = 105;
    }
  },

  updateBoss: function (enemy, player, speedScale) {
    if (enemy.attackState === "hunt") {
      this.moveToward(enemy, player, speedScale, 0.1);
      if (enemy.attackTimer <= 0) {
        enemy.attackCycle += 1;
        if (enemy.attackCycle % 2 === 1) {
          enemy.attackState = "volleyTell";
          enemy.attackTimer = 48;
        } else {
          enemy.attackState = "dashTell";
          enemy.attackTimer = 44;
          enemy.targetX = player.x;
          enemy.targetY = player.y;
        }
        addSparks(enemy.x, enemy.y, 16, "#ffd166");
        playSound("warning");
        triggerHaptic(18);
      }
      return;
    }

    if (enemy.attackState === "volleyTell") {
      if (enemy.attackTimer <= 0) {
        const count = enemy.hp < enemy.maxHp * 0.5 ? 12 : 9;
        for (let index = 0; index < count; index += 1) {
          const angle = (Math.PI * 2 * index) / count + enemy.attackCycle * 0.17;
          this.fireProjectile(enemy.x, enemy.y, Math.cos(angle) * 1.85, Math.sin(angle) * 1.85, "#ff9b72", 240);
        }
        this.fireAimedShot(enemy, player.x, player.y, 2.7, "#ffd166");
        enemy.attackState = "recover";
        enemy.attackTimer = 42;
      }
      return;
    }

    if (enemy.attackState === "dashTell") {
      if (enemy.attackTimer <= 0) {
        const dx = enemy.targetX - enemy.x;
        const dy = enemy.targetY - enemy.y;
        const length = Math.max(1, Math.hypot(dx, dy));
        enemy.dashVx = (dx / length) * 5.8;
        enemy.dashVy = (dy / length) * 5.8;
        enemy.attackState = "dash";
        enemy.attackTimer = 26;
      }
      return;
    }

    if (enemy.attackState === "dash") {
      enemy.x += enemy.dashVx * speedScale;
      enemy.y += enemy.dashVy * speedScale;
      if (state.time % 2 === 0) addSparks(enemy.x, enemy.y, 2, "#ff8c42");
      if (enemy.attackTimer <= 0) {
        enemy.attackState = "recover";
        enemy.attackTimer = 38;
      }
      return;
    }

    if (enemy.attackTimer <= 0) {
      enemy.attackState = "hunt";
      enemy.attackTimer = enemy.hp < enemy.maxHp * 0.5 ? 72 : 96;
    }
  },

  fireAimedShot: function (enemy, targetX, targetY, speed, color) {
    const dx = targetX - enemy.x;
    const dy = targetY - enemy.y;
    const length = Math.max(1, Math.hypot(dx, dy));
    this.fireProjectile(enemy.x, enemy.y, (dx / length) * speed, (dy / length) * speed, color, 210);
  },

  fireProjectile: function (x, y, vx, vy, color, life) {
    state.enemyProjectiles.push({ x, y, vx, vy, r: 5, color, life });
    if (state.enemyProjectiles.length > MAX_ENEMY_PROJECTILES) {
      state.enemyProjectiles.splice(0, state.enemyProjectiles.length - MAX_ENEMY_PROJECTILES);
    }
  },

  update: function () {
    const player = state.player;
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      enemy.touchCooldown = Math.max(0, enemy.touchCooldown - 1);
      enemy.attackTimer -= 1;
      enemy.hitFlash = Math.max(0, enemy.hitFlash - 1);

      if (enemy.burnUntil > state.time && state.time >= enemy.nextBurnAt) {
        enemy.hp -= enemy.burnDamage;
        enemy.nextBurnAt = state.time + 30;
        addSparks(enemy.x, enemy.y, 3, "#ff8c42");
      }
      if (enemy.hp <= 0) continue;

      const speedScale = enemy.slowUntil > state.time ? 0.62 : 1;
      if (enemy.boss) this.updateBoss(enemy, player, speedScale);
      else if (enemy.elite) this.updateElite(enemy, player, speedScale);
      else if (enemy.family === "caster") this.moveCaster(enemy, player, speedScale);
      else this.moveToward(enemy, player, speedScale, 0.24);

      enemy.x = clamp(enemy.x, 18, W - 18);
      enemy.y = clamp(enemy.y, 64, H - 28);
      if (overlap(player, enemy) && player.invincible <= 0 && enemy.touchCooldown <= 0) {
        this.damagePlayer(enemy.boss ? 2 : 1);
        enemy.touchCooldown = 58;
      }
    }
  },

  updateProjectiles: function () {
    const player = state.player;
    for (const shot of state.enemyProjectiles) {
      shot.x += shot.vx;
      shot.y += shot.vy;
      shot.life -= 1;
      if (shot.life > 0 && player.invincible <= 0 && rectCircle(player, shot)) {
        shot.life = 0;
        this.damagePlayer(1);
      }
    }
    state.enemyProjectiles = state.enemyProjectiles.filter(function (shot) {
      return shot.life > 0 && shot.x > -18 && shot.x < W + 18 && shot.y > 48 && shot.y < H + 18;
    });
  },

  damagePlayer: function (amount) {
    const player = state.player;
    if (!player || player.invincible > 0) return;
    player.hp -= amount;
    player.invincible = 72;
    addSparks(player.x, player.y, 16, "#ff6b6b");
    state.screenShake = Math.max(state.screenShake, 10);
    state.damageFlash = 8;
    playSound("damage");
    triggerHaptic(45);
  },

  applySpellHit: function (enemy, damage, essence) {
    if (!enemy || enemy.hp <= 0) return;
    enemy.hp -= damage;
    enemy.hitFlash = 5;
    if (essence === "ember") {
      enemy.burnUntil = Math.max(enemy.burnUntil, state.time + 120);
      enemy.burnDamage = Math.max(enemy.burnDamage, 0.22 + state.player.power * 0.08);
      if (enemy.nextBurnAt <= state.time) enemy.nextBurnAt = state.time + 24;
    } else {
      enemy.slowUntil = Math.max(enemy.slowUntil, state.time + 105);
    }
    addSparks(enemy.x, enemy.y, 6, SPELL_PARTS.essences[essence].light);
    playSound("hit");
  },

  collectDefeated: function () {
    const defeated = state.enemies.filter(function (enemy) { return enemy.hp <= 0; });
    for (const enemy of defeated) {
      state.score += Math.round(enemy.scoreValue);
      state.defeated += 1;
      addSparks(enemy.x, enemy.y, enemy.boss ? 36 : enemy.elite ? 24 : 12, enemy.boss ? "#ffd166" : enemy.lightColor);
      state.screenShake = Math.max(state.screenShake, enemy.boss ? 16 : enemy.elite ? 9 : 3);
      playSound("enemyDown");
    }
    if (defeated.length > 0) {
      state.enemies = state.enemies.filter(function (enemy) { return enemy.hp > 0; });
    }
  },
});

const SpawnSystem = Object.freeze({
  point: function (event, eventIndex, unitIndex) {
    if (event.boss) return { x: W / 2, y: 92 };
    if (event.entry === "center") {
      return { x: W / 2 + (unitIndex - (event.count - 1) / 2) * 34, y: 82 };
    }
    if (event.entry === "top") {
      return { x: 38 + ((unitIndex + 1) / (event.count + 1)) * (W - 76), y: 72 };
    }
    if (event.entry === "sides") {
      const side = (eventIndex + unitIndex) % 2;
      const lane = Math.floor(unitIndex / 2);
      const laneCount = Math.ceil(event.count / 2);
      const y = 104 + ((lane + 1) / (laneCount + 1)) * (H - 206);
      return { x: side === 0 ? 22 : W - 22, y };
    }
    const side = Math.floor(seededUnit(state.seed, state.wave, eventIndex, unitIndex, 1) * 3);
    const position = seededUnit(state.seed, state.wave, eventIndex, unitIndex, 2);
    if (side === 0) return { x: 34 + position * (W - 68), y: 72 };
    if (side === 1) return { x: 22, y: 92 + position * (H - 174) };
    return { x: W - 22, y: 92 + position * (H - 174) };
  },

  event: function (event, eventIndex) {
    for (let unitIndex = 0; unitIndex < event.count; unitIndex += 1) {
      const point = this.point(event, eventIndex, unitIndex);
      state.enemies.push(EnemySystem.makeEnemy(point.x, point.y, event));
    }
    const color = event.boss || event.elite ? "#ffd166" : event.family === "caster" ? "#8bc9eb" : "#83dc91";
    const newest = state.enemies[state.enemies.length - 1];
    addSparks(event.boss ? W / 2 : newest.x, event.boss ? 92 : newest.y, event.boss ? 28 : 7, color);
  },

  spawnDue: function () {
    const definition = currentWaveDefinition();
    while (state.spawnIndex < definition.events.length && definition.events[state.spawnIndex].at <= state.waveFrame) {
      this.event(definition.events[state.spawnIndex], state.spawnIndex);
      state.spawnIndex += 1;
    }
  },
});

const SpellSystem = Object.freeze({
  selectTarget: function () {
    let target = null;
    let bestScore = Infinity;
    const player = state.player;
    if (!player) return null;
    for (const enemy of state.enemies) {
      if (enemy.hp <= 0) continue;
      const distance = Math.hypot(enemy.x - player.x, enemy.y - player.y);
      const priority = (enemy.family === "caster" ? 24 : 0) + (enemy.elite ? 30 : 0) + (enemy.boss ? 18 : 0);
      const threatScore = distance - priority;
      if (threatScore < bestScore || (Math.abs(threatScore - bestScore) < 0.001 && target && enemy.id < target.id)) {
        target = enemy;
        bestScore = threatScore;
      }
    }
    state.targetId = target ? target.id : null;
    return target;
  },

  targetById: function (id) {
    return state.enemies.find(function (enemy) { return enemy.id === id && enemy.hp > 0; }) || null;
  },

  cast: function (multiplier, forcedTargetId) {
    if (!state.player || state.mode !== "playing" || state.menuOpen) return false;
    const target = this.targetById(forcedTargetId) || this.selectTarget();
    if (!target) return false;
    const player = state.player;
    const form = state.spell.form;
    const law = state.spell.law;
    const baseCooldown = SPELL_PARTS.forms[form].cooldown;
    if (multiplier === undefined) {
      if (player.cooldown > 0) return false;
      player.cooldown = Math.max(8, Math.round(baseCooldown * (1 - player.haste)));
    }
    const castMultiplier = multiplier === undefined ? 1 : multiplier;
    this.spawnCast(target, castMultiplier);
    if (law === "echo" && multiplier === undefined) {
      state.pendingCasts.push({
        at: state.time + 12,
        targetId: target.id,
        multiplier: 0.74,
      });
      if (state.pendingCasts.length > MAX_PENDING_CASTS) {
        state.pendingCasts.splice(0, state.pendingCasts.length - MAX_PENDING_CASTS);
      }
    }
    addSparks(player.x, player.y - 17, form === "orbit" ? 7 : 5, SPELL_PARTS.essences[state.spell.essence].light);
    playSound("cast");
    return true;
  },

  spawnCast: function (target, castMultiplier) {
    const player = state.player;
    const essence = state.spell.essence;
    const split = state.spell.law === "split";
    const count = split ? 3 : 1;
    const dx = target.x - player.x;
    const dy = target.y - player.y;
    const baseAngle = Math.atan2(dy, dx);
    for (let index = 0; index < count; index += 1) {
      const offset = count === 1 ? 0 : (index - 1) * 0.2;
      if (state.spell.form === "bolt") {
        const speed = essence === "frost" ? 5.25 : 5.65;
        const damageBase = essence === "ember" ? 1.8 : 1.4;
        const damage = (damageBase + player.power) * castMultiplier * (split ? 0.73 : 1);
        state.projectiles.push({
          kind: "bolt",
          essence,
          x: player.x,
          y: player.y - 13,
          vx: Math.cos(baseAngle + offset) * speed,
          vy: Math.sin(baseAngle + offset) * speed,
          speed,
          targetId: target.id,
          r: essence === "ember" ? 5 : 4,
          damage,
          life: 105,
          pierce: essence === "frost" ? 1 : 0,
          hitIds: {},
        });
      } else {
        const damageBase = essence === "ember" ? 1.08 : 0.86;
        state.projectiles.push({
          kind: "orbit",
          essence,
          x: player.x,
          y: player.y,
          r: 12,
          damage: (damageBase + player.power * 0.55) * castMultiplier * (split ? 0.78 : 1),
          life: 168,
          angle: baseAngle + offset + (Math.PI * 2 * index) / count,
          radius: count === 1 ? 44 : 34 + index * 10,
          angularVelocity: essence === "frost" ? 0.084 : 0.096,
          hitIds: {},
        });
      }
    }
    if (state.projectiles.length > MAX_PROJECTILES) {
      state.projectiles.splice(0, state.projectiles.length - MAX_PROJECTILES);
    }
  },

  processPending: function () {
    const ready = state.pendingCasts.filter(function (pending) { return pending.at <= state.time; });
    state.pendingCasts = state.pendingCasts.filter(function (pending) { return pending.at > state.time; });
    for (const pending of ready) this.cast(pending.multiplier, pending.targetId);
  },

  hitEnemy: function (projectile, enemy) {
    EnemySystem.applySpellHit(enemy, projectile.damage, projectile.essence);
    projectile.hitIds[enemy.id] = state.time;
    if (projectile.kind === "orbit" && !enemy.boss) {
      const dx = enemy.x - state.player.x;
      const dy = enemy.y - state.player.y;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const push = enemy.elite ? 0.5 : 1;
      enemy.x = clamp(enemy.x + (dx / distance) * push, 18, W - 18);
      enemy.y = clamp(enemy.y + (dy / distance) * push, 64, H - 28);
    }
    if (projectile.essence === "ember") {
      for (const nearby of state.enemies) {
        if (nearby.id === enemy.id || nearby.hp <= 0) continue;
        if (Math.hypot(nearby.x - enemy.x, nearby.y - enemy.y) <= 34) {
          EnemySystem.applySpellHit(nearby, projectile.damage * 0.32, "ember");
        }
      }
    }
  },

  updateProjectiles: function () {
    for (const projectile of state.projectiles) {
      projectile.life -= 1;
      if (projectile.kind === "bolt") {
        let target = this.targetById(projectile.targetId);
        if (!target) {
          target = this.selectTarget();
          projectile.targetId = target ? target.id : null;
        }
        if (target) {
          const dx = target.x - projectile.x;
          const dy = target.y - projectile.y;
          const length = Math.max(1, Math.hypot(dx, dy));
          projectile.vx = projectile.vx * 0.9 + (dx / length) * projectile.speed * 0.1;
          projectile.vy = projectile.vy * 0.9 + (dy / length) * projectile.speed * 0.1;
          const velocityLength = Math.max(0.01, Math.hypot(projectile.vx, projectile.vy));
          projectile.vx = (projectile.vx / velocityLength) * projectile.speed;
          projectile.vy = (projectile.vy / velocityLength) * projectile.speed;
        }
        projectile.x += projectile.vx;
        projectile.y += projectile.vy;
        for (const enemy of state.enemies) {
          if (enemy.hp <= 0 || projectile.hitIds[enemy.id] || !rectCircle(enemy, projectile)) continue;
          this.hitEnemy(projectile, enemy);
          projectile.pierce -= 1;
          if (projectile.pierce < 0) {
            projectile.life = 0;
            break;
          }
        }
      } else {
        projectile.angle += projectile.angularVelocity;
        projectile.x = state.player.x + Math.cos(projectile.angle) * projectile.radius;
        projectile.y = state.player.y + Math.sin(projectile.angle) * projectile.radius;
        for (const shot of state.enemyProjectiles) {
          if (shot.life <= 0 || Math.hypot(shot.x - projectile.x, shot.y - projectile.y) > shot.r + projectile.r) continue;
          shot.life = 0;
          addSparks(shot.x, shot.y, 5, SPELL_PARTS.essences[projectile.essence].light);
        }
        for (const enemy of state.enemies) {
          const lastHit = projectile.hitIds[enemy.id] === undefined ? -Infinity : projectile.hitIds[enemy.id];
          if (enemy.hp <= 0 || state.time - lastHit < ORBIT_HIT_GAP || !rectCircle(enemy, projectile)) continue;
          this.hitEnemy(projectile, enemy);
        }
      }
    }
    state.enemyProjectiles = state.enemyProjectiles.filter(function (shot) { return shot.life > 0; });
    state.projectiles = state.projectiles.filter(function (projectile) {
      if (projectile.life <= 0) return false;
      if (projectile.kind === "orbit") return true;
      return projectile.x > -24 && projectile.x < W + 24 && projectile.y > 42 && projectile.y < H + 24;
    });
  },

  update: function () {
    this.selectTarget();
    this.processPending();
    this.cast();
    this.updateProjectiles();
  },
});

const RunSystem = Object.freeze({
  resetRuntime: function () {
    clearInput();
    state.menuOpen = false;
    menuPanel.hidden = true;
    state.time = 0;
    state.wave = 0;
    state.waveFrame = 0;
    state.runElapsed = 0;
    state.spawnIndex = 0;
    state.targetId = null;
    state.score = 0;
    state.defeated = 0;
    state.enemies = [];
    state.projectiles = [];
    state.enemyProjectiles = [];
    state.pendingCasts = [];
    state.sparks = [];
    state.waveBannerTimer = 0;
    state.waveBannerText = "";
    state.lastDiscovery = "";
    state.screenShake = 0;
    state.damageFlash = 0;
    state.player = normalizePlayer(null);
    state.spell = normalizeSpell(null);
    state.supports = normalizeSupports(null);
    pointerControl.x = state.player.x;
    pointerControl.y = state.player.y;
  },

  startNew: function (seed) {
    this.resetRuntime();
    state.seed = safeInteger(seed === undefined ? createRunSeed() : seed, 1, 1, 0xffffffff);
    this.startWave(1, true);
  },

  resume: function () {
    const checkpoint = normalizeCheckpoint(persistent.checkpoint);
    if (!checkpoint) {
      this.startNew();
      return false;
    }
    this.resetRuntime();
    state.seed = checkpoint.seed;
    state.wave = checkpoint.wave;
    state.score = checkpoint.score;
    state.defeated = checkpoint.defeated;
    state.runElapsed = checkpoint.elapsedFrames;
    state.player = normalizePlayer(checkpoint.player);
    state.spell = normalizeSpell(checkpoint.spell);
    state.supports = normalizeSupports(checkpoint.supports);
    pointerControl.x = state.player.x;
    pointerControl.y = state.player.y;
    startPanel.hidden = true;
    if (checkpoint.phase === "upgrade" && checkpoint.wave < TOTAL_WAVES) {
      state.mode = "upgrade";
      UISystem.showRewrite(false);
    } else {
      this.startWave(checkpoint.wave, false);
    }
    return true;
  },

  startWave: function (wave, saveBoundary) {
    const definition = RUN_DEFINITION[wave - 1];
    state.wave = wave;
    state.waveFrame = 0;
    state.spawnIndex = 0;
    state.nextEnemyId = wave * 1000 + 1;
    state.targetId = null;
    state.mode = "playing";
    state.player.x = W / 2;
    state.player.y = H - 72;
    state.player.cooldown = 0;
    state.player.invincible = 35;
    pointerControl.x = state.player.x;
    pointerControl.y = state.player.y;
    state.enemies = [];
    state.projectiles = [];
    state.enemyProjectiles = [];
    state.pendingCasts = [];
    state.waveBannerText = definition.boss
      ? "ACT III · BOSS"
      : definition.guardian
        ? "ACT " + roman(definition.act) + " · GUARDIAN"
        : "ACT " + roman(definition.act) + " · WAVE " + wave;
    state.waveBannerTimer = WAVE_BANNER_DURATION;
    startPanel.hidden = true;
    UISystem.hideRewrite();
    if (saveBoundary !== false) SaveSystem.setCheckpoint(checkpointFromState("wave"));
    SpawnSystem.spawnDue();
    addSparks(W / 2, 92, definition.boss ? 22 : 10, definition.guardian ? "#d8b5ff" : "#9bf6ff");
  },

  update: function () {
    state.waveFrame += 1;
    state.runElapsed += 1;
    SpawnSystem.spawnDue();
    const definition = currentWaveDefinition();
    if (state.player.hp <= 0) {
      this.finish("lose");
      return;
    }
    if (state.spawnIndex >= definition.events.length && state.enemies.length === 0) {
      this.completeWave();
    }
  },

  completeWave: function () {
    state.lastDiscovery = SaveSystem.proveCombination(state.spell) ? spellName(state.spell) : "";
    if (state.wave === 4 || state.wave === 8) state.player.hp = state.player.maxHp;
    else state.player.hp = Math.min(state.player.maxHp, state.player.hp + 1);
    if (state.wave >= TOTAL_WAVES) {
      this.finish("win");
      return;
    }
    state.mode = "upgrade";
    clearInput();
    SaveSystem.setCheckpoint(checkpointFromState("upgrade"));
    UISystem.showRewrite(false);
    playSound("wave");
    triggerHaptic([24, 45, 24]);
  },

  chooseRewrite: function (apply) {
    if (state.mode !== "upgrade") return;
    apply();
    state.lastDiscovery = "";
    playSound("upgrade");
    triggerHaptic(28);
    this.startWave(state.wave + 1, true);
  },

  finish: function (mode) {
    state.mode = mode;
    clearInput();
    if (mode === "win" && SaveSystem.proveCombination(state.spell)) state.lastDiscovery = spellName(state.spell);
    if (state.score > persistent.profile.bestScore) persistent.profile.bestScore = state.score;
    state.bestScore = persistent.profile.bestScore;
    if (mode === "win") {
      persistent.profile.wins += 1;
      if (persistent.profile.bestTimeFrames === 0 || state.runElapsed < persistent.profile.bestTimeFrames) {
        persistent.profile.bestTimeFrames = state.runElapsed;
      }
    }
    persistent.checkpoint = null;
    SaveSystem.write();
    playSound(mode);
    triggerHaptic(mode === "win" ? [35, 45, 35, 45, 70] : [90, 60, 120]);
    UISystem.syncStartPanel();
  },
});

function roman(number) {
  return number === 1 ? "I" : number === 2 ? "II" : "III";
}

function formatFrames(frames) {
  const totalSeconds = Math.max(0, Math.ceil(frames / FPS));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes + ":" + String(seconds).padStart(2, "0");
}

const UISystem = Object.freeze({
  syncSettings: function () {
    soundButton.textContent = "Sound: " + (settings.sound ? "On" : "Off");
    soundButton.setAttribute("aria-pressed", String(settings.sound));
    hapticsButton.textContent = "Haptics: " + (settings.haptics ? "On" : "Off");
    hapticsButton.setAttribute("aria-pressed", String(settings.haptics));
  },

  syncStartPanel: function () {
    const checkpoint = normalizeCheckpoint(persistent.checkpoint);
    startPanel.hidden = state.mode !== "menu";
    resumeRunButton.hidden = !checkpoint;
    if (checkpoint) {
      resumeRunButton.textContent = checkpoint.phase === "upgrade"
        ? "Resume Rewrite after Wave " + checkpoint.wave
        : "Resume Wave " + checkpoint.wave;
      startStatus.textContent = "Checkpoint: " + spellName(checkpoint.spell) + " · " + formatFrames(checkpoint.elapsedFrames);
    } else {
      startStatus.textContent = "Three acts, twelve waves. Rewrite for a new play style or take Support.";
    }
    spellbookText.textContent = "Spellbook " + persistent.profile.discovered.length + "/8 · Unseen rewrites are marked NEW";
  },

  showRewrite: function (saveBoundary) {
    if (saveBoundary) SaveSystem.setCheckpoint(checkpointFromState("upgrade"));
    upgradeChoices.replaceChildren();
    upgradeEyebrow.textContent = state.lastDiscovery
      ? "New Spell Proven · " + persistent.profile.discovered.length + "/8"
      : "Wave Cleared";
    upgradeTitle.textContent = state.wave === 4
      ? "Act I cleared · Choose one"
      : state.wave === 8
        ? "Act II cleared · Choose one"
        : "Choose one";
    upgradeHelp.textContent = "CURRENT · " + spellName(state.spell);

    const nextForm = state.spell.form === "bolt" ? "orbit" : "bolt";
    const nextEssence = state.spell.essence === "ember" ? "frost" : "ember";
    const nextLaw = state.spell.law === "split" ? "echo" : "split";
    const support = SUPPORT_UPGRADES[hashNumbers(state.seed, state.wave, 77) % SUPPORT_UPGRADES.length];
    const formSpell = rewrittenSpell("form", nextForm);
    const essenceSpell = rewrittenSpell("essence", nextEssence);
    const lawSpell = rewrittenSpell("law", nextLaw);
    const options = [
      {
        axis: "form",
        spell: formSpell,
        title: "FORM · " + SPELL_PARTS.forms[nextForm].title,
        detail: spellPartPromise("form", nextForm),
        description: SPELL_PARTS.forms[nextForm].description,
        apply: function () { state.spell.form = nextForm; },
      },
      {
        axis: "essence",
        spell: essenceSpell,
        title: "ESSENCE · " + SPELL_PARTS.essences[nextEssence].title,
        detail: spellPartPromise("essence", nextEssence),
        description: SPELL_PARTS.essences[nextEssence].description,
        apply: function () { state.spell.essence = nextEssence; },
      },
      {
        axis: "law",
        spell: lawSpell,
        title: "LAW · " + SPELL_PARTS.laws[nextLaw].title,
        detail: spellPartPromise("law", nextLaw),
        description: SPELL_PARTS.laws[nextLaw].description,
        apply: function () { state.spell.law = nextLaw; },
      },
      {
        axis: "support",
        title: "SUPPORT · " + support.title,
        detail: support.describe(state.player),
        apply: function () { support.apply(state.player, state.supports); },
      },
    ];

    for (const option of options) {
      const button = document.createElement("button");
      const icon = document.createElement("span");
      const copy = document.createElement("span");
      const title = document.createElement("strong");
      const detail = document.createElement("span");
      const badge = document.createElement("span");
      button.className = "upgrade-choice";
      button.type = "button";
      button.dataset.axis = option.axis;
      if (option.spell) {
        const isNew = !persistent.profile.discovered.includes(spellKey(option.spell));
        button.dataset.discovery = isNew ? "new" : "known";
        button.dataset.result = spellKey(option.spell);
        icon.dataset.form = option.spell.form;
        icon.dataset.essence = option.spell.essence;
        icon.dataset.law = option.spell.law;
        badge.textContent = isNew ? "NEW" : "KNOWN";
        const currentValue = option.axis === "form" ? state.spell.form
          : option.axis === "essence" ? state.spell.essence : state.spell.law;
        const nextValue = option.spell[option.axis];
        const kept = ["form", "essence", "law"]
          .filter(function (axis) { return axis !== option.axis; })
          .map(function (axis) {
            const group = axis === "form" ? "forms" : axis === "essence" ? "essences" : "laws";
            return SPELL_PARTS[group][state.spell[axis]].title;
          })
          .join(" and ");
        const group = option.axis === "form" ? "forms" : option.axis === "essence" ? "essences" : "laws";
        button.setAttribute("aria-label", "Change " + option.axis + " from " + SPELL_PARTS[group][currentValue].title +
          " to " + SPELL_PARTS[group][nextValue].title + ". " + option.description + " " + kept +
          " stay. Result: " + spellName(option.spell) + ". " + badge.textContent + " spell.");
      } else {
        button.dataset.discovery = "support";
        icon.dataset.form = "support";
        badge.textContent = "KEEP SPELL";
        button.setAttribute("aria-label", option.title + ". " + option.detail +
          " Current spell stays " + spellName(state.spell) + ".");
      }
      icon.className = "choice-spell-icon";
      for (let markIndex = 0; markIndex < 3; markIndex += 1) {
        const mark = document.createElement("i");
        mark.className = "spell-shape";
        icon.append(mark);
      }
      copy.className = "choice-copy";
      title.className = "choice-name";
      detail.className = "choice-detail";
      badge.className = "choice-badge";
      title.textContent = option.title;
      detail.textContent = option.detail;
      copy.append(title, detail);
      button.append(icon, copy, badge);
      button.addEventListener("click", function () {
        unlockAudio();
        RunSystem.chooseRewrite(option.apply);
      }, { once: true });
      upgradeChoices.append(button);
    }
    upgradePanel.hidden = false;
    this.updateHud();
  },

  hideRewrite: function () {
    upgradePanel.hidden = true;
    upgradeChoices.replaceChildren();
  },

  openMenu: function (reason) {
    if (state.menuOpen) return;
    clearInput();
    state.menuOpen = true;
    menuPanel.hidden = false;
    if (state.mode === "playing") {
      menuEyebrow.textContent = reason === "interruption" ? "Auto-Paused" : "Trial Paused";
      menuTitle.textContent = reason === "interruption" ? "Your Checkpoint Is Safe" : "Take a Breath";
      menuStatus.textContent = reason === "interruption"
        ? "Action stopped when the game lost focus. This wave restarts from its boundary if the app closes."
        : "Enemies, projectiles, and the wave clock are frozen.";
      resumeButton.textContent = "Resume Trial";
      newRunButton.textContent = "Restart Trial";
    } else if (state.mode === "upgrade") {
      menuEyebrow.textContent = "Trial Options";
      menuTitle.textContent = "Rewrite Waiting";
      menuStatus.textContent = "This wave boundary is saved. Return to choose one change.";
      resumeButton.textContent = "Back to Rewrite";
      newRunButton.textContent = "Restart Trial";
    } else {
      menuEyebrow.textContent = "Options";
      menuTitle.textContent = "Game Settings";
      menuStatus.textContent = "Sound and haptic choices save automatically.";
      resumeButton.textContent = "Close";
      newRunButton.textContent = state.mode === "menu" ? "Start New Trial" : "Play Again";
    }
    if (reason === "back") {
      menuStatus.textContent = "The Trial is paused. Resume here, or press Back again to exit.";
    }
    this.syncSettings();
    this.updateHud();
  },

  closeMenu: function () {
    if (!state.menuOpen) return;
    state.menuOpen = false;
    menuPanel.hidden = true;
    clearInput();
    this.updateHud();
  },

  updateHud: function () {
    const player = state.player;
    menuButton.textContent = state.menuOpen ? "Resume" : state.mode === "playing" ? "Pause" : "Options";
    menuButton.setAttribute("aria-label", state.menuOpen ? "Resume game" : state.mode === "playing" ? "Pause game" : "Open options");
    healthText.textContent = player ? "HP " + Math.max(0, Math.ceil(player.hp)) + "/" + player.maxHp : "HP 5/5";
    spellText.textContent = spellReadout(state.spell);
    controlHint.textContent = state.spell.form === "orbit"
      ? "ORBIT hits nearby crowds and blocks shots · Drag close, then dodge"
      : "BOLT hunts the marked enemy · Drag to dodge";
    if (state.mode === "menu") {
      waveText.textContent = TOTAL_WAVES + " Waves";
      scoreText.textContent = "Best " + state.bestScore;
    } else if (state.mode === "win") {
      waveText.textContent = "Complete " + formatFrames(state.runElapsed);
      scoreText.textContent = "Score " + state.score;
    } else if (state.mode === "lose") {
      waveText.textContent = "Wave " + state.wave + "/" + TOTAL_WAVES;
      scoreText.textContent = "Score " + state.score;
    } else if (state.mode === "upgrade") {
      waveText.textContent = "Wave " + state.wave + " Clear";
      scoreText.textContent = "Score " + state.score;
    } else {
      const definition = currentWaveDefinition();
      const foes = state.enemies.filter(function (enemy) { return enemy.hp > 0; }).length;
      waveText.textContent = "A" + definition.act + " W" + state.wave + " · " + (foes > 0 ? foes + " foes" : "incoming");
      scoreText.textContent = "Score " + state.score;
    }
  },
});

function updatePlayer() {
  const player = state.player;
  let dx = 0;
  let dy = 0;
  if (pointerControl.active) {
    dx = pointerControl.x - player.x;
    dy = pointerControl.y - player.y;
  } else {
    if (keys.left) dx -= 1;
    if (keys.right) dx += 1;
    if (keys.up) dy -= 1;
    if (keys.down) dy += 1;
  }
  const distance = Math.hypot(dx, dy);
  if (distance > 3) {
    const step = pointerControl.active ? Math.min(distance, player.speed) : player.speed;
    const length = Math.max(1, Math.hypot(dx, dy));
    player.x += (dx / length) * step;
    player.y += (dy / length) * step;
  }
  player.x = clamp(player.x, 20, W - 20);
  player.y = clamp(player.y, 76, H - 34);
  if (player.cooldown > 0) player.cooldown -= 1;
  if (player.invincible > 0) player.invincible -= 1;
}

function updateSparks() {
  for (const spark of state.sparks) {
    spark.x += spark.vx;
    spark.y += spark.vy;
    spark.life -= 1;
  }
  state.sparks = state.sparks.filter(function (spark) { return spark.life > 0; });
}

function update() {
  if (state.menuOpen) return;
  state.time += 1;
  state.waveBannerTimer = Math.max(0, state.waveBannerTimer - 1);
  state.screenShake = Math.max(0, state.screenShake - 1);
  state.damageFlash = Math.max(0, state.damageFlash - 1);
  if (state.mode === "playing") {
    updatePlayer();
    EnemySystem.update();
    EnemySystem.updateProjectiles();
    SpellSystem.update();
    EnemySystem.collectDefeated();
    RunSystem.update();
  }
  updateSparks();
}

function draw() {
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "#080b12";
  ctx.fillRect(0, 0, W, H);
  ctx.save();
  if (state.screenShake > 0 && !state.menuOpen) {
    const strength = Math.min(4, state.screenShake * 0.35);
    ctx.translate((Math.random() - 0.5) * strength * 2, (Math.random() - 0.5) * strength * 2);
  }
  drawBackground();
  if (state.mode === "menu") {
    drawMage(W / 2, 390, false);
  } else {
    drawEnemyProjectiles();
    drawProjectiles();
    drawEnemies();
    drawTargetFeedback();
    drawPlayer();
    drawPointerTarget();
    drawSparks();
    drawEndBanner();
    drawWaveAnnouncement();
  }
  ctx.restore();
  if (state.damageFlash > 0) {
    ctx.fillStyle = "rgba(255, 62, 62, " + (0.04 + state.damageFlash * 0.018) + ")";
    ctx.fillRect(0, 0, W, H);
  }
  UISystem.updateHud();
}

function drawBackground() {
  ctx.fillStyle = "#121827";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#18223a";
  for (let y = 40; y < H; y += 24) {
    for (let x = 0; x < W; x += 24) {
      if ((x + y / 2) % 48 === 0) ctx.fillRect(x, y, 12, 12);
    }
  }
  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.strokeStyle = "#52618d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(W / 2, H / 2 + 20, 58, 0, Math.PI * 2);
  ctx.arc(W / 2, H / 2 + 20, 38, 0, Math.PI * 2);
  ctx.moveTo(W / 2 - 58, H / 2 + 20);
  ctx.lineTo(W / 2 + 58, H / 2 + 20);
  ctx.moveTo(W / 2, H / 2 - 38);
  ctx.lineTo(W / 2, H / 2 + 78);
  ctx.stroke();
  ctx.restore();
  for (let index = 0; index < 7; index += 1) {
    const fireflyX = 24 + ((index * 47 + state.time * 0.14) % (W - 48));
    const fireflyY = 74 + ((index * 61 + Math.sin((state.time + index * 20) / 24) * 18) % (H - 138));
    ctx.fillStyle = index % 2 === 0 ? "rgba(155, 246, 255, 0.5)" : "rgba(255, 209, 102, 0.42)";
    ctx.fillRect(Math.round(fireflyX), Math.round(fireflyY), 2, 2);
  }
  ctx.fillStyle = "#24314e";
  ctx.fillRect(0, 0, W, 50);
  ctx.fillStyle = "#2e6b4f";
  for (let index = 0; index < 8; index += 1) {
    const x = index * 44 - 10;
    ctx.fillRect(x + 12, 24, 12, 26);
    ctx.fillRect(x + 4, 12, 28, 18);
    ctx.fillRect(x + 10, 4, 16, 12);
  }
  ctx.fillStyle = "#0c101b";
  ctx.fillRect(0, H - 26, W, 26);
}

function drawPlayer() {
  if (!state.player) return;
  const flicker = state.player.invincible > 0 && Math.floor(state.time / 5) % 2 === 0;
  const moving = pointerControl.active || keys.left || keys.right || keys.up || keys.down;
  if (!flicker) drawMage(state.player.x, state.player.y, moving);
}

function drawPointerTarget() {
  if (!pointerControl.active || state.mode !== "playing") return;
  ctx.save();
  ctx.globalAlpha = 0.65;
  ctx.strokeStyle = "#9bf6ff";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(pointerControl.x, pointerControl.y, 10, 0, Math.PI * 2);
  ctx.moveTo(pointerControl.x - 14, pointerControl.y);
  ctx.lineTo(pointerControl.x + 14, pointerControl.y);
  ctx.moveTo(pointerControl.x, pointerControl.y - 14);
  ctx.lineTo(pointerControl.x, pointerControl.y + 14);
  ctx.stroke();
  ctx.restore();
}

function drawTargetFeedback() {
  if (state.spell.form === "orbit" && state.mode === "playing" && state.player) {
    ctx.save();
    ctx.globalAlpha = 0.42;
    ctx.strokeStyle = SPELL_PARTS.essences[state.spell.essence].light;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.arc(state.player.x, state.player.y, 58, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    return;
  }
  const target = SpellSystem.targetById(state.targetId);
  if (!target || state.mode !== "playing") return;
  const radius = Math.max(target.w, target.h) * 0.68 + 7 + Math.sin(state.time / 5) * 1.5;
  ctx.save();
  ctx.globalAlpha = 0.72;
  ctx.strokeStyle = SPELL_PARTS.essences[state.spell.essence].light;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(target.x, target.y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 0.16;
  ctx.beginPath();
  ctx.moveTo(state.player.x, state.player.y - 12);
  ctx.lineTo(target.x, target.y);
  ctx.stroke();
  ctx.restore();
}

function drawMage(x, y, moving) {
  const bob = moving ? Math.sin(state.time / 5) * 2 : 0;
  const px = Math.round(x);
  const py = Math.round(y + bob);
  ctx.fillStyle = "#0a0d15";
  ctx.fillRect(px - 10, py + 10, 20, 5);
  ctx.fillStyle = "#24203b";
  ctx.fillRect(px - 8, py - 5, 16, 20);
  ctx.fillStyle = "#5b3d9a";
  ctx.fillRect(px - 6, py - 3, 12, 17);
  ctx.fillStyle = "#7d5bd6";
  ctx.fillRect(px - 4, py - 1, 8, 13);
  ctx.fillStyle = "#ffd166";
  ctx.fillRect(px - 1, py + 2, 2, 10);
  ctx.fillStyle = "#3a283e";
  ctx.fillRect(px - 6, py - 15, 12, 11);
  ctx.fillStyle = "#f4c38b";
  ctx.fillRect(px - 4, py - 14, 8, 9);
  ctx.fillStyle = "#30243c";
  ctx.fillRect(px - 1, py - 11, 2, 2);
  ctx.fillStyle = "#22283d";
  ctx.fillRect(px - 9, py - 19, 18, 5);
  ctx.fillRect(px - 4, py - 27, 8, 10);
  ctx.fillStyle = "#5c4ba0";
  ctx.fillRect(px - 2, py - 25, 4, 7);
  ctx.fillStyle = "#253044";
  ctx.fillRect(px + 8, py - 9, 4, 20);
  ctx.fillStyle = SPELL_PARTS.essences[state.spell.essence].color;
  ctx.fillRect(px + 7, py - 13, 6, 6);
  ctx.fillStyle = SPELL_PARTS.essences[state.spell.essence].light;
  ctx.fillRect(px + 9, py - 12, 2, 2);
}

function drawEnemies() {
  for (const enemy of state.enemies) {
    if (enemy.boss) drawBoss(enemy);
    else if (enemy.family === "caster") drawCaster(enemy);
    else drawMote(enemy);
    if (enemy.elite) drawEliteMarks(enemy);
    const showBar = enemy.boss || enemy.elite || enemy.hp < enemy.maxHp || enemy.family === "caster";
    if (showBar) {
      const width = enemy.boss ? 54 : enemy.elite ? 42 : 27;
      drawHealthBar(enemy.x - width / 2, enemy.y - enemy.h / 2 - 10, width, enemy.hp / enemy.maxHp);
    }
  }
}

function drawMote(enemy) {
  const x = Math.round(enemy.x);
  const y = Math.round(enemy.y);
  const pulse = Math.sin(state.time / 8 + enemy.id) * 1.5;
  const scaleX = enemy.w / 18;
  const scaleY = enemy.h / 16;
  ctx.save();
  ctx.translate(x, y + pulse);
  ctx.scale(scaleX, scaleY);
  ctx.fillStyle = "#0a0d15";
  ctx.fillRect(-10, 8, 20, 5);
  ctx.fillStyle = enemy.hitFlash > 0 ? "#f4f0ff" : enemy.bodyColor;
  ctx.fillRect(-9, -5, 18, 14);
  ctx.fillStyle = enemy.lightColor;
  ctx.fillRect(-4, -10, 8, 6);
  ctx.fillStyle = "#101420";
  ctx.fillRect(-5, 0, 3, 3);
  ctx.fillRect(3, 0, 3, 3);
  ctx.restore();
}

function drawCaster(enemy) {
  const x = Math.round(enemy.x);
  const y = Math.round(enemy.y + Math.sin((state.time + enemy.id) / 9));
  if (enemy.attackState === "aim") {
    ctx.save();
    ctx.strokeStyle = "#87d7ff";
    ctx.globalAlpha = 0.7;
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(enemy.targetX, enemy.targetY);
    ctx.stroke();
    ctx.restore();
  }
  ctx.fillStyle = "#0a0d15";
  ctx.fillRect(x - 11, y + 9, 22, 5);
  ctx.fillStyle = enemy.hitFlash > 0 ? "#f4f0ff" : enemy.bodyColor;
  ctx.fillRect(x - 9, y - 10, 18, 20);
  ctx.fillStyle = enemy.lightColor;
  ctx.fillRect(x - 5, y - 15, 10, 6);
  ctx.fillRect(x + 9, y - 7, 3, 19);
  ctx.fillStyle = "#101420";
  ctx.fillRect(x - 5, y - 4, 3, 3);
  ctx.fillRect(x + 3, y - 4, 3, 3);
  ctx.fillStyle = "#d9fbff";
  ctx.fillRect(x + 8, y - 11, 5, 5);
}

function drawEliteMarks(enemy) {
  const pulse = 20 + Math.sin(state.time / 5) * 2;
  ctx.save();
  ctx.strokeStyle = "#d8b5ff";
  ctx.globalAlpha = enemy.attackState === "telegraph" ? 0.95 : 0.5;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(enemy.x, enemy.y, pulse, 0, Math.PI * 2);
  ctx.stroke();
  if (enemy.attackState === "telegraph") {
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(enemy.x, enemy.y);
    ctx.lineTo(enemy.targetX, enemy.targetY);
    ctx.stroke();
  }
  ctx.restore();
  ctx.fillStyle = "#ffd166";
  ctx.fillRect(Math.round(enemy.x) - 8, Math.round(enemy.y) - 23, 4, 5);
  ctx.fillRect(Math.round(enemy.x) - 2, Math.round(enemy.y) - 26, 4, 8);
  ctx.fillRect(Math.round(enemy.x) + 4, Math.round(enemy.y) - 23, 4, 5);
}

function drawBoss(enemy) {
  const x = Math.round(enemy.x);
  const y = Math.round(enemy.y);
  const pulse = Math.sin(state.time / 10) * 2;
  if (enemy.attackState === "volleyTell" || enemy.attackState === "dashTell") {
    ctx.save();
    ctx.strokeStyle = "#ffd166";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 28 + Math.sin(state.time / 3) * 4, 0, Math.PI * 2);
    ctx.stroke();
    if (enemy.attackState === "dashTell") {
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(enemy.targetX, enemy.targetY);
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.fillStyle = "#0a0d15";
  ctx.fillRect(x - 22, y + 19, 44, 7);
  ctx.fillStyle = enemy.hitFlash > 0 ? "#fff0d9" : enemy.attackState === "dash" ? "#d95d39" : enemy.bodyColor;
  ctx.fillRect(x - 20, y - 12 + pulse, 40, 33);
  ctx.fillStyle = enemy.lightColor;
  ctx.fillRect(x - 12, y - 22 + pulse, 24, 12);
  ctx.fillStyle = "#ffd166";
  ctx.fillRect(x - 19, y - 27 + pulse, 8, 8);
  ctx.fillRect(x + 11, y - 27 + pulse, 8, 8);
  ctx.fillStyle = "#101420";
  ctx.fillRect(x - 9, y + pulse, 5, 5);
  ctx.fillRect(x + 5, y + pulse, 5, 5);
}

function drawProjectiles() {
  for (const projectile of state.projectiles) {
    const essence = SPELL_PARTS.essences[projectile.essence];
    const x = Math.round(projectile.x);
    const y = Math.round(projectile.y);
    if (projectile.kind === "orbit") {
      ctx.fillStyle = essence.color;
      ctx.fillRect(x - 6, y - 6, 12, 12);
      ctx.fillStyle = essence.light;
      ctx.fillRect(x - 3, y - 3, 6, 6);
    } else {
      ctx.fillStyle = essence.color;
      ctx.fillRect(x - 4, y - 4, 8, 8);
      ctx.fillStyle = essence.light;
      ctx.fillRect(x - 2, y - 2, 4, 4);
    }
  }
}

function drawEnemyProjectiles() {
  for (const shot of state.enemyProjectiles) {
    const x = Math.round(shot.x);
    const y = Math.round(shot.y);
    ctx.fillStyle = "rgba(10, 13, 21, 0.7)";
    ctx.fillRect(x - 6, y - 6, 12, 12);
    ctx.fillStyle = shot.color;
    ctx.fillRect(x - 4, y - 4, 8, 8);
    ctx.fillStyle = "#fff0be";
    ctx.fillRect(x - 1, y - 1, 2, 2);
  }
}

function drawSparks() {
  for (const spark of state.sparks) {
    ctx.fillStyle = spark.color;
    ctx.fillRect(Math.round(spark.x), Math.round(spark.y), 3, 3);
  }
}

function drawEndBanner() {
  if (state.mode === "win") {
    drawPanel(28, 154, 264, 156);
    drawText("TRIAL COMPLETE", W / 2, 194, 20, "#ffd166", "center");
    drawText("Time " + formatFrames(state.runElapsed) + " · Score " + state.score, W / 2, 229, 11, "#f3ead7", "center");
    drawText("Spellbook " + persistent.profile.discovered.length + "/8 proven", W / 2, 255, 11, "#9bf6ff", "center");
    drawText("Tap to try a different build", W / 2, 285, 10, "#d9b8ff", "center");
  }
  if (state.mode === "lose") {
    drawPanel(28, 164, 264, 140);
    drawText("THE SPELL UNRAVELS", W / 2, 202, 17, "#ff6b6b", "center");
    drawText("Reached Wave " + state.wave + " of " + TOTAL_WAVES, W / 2, 237, 12, "#f3ead7", "center");
    drawText("Tap to try another rewrite", W / 2, 273, 10, "#9bf6ff", "center");
  }
}

function drawWaveAnnouncement() {
  if (state.waveBannerTimer <= 0 || state.mode !== "playing") return;
  const elapsed = WAVE_BANNER_DURATION - state.waveBannerTimer;
  const alpha = Math.min(1, elapsed / 10, state.waveBannerTimer / 18);
  const definition = currentWaveDefinition();
  ctx.save();
  ctx.globalAlpha = alpha;
  drawPanel(44, 54, 232, 78);
  drawText(state.waveBannerText, W / 2, 74, 11, definition.boss ? "#ff9d66" : "#ffd166", "center");
  drawText(definition.title.toUpperCase(), W / 2, 94, 13, "#f3ead7", "center");
  drawText(definition.cue, W / 2, 114, 8, "#aab1c7", "center");
  ctx.restore();
}

function drawPanel(x, y, width, height) {
  ctx.fillStyle = "#0c101b";
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = "#27314a";
  ctx.fillRect(x + 4, y + 4, width - 8, height - 8);
  ctx.fillStyle = "#1b2233";
  ctx.fillRect(x + 8, y + 8, width - 16, height - 16);
  ctx.fillStyle = "#53618a";
  ctx.fillRect(x + 8, y + 8, width - 16, 2);
  ctx.fillStyle = "#ffd166";
  ctx.fillRect(x + 4, y + 4, 6, 6);
  ctx.fillRect(x + width - 10, y + 4, 6, 6);
}

function drawText(text, x, y, size, color, align) {
  ctx.fillStyle = color;
  ctx.font = "bold " + size + "px monospace";
  ctx.textAlign = align || "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function drawHealthBar(x, y, width, percent) {
  ctx.fillStyle = "#0a0d15";
  ctx.fillRect(Math.round(x), Math.round(y), width, 5);
  ctx.fillStyle = "#ff6b6b";
  ctx.fillRect(Math.round(x + 1), Math.round(y + 1), Math.max(0, Math.round((width - 2) * percent)), 3);
}

function pauseForInterruption() {
  if (state.mode === "playing" && !state.menuOpen) UISystem.openMenu("interruption");
  else clearInput();
}

function handleNativeBackButton() {
  clearInput();
  if (state.menuOpen) return false;
  if (state.mode === "playing" || state.mode === "upgrade") {
    UISystem.openMenu("back");
    return true;
  }
  return false;
}

function handleStartAction() {
  if (state.mode === "menu") {
    playSound("wave");
    triggerHaptic(18);
    if (persistent.checkpoint) RunSystem.resume();
    else RunSystem.startNew();
  } else if (state.mode === "win" || state.mode === "lose") {
    playSound("wave");
    triggerHaptic(18);
    RunSystem.startNew();
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
};

window.addEventListener("keydown", function (event) {
  const key = keyboardMap[event.code];
  unlockAudio();
  if (event.code === "Escape" || event.code === "KeyP") {
    event.preventDefault();
    playSound("click");
    if (state.menuOpen) UISystem.closeMenu();
    else UISystem.openMenu("manual");
    return;
  }
  if (key) {
    event.preventDefault();
    keys[key] = true;
  }
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();
    if (!state.menuOpen) handleStartAction();
  }
});

window.addEventListener("keyup", function (event) {
  const key = keyboardMap[event.code];
  if (key) keys[key] = false;
});

function updatePointerTarget(event) {
  const bounds = canvas.getBoundingClientRect();
  pointerControl.x = clamp(((event.clientX - bounds.left) / bounds.width) * W, 20, W - 20);
  pointerControl.y = clamp(((event.clientY - bounds.top) / bounds.height) * H, 76, H - 34);
}

function startPointerControl(event) {
  event.preventDefault();
  unlockAudio();
  if (state.menuOpen) return;
  if (state.mode === "win" || state.mode === "lose") handleStartAction();
  if (state.mode !== "playing") return;
  pointerControl.active = true;
  pointerControl.pointerId = event.pointerId;
  updatePointerTarget(event);
  if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
}

function movePointerControl(event) {
  if (!pointerControl.active || event.pointerId !== pointerControl.pointerId) return;
  event.preventDefault();
  updatePointerTarget(event);
}

function stopPointerControl(event) {
  if (event.pointerId !== pointerControl.pointerId) return;
  if (canvas.hasPointerCapture && canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  pointerControl.active = false;
  pointerControl.pointerId = null;
}

canvas.addEventListener("pointerdown", startPointerControl);
canvas.addEventListener("pointermove", movePointerControl);
canvas.addEventListener("pointerup", stopPointerControl);
canvas.addEventListener("pointercancel", stopPointerControl);

startRunButton.addEventListener("click", function () {
  unlockAudio();
  playSound("wave");
  triggerHaptic(18);
  RunSystem.startNew();
});

resumeRunButton.addEventListener("click", function () {
  unlockAudio();
  playSound("wave");
  triggerHaptic(18);
  RunSystem.resume();
});

menuButton.addEventListener("click", function () {
  unlockAudio();
  playSound("click");
  if (state.menuOpen) UISystem.closeMenu();
  else UISystem.openMenu("manual");
});

resumeButton.addEventListener("click", function () {
  unlockAudio();
  playSound("click");
  UISystem.closeMenu();
});

soundButton.addEventListener("click", function () {
  if (settings.sound) playSound("click");
  settings.sound = !settings.sound;
  SaveSystem.write();
  UISystem.syncSettings();
  if (settings.sound) {
    unlockAudio();
    playSound("click");
  }
});

hapticsButton.addEventListener("click", function () {
  settings.haptics = !settings.haptics;
  SaveSystem.write();
  UISystem.syncSettings();
  if (settings.haptics) triggerHaptic(24);
  playSound("click");
});

newRunButton.addEventListener("click", function () {
  unlockAudio();
  playSound("wave");
  triggerHaptic(24);
  UISystem.closeMenu();
  RunSystem.startNew();
});

window.addEventListener("blur", pauseForInterruption);
document.addEventListener("visibilitychange", function () {
  if (document.hidden) pauseForInterruption();
});

window.PixelMageNative = Object.freeze({
  handleBackButton: handleNativeBackButton,
  pauseForInterruption,
});

UISystem.syncSettings();
UISystem.syncStartPanel();
UISystem.updateHud();

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
