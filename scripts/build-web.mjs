import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

import { OUTPUT_DIRECTORY, RELEASE_FILES } from './release-config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, OUTPUT_DIRECTORY);
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const path of RELEASE_FILES.filter((file) => file !== 'game.js' && file !== 'localization.js')) {
  const source = resolve(root, path);
  const destination = resolve(output, path);

  await mkdir(dirname(destination), { recursive: true });
  await copyFile(source, destination);
}

await build({
  entryPoints: [resolve(root, 'localization.js')],
  outfile: resolve(output, 'localization.js'),
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['chrome60'],
  minify: true,
  legalComments: 'none',
});

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
