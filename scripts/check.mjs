import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const [html, gameCode] = await Promise.all([
  readFile(new URL('index.html', root), 'utf8'),
  readFile(new URL('game.js', root), 'utf8'),
]);

for (const id of [
  'game',
  'healthText',
  'waveText',
  'scoreText',
  'menuButton',
  'upgradePanel',
  'upgradeChoices',
  'menuPanel',
  'menuEyebrow',
  'menuTitle',
  'menuStatus',
  'resumeButton',
  'soundButton',
  'hapticsButton',
  'newRunButton',
]) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `index.html is missing #${id}`);
}
assert.match(html, /Drag in the arena to move/);
assert.doesNotMatch(html, /data-key=/, 'legacy touch buttons should not return');

function makeElement(id = '') {
  return {
    id,
    width: 0,
    height: 0,
    hidden: false,
    disabled: false,
    className: '',
    textContent: '',
    children: [],
    handlers: {},
    attributes: {},
    classList: { toggle() {} },
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = [...children]; },
    addEventListener(type, handler) { this.handlers[type] = handler; },
    setAttribute(name, value) { this.attributes[name] = String(value); },
    querySelectorAll() { return []; },
  };
}

const drawingContext = new Proxy({}, {
  get(target, property) {
    if (!(property in target)) target[property] = () => {};
    return target[property];
  },
  set(target, property, value) {
    target[property] = value;
    return true;
  },
});

const canvas = makeElement('game');
canvas.width = 320;
canvas.height = 480;
canvas.getContext = () => drawingContext;
canvas.getBoundingClientRect = () => ({ left: 0, top: 0, width: 320, height: 480 });
canvas.setPointerCapture = () => {};
canvas.hasPointerCapture = () => false;
canvas.releasePointerCapture = () => {};

const menuPanel = makeElement('menuPanel');
menuPanel.hidden = true;
const elements = new Map([
  ['#game', canvas],
  ['#healthText', makeElement('healthText')],
  ['#waveText', makeElement('waveText')],
  ['#scoreText', makeElement('scoreText')],
  ['#menuButton', makeElement('menuButton')],
  ['#upgradePanel', makeElement('upgradePanel')],
  ['#upgradeChoices', makeElement('upgradeChoices')],
  ['#menuPanel', menuPanel],
  ['#menuEyebrow', makeElement('menuEyebrow')],
  ['#menuTitle', makeElement('menuTitle')],
  ['#menuStatus', makeElement('menuStatus')],
  ['#resumeButton', makeElement('resumeButton')],
  ['#soundButton', makeElement('soundButton')],
  ['#hapticsButton', makeElement('hapticsButton')],
  ['#newRunButton', makeElement('newRunButton')],
]);

const storage = new Map();
const windowHandlers = new Map();
const documentHandlers = new Map();
const vibrations = [];

class FakeAudioParam {
  setValueAtTime() {}
  exponentialRampToValueAtTime() {}
}

class FakeAudioNode {
  constructor() {
    this.frequency = new FakeAudioParam();
    this.gain = new FakeAudioParam();
  }

  connect() {}
  start() {}
  stop() {}
}

class FakeAudioContext {
  constructor() {
    this.state = 'running';
    this.currentTime = 1;
    this.destination = {};
  }

  createOscillator() { return new FakeAudioNode(); }
  createGain() { return new FakeAudioNode(); }
  resume() { return Promise.resolve(); }
}

const sandbox = {
  console,
  document: {
    hidden: false,
    querySelector: (selector) => elements.get(selector) || null,
    querySelectorAll: () => [],
    createElement: () => makeElement(),
    addEventListener: (type, handler) => documentHandlers.set(type, handler),
  },
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
  },
  navigator: { vibrate: (pattern) => vibrations.push(pattern) },
  requestAnimationFrame: () => 0,
  window: {
    AudioContext: FakeAudioContext,
    addEventListener: (type, handler) => windowHandlers.set(type, handler),
  },
};

vm.createContext(sandbox);
vm.runInContext(gameCode, sandbox, { filename: 'game.js' });
const evaluate = (source) => vm.runInContext(source, sandbox);

assert.equal(evaluate('state.mode'), 'menu');
canvas.handlers.pointerdown({ clientX: 40, clientY: 240, pointerId: 1, preventDefault() {} });
assert.equal(evaluate('state.mode'), 'playing');
assert.equal(evaluate('state.wave'), 1);
assert.equal(evaluate('state.enemies.length'), 3);

const startingX = evaluate('state.player.x');
evaluate('update()');
assert.ok(evaluate('state.player.x') < startingX, 'dragging in the arena should move the mage');
assert.ok(evaluate('state.bolts.length') > 0, 'the mage should cast automatically');
assert.ok(evaluate('audioContext !== null'), 'the first gesture should unlock synthesized audio');
assert.ok(vibrations.length > 0, 'the first gesture should provide haptic feedback');
canvas.handlers.pointerup({ pointerId: 1 });
assert.equal(evaluate('pointerControl.active'), false);

const timeBeforePause = evaluate('state.time');
elements.get('#menuButton').handlers.click();
assert.equal(evaluate('state.menuOpen'), true);
assert.equal(menuPanel.hidden, false);
evaluate('update()');
assert.equal(evaluate('state.time'), timeBeforePause, 'pause should freeze all gameplay timers');

elements.get('#soundButton').handlers.click();
assert.equal(evaluate('settings.sound'), false);
assert.equal(JSON.parse(storage.get('pixel_mage_settings_v1')).sound, false);
elements.get('#soundButton').handlers.click();
assert.equal(evaluate('settings.sound'), true);
elements.get('#hapticsButton').handlers.click();
assert.equal(evaluate('settings.haptics'), false);
assert.equal(JSON.parse(storage.get('pixel_mage_settings_v1')).haptics, false);
elements.get('#hapticsButton').handlers.click();
assert.equal(evaluate('settings.haptics'), true);
elements.get('#resumeButton').handlers.click();
assert.equal(evaluate('state.menuOpen'), false);

windowHandlers.get('blur')();
assert.equal(evaluate('state.menuOpen'), true, 'losing focus during play should auto-pause');
assert.equal(elements.get('#menuEyebrow').textContent, 'Auto-Paused');
elements.get('#resumeButton').handlers.click();
assert.equal(evaluate('state.menuOpen'), false);

for (let wave = 1; wave < 5; wave += 1) {
  evaluate('state.enemies.forEach((enemy) => { enemy.hp = 0; }); update()');
  assert.equal(evaluate('state.mode'), 'upgrade', `wave ${wave} should open an upgrade choice`);
  const choices = elements.get('#upgradeChoices').children;
  assert.equal(choices.length, 3, `wave ${wave} should offer three upgrades`);
  assert.equal(typeof choices[0].handlers.click, 'function');
  choices[0].handlers.click();
  assert.equal(evaluate('state.wave'), wave + 1);
  assert.equal(evaluate('state.mode'), 'playing');
}

assert.equal(evaluate('state.enemies.length'), 3, 'final wave should contain two slimes and one boss');
assert.equal(evaluate('state.enemies.filter((enemy) => enemy.boss).length'), 1);
assert.equal(evaluate('state.enemies.find((enemy) => enemy.boss).attackState'), 'chase');
evaluate('state.enemies.find((enemy) => enemy.boss).attackTimer = 1; update()');
assert.equal(evaluate('state.enemies.find((enemy) => enemy.boss).attackState'), 'telegraph');
evaluate('for (let frame = 0; frame < 42; frame += 1) update()');
assert.equal(evaluate('state.enemies.find((enemy) => enemy.boss).attackState'), 'dash');
evaluate('state.enemies.forEach((enemy) => { enemy.hp = 0; }); update()');
assert.equal(evaluate('state.mode'), 'win');
assert.equal(evaluate('state.wave'), 5);
assert.equal(evaluate('state.score'), 7000);
assert.equal(evaluate('state.bestScore'), 7000);
assert.equal(storage.get('pixel_mage_best_score_v1'), '7000');

elements.get('#menuButton').handlers.click();
assert.equal(evaluate('state.menuOpen'), true);
elements.get('#newRunButton').handlers.click();
assert.equal(evaluate('state.mode'), 'playing');
assert.equal(evaluate('state.wave'), 1);
assert.equal(evaluate('state.score'), 0, 'restart should clear the current score');

for (let run = 2; run <= 10; run += 1) {
  if (run > 2) evaluate('resetGame()');

  for (let wave = 1; wave < 5; wave += 1) {
    evaluate('state.enemies.forEach((enemy) => { enemy.hp = 0; }); update(); draw()');
    assert.equal(evaluate('state.mode'), 'upgrade', `run ${run}, wave ${wave} should open upgrades`);
    const choices = elements.get('#upgradeChoices').children;
    assert.equal(choices.length, 3, `run ${run}, wave ${wave} should offer three upgrades`);
    choices[(run + wave) % choices.length].handlers.click();
    assert.equal(evaluate('state.mode'), 'playing', `run ${run}, wave ${wave} should continue`);
  }

  evaluate('state.enemies.forEach((enemy) => { enemy.hp = 0; }); update(); draw()');
  assert.equal(evaluate('state.mode'), 'win', `run ${run} should finish successfully`);
  assert.equal(evaluate('state.score'), 7000, `run ${run} should keep deterministic scoring`);
}

assert.equal(evaluate('state.bestScore'), 7000);
assert.equal(evaluate('loadBestScore()'), 7000);
assert.equal(evaluate('JSON.stringify(loadSettings())'), '{"sound":true,"haptics":true}');

evaluate('resetGame(); addSparks(20, 20, MAX_SPARKS + 100, "#ffffff")');
assert.ok(evaluate('state.sparks.length <= MAX_SPARKS'), 'particle count must remain capped');
evaluate('state.player.boltCount = 3; for (let cast = 0; cast < 100; cast += 1) { state.player.cooldown = 0; castSpell(); }');
assert.ok(evaluate('state.bolts.length <= MAX_BOLTS'), 'bolt count must remain capped');
evaluate('draw()');

process.stdout.write('Pixel Mage checks passed: 10 complete runs.\n');
