import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../spell-depth.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../spell-depth.css', import.meta.url), 'utf8');
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const releaseConfig = await readFile(new URL('./release-config.mjs', import.meta.url), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

const sandbox = { console };
vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: 'spell-depth.js' });
const api = sandbox.PixelMageSpellDepth;
assert.ok(api, 'pure API must be available without a browser');

const wildfire = api.identityForSpell({ form: 'bolt', essence: 'ember', law: 'split' }, 'en');
assert.equal(wildfire.name, 'Wildfire Volley');
assert.match(wildfire.promise, /different threats/i);
const winterAr = api.identityForSpell({ form: 'orbit', essence: 'frost', law: 'echo' }, 'ar');
assert.equal(winterAr.name, 'حارس الشتاء');
assert.match(winterAr.promise, /الصدى/);

const enemies = [
  { id: 1, hp: 3, family: 'chaser' },
  { id: 2, hp: 3, family: 'caster' },
  { id: 3, hp: 10, family: 'chaser', elite: true },
];
assert.deepEqual(Array.from(api.splitTargetIds(enemies, 1, 3)), [1, 3, 2]);
assert.deepEqual(Array.from(api.splitTargetIds([{ id: 7, hp: 1 }], 7, 3)), [7, 7, 7]);
assert.equal(api.freezeDuration({ boss: true }), 18);
assert.equal(api.freezeDuration({ elite: true }), 28);
assert.equal(api.freezeDuration({}), 42);
assert.equal(api.resonanceEligible({ echoed: true, essence: 'ember' }, { burnUntil: 20 }, 10), true);
assert.equal(api.resonanceEligible({ echoed: true, essence: 'frost' }, { slowUntil: 9 }, 10), false);
assert.deepEqual(Object.fromEntries(Object.entries(api.meterState({ form: 'orbit' }, 2, 1))), { current: 1, maximum: 3, kind: 'ward' });
assert.deepEqual(Object.fromEntries(Object.entries(api.meterState({ form: 'bolt' }, 2, 1))), { current: 2, maximum: 3, kind: 'focus' });

for (const forbidden of ['localStorage', 'fetch(', 'XMLHttpRequest', 'WebSocket']) {
  assert.ok(!source.includes(forbidden), `spell-depth must remain offline and non-persistent: ${forbidden}`);
}
for (const required of [
  'PRECISION BURST',
  'WARD PULSE',
  'EMBER CHAIN',
  'SHATTER',
  'splitTargetIds',
  'spell-depth-preview',
  'resetTransientDepth',
  'detectRunBoundary',
]) {
  assert.ok(source.includes(required), `spell-depth source is missing ${required}`);
}
for (const required of ['وابل اللهب', 'مطاردة بلورية', 'حصن جليدي', 'تناغم الصدى']) {
  assert.ok(source.includes(required), `Arabic spell identity is missing ${required}`);
}

assert.match(css, /#spellFx[\s\S]*pointer-events:none/, 'spell FX must not intercept touch input');
assert.match(css, /html\[lang="ar"\]/, 'spell-depth UI must support Arabic layout');
assert.match(css, /@media \(max-height:600px\)/, 'spell-depth UI must support small portrait screens');
assert.match(css, /prefers-reduced-motion/, 'spell-depth UI must respect reduced motion');

assert.match(html, /id="spellFx"[^>]*width="320"[^>]*height="480"/, 'spell FX canvas must match the arena');
assert.match(html, /id="spellIdentityText"/, 'spell identity summary must be visible');
assert.match(html, /id="spellDepthMeter"/, 'spell payoff meter must be visible');
assert.match(html, /src="spell-depth\.js"/, 'spell-depth runtime must load');
assert.ok(html.indexOf('src="enemy-variety.js"') < html.indexOf('src="spell-depth.js"'), 'spell depth must wrap the final gameplay update chain');

assert.match(releaseConfig, /'spell-depth\.css'/, 'spell-depth CSS must ship');
assert.match(releaseConfig, /'spell-depth\.js'/, 'spell-depth JS must ship');
assert.match(packageJson.scripts['spell:check'], /check-spell-depth\.mjs/, 'package scripts must expose spell-depth checks');
assert.match(packageJson.scripts.check, /spell:check/, 'normal verification must include spell-depth checks');

console.log('Spell identity and build-depth checks passed.');
