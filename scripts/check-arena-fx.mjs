import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

import { RELEASE_FILES } from './release-config.mjs';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const css = await readFile(new URL('arena-fx.css', root), 'utf8');
const js = await readFile(new URL('arena-fx.js', root), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));

for (const file of ['arena-fx.css', 'arena-fx.js']) {
  assert.ok(RELEASE_FILES.includes(file), `${file} must ship in the production bundle`);
}

assert.match(html, /href="arena-fx\.css"/);
assert.match(html, /id="arenaFx"[^>]*width="320"[^>]*height="480"[^>]*aria-hidden="true"/);
assert.ok(
  html.indexOf('id="game"') < html.indexOf('id="arenaFx"'),
  'the read-only FX canvas must sit above the game canvas in DOM order',
);
assert.ok(
  html.indexOf('src="phone-polish.js"') < html.indexOf('src="arena-fx.js"'),
  'arena FX must initialize after the public screen-state layer',
);

assert.match(css, /#arenaFx\s*\{[\s\S]*pointer-events:\s*none/);
assert.match(css, /game-card\[data-screen="playing"\]\s+#arenaFx/);
assert.match(css, /prefers-reduced-motion:\s*reduce/);

for (const contract of [
  /ACT_COLORS/,
  /ESSENCE_COLORS/,
  /drawAmbient/,
  /drawTrail/,
  /drawWavePulse/,
  /drawDamageFeedback/,
  /lastStatusSync/,
  /requestAnimationFrame/,
]) {
  assert.match(js, contract, `arena FX is missing ${contract}`);
}
assert.doesNotMatch(js, /MutationObserver/, 'arena FX must not add per-frame HUD mutation work');

for (const forbidden of [
  /\bfetch\s*\(/,
  /XMLHttpRequest/,
  /WebSocket/,
  /sendBeacon/,
  /EventSource/,
  /localStorage/,
  /SaveSystem/,
  /persistent\./,
  /state\./,
]) {
  assert.doesNotMatch(js, forbidden, 'arena FX must remain offline and read-only');
}

const sandbox = {
  console,
  Object,
  Number,
  String,
  Math,
  window: {},
  document: { querySelector: () => null },
};
vm.createContext(sandbox);
vm.runInContext(js, sandbox, { filename: 'arena-fx.js' });

const api = sandbox.window.PixelMageArenaFx;
assert.ok(api, 'arena FX parser API must be exposed for deterministic checks');
assert.deepEqual({ ...api.parseHealth('HP 2/5') }, { current: 2, maximum: 5 });
assert.deepEqual({ ...api.parseHealth('الصحة 1/5') }, { current: 1, maximum: 5 });
assert.equal(api.parseWave('A2 W7 · 4 foes'), 7);
assert.equal(api.parseWave('الفصل 3 · الموجة 11 · 2 أعداء'), 11);
assert.equal(api.parseEssence('FORM Orbit · ESSENCE Frost · LAW Echo'), 'frost');
assert.equal(api.parseEssence('الشكل مدار · الجوهر جمرة · القانون صدى'), 'ember');
assert.equal(api.actForWave(1), 1);
assert.equal(api.actForWave(5), 2);
assert.equal(api.actForWave(9), 3);

assert.equal(packageJson.scripts['fx:check'], 'node --check arena-fx.js && node scripts/check-arena-fx.mjs');
assert.match(packageJson.scripts.check, /npm run fx:check/, 'normal checks must include arena feedback verification');

process.stdout.write('Arena feedback and atmosphere checks passed.\n');
