import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

import { RELEASE_FILES } from './release-config.mjs';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const css = await readFile(new URL('localization.css', root), 'utf8');
const js = await readFile(new URL('touch-controls.js', root), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));

assert.ok(RELEASE_FILES.includes('touch-controls.js'), 'touch controls must ship in the production bundle');
assert.match(html, /touch-controls\.js[\s\S]*game\.js/, 'touch controls must load before game.js registers pointer handlers');
assert.match(html, /Drag anywhere to steer above your thumb\. Avoid red runes; spells cast automatically\./);
assert.match(html, /يتحرك الساحر فوق إصبعك/);
assert.match(css, /\.touch-guide-ar\s*\{[\s\S]*display:\s*none/);
assert.match(css, /html\[lang="ar"\] \.touch-guide-ar\s*\{[\s\S]*display:\s*inline/);

for (const forbidden of [/\bfetch\s*\(/, /XMLHttpRequest/, /WebSocket/, /sendBeacon/, /EventSource/]) {
  assert.doesNotMatch(js, forbidden, 'touch controls must remain local and telemetry-free');
}

const handlers = new Map();
const canvas = {
  height: 480,
  addEventListener(type, handler) { handlers.set(type, handler); },
  getBoundingClientRect() { return { left: 0, top: 0, width: 640, height: 960 }; },
};
const sandbox = {
  console,
  Object,
  Number,
  document: { querySelector: (selector) => selector === '#game' ? canvas : null },
  window: {},
};
vm.createContext(sandbox);
vm.runInContext(js, sandbox, { filename: 'touch-controls.js' });

const api = sandbox.window.PixelMageTouchControls;
assert.equal(api.thumbClearanceCanvasY, 84);
assert.equal(api.adjustedClientY({ clientY: 400 }), 232, '84 canvas pixels must scale to 168 CSS pixels at 2× display scale');

let touchY = null;
let mouseY = null;
let prevented = false;
canvas.addEventListener('pointerdown', (event) => {
  touchY = event.clientY;
  event.preventDefault();
});
handlers.get('pointerdown')({
  clientX: 200,
  clientY: 400,
  pointerId: 1,
  pointerType: 'touch',
  preventDefault() { prevented = true; },
});
assert.equal(touchY, 232, 'touch target must stay well above the fingertip');
assert.equal(prevented, true, 'wrapped touch events must preserve preventDefault');

canvas.addEventListener('pointermove', (event) => { mouseY = event.clientY; });
handlers.get('pointermove')({
  clientX: 200,
  clientY: 400,
  pointerId: 2,
  pointerType: 'mouse',
  preventDefault() {},
});
assert.equal(mouseY, 400, 'mouse input must remain exact');

assert.equal(packageJson.scripts['controls:check'], 'node --check touch-controls.js && node scripts/check-touch-controls.mjs');
assert.match(packageJson.scripts.check, /npm run controls:check/, 'normal checks must include touch-control verification');

process.stdout.write('Thumb-clearance touch-control checks passed.\n');
