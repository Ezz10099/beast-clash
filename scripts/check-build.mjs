import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { OUTPUT_DIRECTORY, RELEASE_FILES } from './release-config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, OUTPUT_DIRECTORY);
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const MINIFIED_SOURCE_FILES = new Set([
  'style.css',
  'localization.css',
  'phone-polish.css',
  'arena-fx.css',
  'enemy-variety.css',
  'spell-depth.css',
  'localization.js',
  'touch-controls.js',
  'phone-polish.js',
  'arena-fx.js',
  'enemy-variety.js',
  'spell-depth.js',
]);

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = [];

  for (const entry of entries) {
    const absolute = resolve(directory, entry.name);
    if (entry.isDirectory()) paths.push(...await listFiles(absolute));
    else paths.push(relative(output, absolute).replaceAll('\\', '/'));
  }

  return paths.sort();
}

const expectedFiles = [...RELEASE_FILES, 'build-manifest.json'].sort();
const bundledFiles = await listFiles(output);
assert.deepEqual(bundledFiles, expectedFiles, 'release bundle contains unexpected or missing files');

const manifest = JSON.parse(await readFile(resolve(output, 'build-manifest.json'), 'utf8'));
assert.equal(manifest.application, 'Pixel Mage');
assert.equal(manifest.version, packageJson.version);
assert.equal(manifest.offline, true);
assert.deepEqual(manifest.files.map((file) => file.path), RELEASE_FILES);

let runtimeBytes = 0;
for (const record of manifest.files) {
  const bundled = await readFile(resolve(output, record.path));
  const digest = createHash('sha256').update(bundled).digest('hex');

  if (record.path !== 'game.js' && !MINIFIED_SOURCE_FILES.has(record.path)) {
    const source = await readFile(resolve(root, record.path));
    assert.deepEqual(bundled, source, `${record.path} changed while being bundled`);
  }
  if (MINIFIED_SOURCE_FILES.has(record.path)) {
    const source = await readFile(resolve(root, record.path));
    assert.ok(bundled.byteLength < source.byteLength, `${record.path} must be minified in the release bundle`);
  }
  assert.equal(record.bytes, bundled.byteLength, `${record.path} byte count is incorrect`);
  assert.equal(record.sha256, digest, `${record.path} checksum is incorrect`);
  runtimeBytes += bundled.byteLength;
}

const html = await readFile(resolve(output, 'index.html'), 'utf8');
const css = await readFile(resolve(output, 'style.css'), 'utf8');
const localizationCss = await readFile(resolve(output, 'localization.css'), 'utf8');
const polishCss = await readFile(resolve(output, 'phone-polish.css'), 'utf8');
const arenaFxCss = await readFile(resolve(output, 'arena-fx.css'), 'utf8');
const enemyVarietyCss = await readFile(resolve(output, 'enemy-variety.css'), 'utf8');
const spellDepthCss = await readFile(resolve(output, 'spell-depth.css'), 'utf8');
const localization = await readFile(resolve(output, 'localization.js'), 'utf8');
const touchControls = await readFile(resolve(output, 'touch-controls.js'), 'utf8');
const phonePolish = await readFile(resolve(output, 'phone-polish.js'), 'utf8');
const arenaFx = await readFile(resolve(output, 'arena-fx.js'), 'utf8');
const enemyVariety = await readFile(resolve(output, 'enemy-variety.js'), 'utf8');
const spellDepth = await readFile(resolve(output, 'spell-depth.js'), 'utf8');
assert.doesNotMatch(html, /(?:src|href)=["']https?:\/\//i, 'release HTML must not depend on the network');
assert.match(html, /href=["']style\.css["']/);
assert.match(html, /href=["']localization\.css["']/);
assert.match(html, /href=["']phone-polish\.css["']/);
assert.match(html, /href=["']arena-fx\.css["']/);
assert.match(html, /href=["']enemy-variety\.css["']/);
assert.match(html, /href=["']spell-depth\.css["']/);
assert.match(html, /src=["']localization\.js["']/);
assert.match(html, /src=["']touch-controls\.js["']/);
assert.match(html, /src=["']game\.js["']/);
assert.match(html, /src=["']phone-polish\.js["']/);
assert.match(html, /src=["']arena-fx\.js["']/);
assert.match(html, /src=["']enemy-variety\.js["']/);
assert.match(html, /src=["']spell-depth\.js["']/);
assert.match(html, /id=["']arenaFx["'][^>]*width=["']320["'][^>]*height=["']480["']/);
assert.match(html, /id=["']enemyFx["'][^>]*width=["']320["'][^>]*height=["']480["']/);
assert.match(html, /id=["']spellFx["'][^>]*width=["']320["'][^>]*height=["']480["']/);
assert.ok(
  html.indexOf('src="localization.js"') < html.indexOf('src="touch-controls.js"') &&
    html.indexOf('src="touch-controls.js"') < html.indexOf('src="game.js"') &&
    html.indexOf('src="game.js"') < html.indexOf('src="phone-polish.js"') &&
    html.indexOf('src="phone-polish.js"') < html.indexOf('src="arena-fx.js"') &&
    html.indexOf('src="arena-fx.js"') < html.indexOf('src="enemy-variety.js"') &&
    html.indexOf('src="enemy-variety.js"') < html.indexOf('src="spell-depth.js"'),
  'core dependencies must initialize before presentation, enemy-variety, and spell-depth extensions',
);
assert.match(html, /viewport-fit=cover/, 'safe-area viewport support is required');
assert.match(html, /class="combat-deck"/, 'release HTML must include the unified combat dashboard');
assert.match(html, /class="spell-depth-card"/, 'release HTML must include visible spell identity');
assert.match(html, /id="spellDepthMeter"/, 'release HTML must include the spell payoff meter');
assert.match(html, /class="hud-card hud-health"[\s\S]*id="healthMeter"/, 'health meter must remain attached to health');
assert.match(html, /class="hud-card hud-wave"[\s\S]*id="waveMeter"/, 'wave meter must remain attached to wave progress');
assert.doesNotMatch(html, /class="status-meters"/, 'detached meter row must not return');
assert.match(css, /safe-area-inset-top/, 'top safe-area support is required');
assert.match(css, /100svh/, 'small-viewport height support is required');
assert.match(css, /@media\(max-height:700px\)|@media \(max-height: 700px\)/, 'short portrait layout is required');
assert.match(css, /@media\(max-height:600px\)|@media \(max-height: 600px\)/, 'small portrait layout is required');
assert.match(localizationCss, /html\[lang=.?ar.?\]/, 'Arabic layout must remain query-scoped');
assert.match(localizationCss, /direction:rtl/, 'Arabic layout must retain RTL presentation');
assert.match(polishCss, /\.combat-deck/, 'unified combat dashboard styling must ship');
assert.match(polishCss, /\.hud-card/, 'attached HUD card styling must ship');
assert.match(polishCss, /overflow-y:auto/, 'phone overlays must remain scroll safe');
assert.match(polishCss, /@media\(orientation:landscape\)/, 'landscape guidance must remain available');
assert.match(arenaFxCss, /pointer-events:none/, 'arena FX must never intercept gameplay input');
assert.match(arenaFxCss, /data-screen=(?:["']?playing["']?)/, 'arena FX must remain scoped to active play');
assert.match(enemyVarietyCss, /pointer-events:none/, 'enemy telegraphs must never intercept gameplay input');
assert.match(enemyVarietyCss, /data-screen=(?:["']?playing["']?)/, 'enemy telegraphs must remain scoped to active play');
assert.match(spellDepthCss, /pointer-events:none/, 'spell feedback must never intercept gameplay input');
assert.match(spellDepthCss, /html\[lang=(?:["']?ar["']?)\]/, 'spell identity must support Arabic layout');
assert.match(spellDepthCss, /prefers-reduced-motion/, 'spell identity feedback must respect reduced motion');
assert.match(localization, /URLSearchParams\(.+\)\.get\(.lang.\)/, 'Arabic mode must remain explicitly query-activated');
assert.doesNotMatch(localization, /localStorage|SaveSystem|persistent\.|state\./, 'localization must not touch saves or gameplay state');
assert.match(localization, /الجوهر/, 'release localization must preserve the approved Essence term');
assert.match(localization, /القانون/, 'release localization must preserve the approved Law term');
assert.match(localization, /إعادة الصياغة/, 'release localization must preserve the approved Rewrite term');
assert.doesNotMatch(localization, /طريقة الإطلاق|العنصر/, 'retired Arabic spell-axis terms must not return');
assert.match(touchControls, /THUMB_CLEARANCE_CANVAS_Y=84|84/, 'release controls must preserve accepted thumb clearance');
assert.doesNotMatch(touchControls, /localStorage|SaveSystem|persistent\.|state\./, 'touch controls must not alter saves or game state directly');
assert.match(phonePolish, /Tap again to restart/, 'release polish must retain restart protection');
assert.match(phonePolish, /إعادة التحدّي/, 'release polish must retain corrected Arabic restart wording');
assert.match(phonePolish, /dataset\.screen/, 'release polish must track visible panel state for the portrait layout');
assert.doesNotMatch(phonePolish, /localStorage|SaveSystem|persistent\.|state\./, 'phone polish must not alter saves or game state directly');
assert.match(arenaFx, /requestAnimationFrame/, 'release arena FX must animate through the browser frame clock');
assert.match(arenaFx, /prefers-reduced-motion/, 'release arena FX must respect reduced motion');
assert.doesNotMatch(arenaFx, /localStorage|SaveSystem|persistent\.|state\.|fetch\(/, 'arena FX must remain offline and read-only');
assert.match(enemyVariety, /PixelMageEnemyVariety/, 'release enemy variety must expose its deterministic runtime marker');
assert.match(enemyVariety, /fanTell/, 'release enemy variety must retain fan-fire telegraphs');
assert.match(enemyVariety, /surgeTell/, 'release enemy variety must retain surge telegraphs');
assert.match(enemyVariety, /varietyRelayTarget/, 'release enemy variety must retain current-roster relay links');
assert.doesNotMatch(enemyVariety, /localStorage|SaveSystem|persistent\.|fetch\(/, 'enemy variety must remain offline and outside persistence');
assert.match(spellDepth, /PixelMageSpellDepth/, 'release spell depth must expose its deterministic runtime marker');
assert.match(spellDepth, /PRECISION BURST/, 'release spell depth must retain Bolt precision payoff');
assert.match(spellDepth, /WARD PULSE/, 'release spell depth must retain Orbit ward payoff');
assert.match(spellDepth, /EMBER CHAIN/, 'release spell depth must retain Ember chain payoff');
assert.match(spellDepth, /SHATTER/, 'release spell depth must retain Frost shatter payoff');
assert.doesNotMatch(spellDepth, /localStorage|SaveSystem|persistent\.|fetch\(/, 'spell depth must remain offline and outside persistence');
const nativeGame = await readFile(resolve(output, 'game.js'), 'utf8');
assert.match(nativeGame, /backButton/, 'native bundle must handle the Android Back button');
assert.match(nativeGame, /appStateChange/, 'native bundle must handle native app pausing');

for (const legacyPath of ['phaser.min.js', 'src/main.js', 'assets/sprites/animals/tiger.png']) {
  assert.ok(!bundledFiles.includes(legacyPath), `${legacyPath} must remain outside the release bundle`);
}

process.stdout.write(`Release bundle checks passed (${runtimeBytes} runtime bytes; size checked separately).\n`);
