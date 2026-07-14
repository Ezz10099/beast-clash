import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

import { RELEASE_FILES } from './release-config.mjs';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const css = await readFile(new URL('phone-polish.css', root), 'utf8');
const js = await readFile(new URL('phone-polish.js', root), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));

for (const file of ['phone-polish.css', 'phone-polish.js']) {
  assert.ok(RELEASE_FILES.includes(file), `${file} must ship in the production bundle`);
}
assert.match(html, /href="phone-polish\.css"/);
assert.match(html, /src="game\.js"[\s\S]*src="phone-polish\.js"/, 'phone polish must initialize after game.js');
assert.equal((html.match(/class="opening-guide/g) || []).length, 1, 'opening instructions must not be duplicated');
assert.match(html, /Drag anywhere to steer above your thumb\. Avoid red runes; spells cast automatically\./);
assert.match(html, /id="healthMeter"/);
assert.match(html, /id="waveMeter"/);
assert.match(html, /class="orientation-notice"/);

for (const contract of [
  /overflow-y:\s*auto/,
  /white-space:\s*normal/,
  /button:focus-visible/,
  /data-health-state="critical"/,
  /@media \(orientation:\s*landscape\)/,
]) {
  assert.match(css, contract, `phone polish CSS is missing ${contract}`);
}
for (const forbidden of [/\bfetch\s*\(/, /XMLHttpRequest/, /WebSocket/, /sendBeacon/, /EventSource/, /localStorage/, /SaveSystem/, /persistent\./, /state\./]) {
  assert.doesNotMatch(js, forbidden, 'phone polish must remain offline and must not access saves or gameplay state directly');
}

function makeClassList() {
  const values = new Set();
  return {
    add(value) { values.add(value); },
    remove(value) { values.delete(value); },
    contains(value) { return values.has(value); },
  };
}

function makeElement(id = '') {
  const handlers = [];
  return {
    id,
    textContent: '',
    children: [],
    dataset: {},
    attributes: {},
    classList: makeClassList(),
    style: { setProperty() {} },
    append(...items) { this.children.push(...items); },
    replaceChildren(...items) { this.children = [...items]; },
    setAttribute(name, value) { this.attributes[name] = String(value); },
    addEventListener(type, handler, options) { handlers.push({ type, handler, options }); },
    handlers,
  };
}

const gameCard = makeElement('gameCard');
const healthText = makeElement('healthText');
const waveText = makeElement('waveText');
const healthMeter = makeElement('healthMeter');
const waveMeter = makeElement('waveMeter');
const newRunButton = makeElement('newRunButton');
const menuStatus = makeElement('menuStatus');
const canvas = makeElement('game');
healthText.textContent = 'HP 2/5';
waveText.textContent = 'A1 W3 · 4 foes';
newRunButton.textContent = 'Restart Trial';
menuStatus.textContent = 'Trial paused';

const elements = new Map([
  ['.game-card', gameCard],
  ['#healthText', healthText],
  ['#waveText', waveText],
  ['#healthMeter', healthMeter],
  ['#waveMeter', waveMeter],
  ['#newRunButton', newRunButton],
  ['#menuStatus', menuStatus],
  ['#game', canvas],
]);

class FakeMutationObserver {
  constructor(callback) { this.callback = callback; }
  observe() {}
}

const body = makeElement('body');
const sandbox = {
  console,
  Object,
  Array,
  Number,
  String,
  Date: { now: () => 1000 },
  MutationObserver: FakeMutationObserver,
  setTimeout: () => 1,
  clearTimeout() {},
  document: {
    body,
    documentElement: { lang: 'en' },
    querySelector: (selector) => elements.get(selector) || null,
    createElement: () => makeElement(),
  },
  window: {},
};
vm.createContext(sandbox);
vm.runInContext(js, sandbox, { filename: 'phone-polish.js' });

assert.equal(healthMeter.children.length, 5);
assert.equal(healthMeter.children.filter((segment) => segment.dataset.filled === 'true').length, 2);
assert.equal(gameCard.dataset.healthState, 'low');
assert.equal(waveMeter.children.length, 12);
assert.equal(waveMeter.children.filter((segment) => segment.dataset.filled === 'true').length, 3);
assert.equal(waveMeter.children[2].dataset.current, 'true');

const restartHandler = newRunButton.handlers.find((entry) => entry.type === 'click');
assert.ok(restartHandler, 'restart confirmation handler must be registered');
let prevented = false;
let stopped = false;
restartHandler.handler({
  preventDefault() { prevented = true; },
  stopImmediatePropagation() { stopped = true; },
});
assert.equal(prevented, true, 'first restart tap must be blocked');
assert.equal(stopped, true, 'first restart tap must not reach the destructive game handler');
assert.match(newRunButton.textContent, /Tap again to restart/);
assert.equal(newRunButton.classList.contains('new-run-confirming'), true);

assert.equal(packageJson.scripts['polish:check'], 'node --check phone-polish.js && node scripts/check-phone-polish.mjs');
assert.match(packageJson.scripts.check, /npm run polish:check/, 'normal checks must include phone polish verification');

process.stdout.write('Phone readability and interaction-safety checks passed.\n');
