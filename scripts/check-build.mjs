import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { OUTPUT_DIRECTORY, RELEASE_FILES } from './release-config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, OUTPUT_DIRECTORY);
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));

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

  if (record.path !== 'game.js' && record.path !== 'localization.js') {
    const source = await readFile(resolve(root, record.path));
    assert.deepEqual(bundled, source, `${record.path} changed while being bundled`);
  }
  assert.equal(record.bytes, bundled.byteLength, `${record.path} byte count is incorrect`);
  assert.equal(record.sha256, digest, `${record.path} checksum is incorrect`);
  runtimeBytes += bundled.byteLength;
}

const html = await readFile(resolve(output, 'index.html'), 'utf8');
const css = await readFile(resolve(output, 'style.css'), 'utf8');
const localizationCss = await readFile(resolve(output, 'localization.css'), 'utf8');
const localization = await readFile(resolve(output, 'localization.js'), 'utf8');
assert.doesNotMatch(html, /(?:src|href)=["']https?:\/\//i, 'release HTML must not depend on the network');
assert.match(html, /href=["']style\.css["']/);
assert.match(html, /href=["']localization\.css["']/);
assert.match(html, /src=["']localization\.js["']/);
assert.match(html, /src=["']game\.js["']/);
assert.ok(
  html.indexOf('src="localization.js"') < html.indexOf('src="game.js"'),
  'localization must initialize before the game runtime',
);
assert.match(html, /viewport-fit=cover/, 'safe-area viewport support is required');
assert.match(css, /safe-area-inset-top/, 'top safe-area support is required');
assert.match(css, /100svh/, 'small-viewport height support is required');
assert.match(css, /@media \(max-height: 700px\)/, 'short portrait layout is required');
assert.match(css, /@media \(max-height: 600px\)/, 'small portrait layout is required');
assert.match(localizationCss, /html\[lang="ar"\]/, 'Arabic layout must remain query-scoped');
assert.match(localizationCss, /direction:\s*rtl/, 'Arabic layout must retain RTL presentation');
assert.match(localization, /URLSearchParams\(.+\)\.get\(["']lang["']\)/, 'Arabic mode must remain explicitly query-activated');
assert.doesNotMatch(localization, /localStorage|SaveSystem|persistent\.|state\./, 'localization must not touch saves or gameplay state');
assert.ok(
  localization.length < (await readFile(resolve(root, 'localization.js'), 'utf8')).length,
  'release localization must be minified',
);
const nativeGame = await readFile(resolve(output, 'game.js'), 'utf8');
assert.match(nativeGame, /backButton/, 'native bundle must handle the Android Back button');
assert.match(nativeGame, /appStateChange/, 'native bundle must handle native app pausing');
assert.ok(runtimeBytes < 100 * 1024, `runtime bundle is unexpectedly large: ${runtimeBytes} bytes`);

for (const legacyPath of ['phaser.min.js', 'src/main.js', 'assets/sprites/animals/tiger.png']) {
  assert.ok(!bundledFiles.includes(legacyPath), `${legacyPath} must remain outside the release bundle`);
}

process.stdout.write(`Release bundle checks passed (${runtimeBytes} runtime bytes).\n`);
