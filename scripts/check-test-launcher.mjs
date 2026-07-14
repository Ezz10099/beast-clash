import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

import { RELEASE_FILES } from './release-config.mjs';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('test-launcher.html', root), 'utf8');
const css = await readFile(new URL('test-launcher.css', root), 'utf8');
const js = await readFile(new URL('test-launcher.js', root), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));

for (const file of ['test-launcher.html', 'test-launcher.css', 'test-launcher.js']) {
  assert.ok(!RELEASE_FILES.includes(file), `${file} must remain outside the production release bundle`);
}

assert.match(html, /viewport-fit=cover/, 'launcher must support phone safe areas');
assert.match(html, /No Console, URL editing, or manual token entry is required/i);
assert.match(html, /id="arabicGameButton"/);
assert.match(html, /id="englishGameButton"/);
assert.match(html, /id="cellRunnerButton"/);
assert.doesNotMatch(html, /(?:src|href)=["']https?:\/\//i, 'launcher must not load remote resources');
assert.match(css, /safe-area-inset-top/);
assert.match(css, /safe-area-inset-bottom/);
assert.match(css, /min-height:\s*52px/, 'launcher buttons must remain touch sized');

for (const required of [
  'new URL("index.html", window.location.href)',
  'url.searchParams.set("fresh"',
  'url.searchParams.set("lang", "ar")',
  'new URL("cell-runner.html", window.location.href)',
  'window.location.assign(url)',
]) {
  assert.ok(js.includes(required), `launcher is missing required navigation behavior: ${required}`);
}

for (const forbidden of [/\bfetch\s*\(/, /XMLHttpRequest/, /WebSocket/, /sendBeacon/, /EventSource/]) {
  assert.doesNotMatch(js, forbidden, 'launcher must remain offline and telemetry-free');
}

function makeElement() {
  return {
    handlers: {},
    textContent: '',
    addEventListener(type, handler) { this.handlers[type] = handler; },
  };
}

const elements = new Map([
  ['arabicGameButton', makeElement()],
  ['englishGameButton', makeElement()],
  ['cellRunnerButton', makeElement()],
  ['launcherStatus', makeElement()],
]);
let assignedUrl = '';
const sandbox = {
  console,
  Date,
  Math,
  Object,
  Uint32Array,
  URL,
  document: { getElementById: (id) => elements.get(id) || null },
  window: {
    crypto: { getRandomValues(values) { values[0] = 123456789; return values; } },
    location: {
      href: 'http://127.0.0.1:4173/test-launcher.html',
      assign(url) { assignedUrl = String(url); },
    },
  },
};
vm.createContext(sandbox);
vm.runInContext(js, sandbox, { filename: 'test-launcher.js' });

const api = sandbox.window.PixelMageTestLauncher;
assert.equal(typeof api.buildGameUrl, 'function');
assert.equal(typeof api.buildRunnerUrl, 'function');

const arabic = new URL(api.buildGameUrl('ar'));
assert.equal(arabic.pathname, '/index.html');
assert.equal(arabic.searchParams.get('lang'), 'ar');
assert.match(arabic.searchParams.get('fresh'), /^owner-ar-[a-z0-9-]+$/);
assert.ok(arabic.searchParams.get('fresh').length <= 32);

const english = new URL(api.buildGameUrl('en'));
assert.equal(english.pathname, '/index.html');
assert.equal(english.searchParams.has('lang'), false);
assert.match(english.searchParams.get('fresh'), /^owner-en-[a-z0-9-]+$/);

assert.equal(new URL(api.buildRunnerUrl()).pathname, '/cell-runner.html');

elements.get('arabicGameButton').handlers.click();
assert.equal(new URL(assignedUrl).searchParams.get('lang'), 'ar');
assert.match(elements.get('launcherStatus').textContent, /Arabic owner check/);

elements.get('englishGameButton').handlers.click();
assert.equal(new URL(assignedUrl).searchParams.has('lang'), false);
assert.match(elements.get('launcherStatus').textContent, /English comparison/);

elements.get('cellRunnerButton').handlers.click();
assert.equal(new URL(assignedUrl).pathname, '/cell-runner.html');
assert.match(elements.get('launcherStatus').textContent, /Cell Runner/);

assert.equal(packageJson.scripts['launcher:check'], 'node --check test-launcher.js && node scripts/check-test-launcher.mjs');
assert.match(packageJson.scripts.check, /npm run launcher:check/, 'normal checks must include the tap-only launcher contract');

process.stdout.write('Tap-only SPCK test launcher checks passed.\n');
