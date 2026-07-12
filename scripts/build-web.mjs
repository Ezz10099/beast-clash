import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { OUTPUT_DIRECTORY, RELEASE_FILES } from './release-config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, OUTPUT_DIRECTORY);
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const files = [];
for (const path of RELEASE_FILES) {
  const source = resolve(root, path);
  const destination = resolve(output, path);
  const content = await readFile(source);

  await mkdir(dirname(destination), { recursive: true });
  await copyFile(source, destination);
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
