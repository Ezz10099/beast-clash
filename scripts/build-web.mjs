import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

import { OUTPUT_DIRECTORY, RELEASE_FILES } from './release-config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, OUTPUT_DIRECTORY);
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const MINIFIED_SOURCE_FILES = new Set([
  'style.css',
  'localization.css',
  'phone-polish.css',
  'localization.js',
  'touch-controls.js',
  'phone-polish.js',
]);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const path of RELEASE_FILES) {
  if (path === 'game.js' || MINIFIED_SOURCE_FILES.has(path)) continue;
  const source = resolve(root, path);
  const destination = resolve(output, path);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(source, destination);
}

for (const path of MINIFIED_SOURCE_FILES) {
  await build({
    entryPoints: [resolve(root, path)],
    outfile: resolve(output, path),
    bundle: true,
    format: extname(path) === '.js' ? 'iife' : undefined,
    platform: 'browser',
    target: ['chrome60'],
    minify: true,
    legalComments: 'none',
  });
}

await build({
  entryPoints: [resolve(root, 'scripts/native-entry.mjs')],
  outfile: resolve(output, 'game.js'),
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['chrome60'],
  minify: true,
  legalComments: 'none',
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});

const files = [];
for (const path of RELEASE_FILES) {
  const content = await readFile(resolve(output, path));
  files.push({
    path,
    bytes: content.byteLength,
    sha256: createHash('sha256').update(content).digest('hex'),
  });
}

const manifest = {
  application: 'Pixel Mage',
  version: packageJson.version,
  offline: true,
  files,
};

await writeFile(
  resolve(output, 'build-manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8',
);

process.stdout.write(`Built ${OUTPUT_DIRECTORY}/ with ${files.length} runtime files.\n`);
