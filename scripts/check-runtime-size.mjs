import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { OUTPUT_DIRECTORY } from './release-config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(resolve(root, OUTPUT_DIRECTORY, 'build-manifest.json'), 'utf8'));
const records = manifest.files.map((file) => ({ path: file.path, bytes: Number(file.bytes || 0) }));
const runtimeBytes = records.reduce((total, file) => total + file.bytes, 0);
const limitBytes = 150 * 1024;
const fileLimits = Object.freeze({
  'game.js': 70 * 1024,
  'style.css': 18 * 1024,
  'localization.js': 18 * 1024,
  'phone-polish.css': 12 * 1024,
  'index.html': 10 * 1024,
  'enemy-variety.js': 10 * 1024,
  'arena-fx.js': 8 * 1024,
});
const lines = [
  `Runtime bytes: ${runtimeBytes}`,
  `Limit bytes: ${limitBytes}`,
  `Remaining: ${limitBytes - runtimeBytes}`,
  '',
  ...records.sort((a, b) => b.bytes - a.bytes).map((file) => {
    const fileLimit = fileLimits[file.path];
    return `${file.bytes}\t${file.path}${fileLimit ? `\tlimit ${fileLimit}` : ''}`;
  }),
  '',
];

await mkdir(resolve(root, 'artifacts', 'diagnostics'), { recursive: true });
await writeFile(resolve(root, 'artifacts', 'diagnostics', 'runtime-size.txt'), lines.join('\n'), 'utf8');

for (const file of records) {
  const fileLimit = fileLimits[file.path];
  if (fileLimit) assert.ok(file.bytes < fileLimit, `${file.path} is unexpectedly large: ${file.bytes} bytes (limit ${fileLimit})`);
}
assert.ok(runtimeBytes < limitBytes, `runtime bundle is unexpectedly large: ${runtimeBytes} bytes (limit ${limitBytes})`);
process.stdout.write(`Runtime size check passed (${runtimeBytes}/${limitBytes} bytes).\n`);
