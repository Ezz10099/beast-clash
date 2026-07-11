import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const [html, gameCode] = await Promise.all([
  readFile(new URL('index.html', root), 'utf8'),
  readFile(new URL('game.js', root), 'utf8'),
]);

for (const id of ['game', 'healthText', 'waveText', 'scoreText', 'restartButton', 'upgradePanel', 'upgradeChoices']) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `index.html is missing #${id}`);
}

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
    classList: { toggle() {} },
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = [...children]; },
    addEventListener(type, handler) { this.handlers[type] = handler; },
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

const elements = new Map([
  ['#game', canvas],
  ['#healthText', makeElement('healthText')],
  ['#waveText', makeElement('waveText')],
  ['#scoreText', makeElement('scoreText')],
  ['#restartButton', makeElement('restartButton')],
  ['#upgradePanel', makeElement('upgradePanel')],
  ['#upgradeChoices', makeElement('upgradeChoices')],
  ['.controls', makeElement('controls')],
]);

const storage = new Map();
const sandbox = {
  console,
  document: {
    querySelector: (selector) => elements.get(selector) || null,
    querySelectorAll: () => [],
    createElement: () => makeElement(),
  },
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
  },
  requestAnimationFrame: () => 0,
  window: { addEventListener() {} },
};

vm.createContext(sandbox);
vm.runInContext(gameCode, sandbox, { filename: 'game.js' });
const evaluate = (source) => vm.runInContext(source, sandbox);

assert.equal(evaluate('state.mode'), 'menu');
evaluate('resetGame()');
assert.equal(evaluate('state.mode'), 'playing');
assert.equal(evaluate('state.wave'), 1);
assert.equal(evaluate('state.enemies.length'), 3);

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

process.stdout.write('Pixel Mage checks passed.\n');
