import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { OUTPUT_DIRECTORY } from './release-config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(resolve(root, OUTPUT_DIRECTORY, 'build-manifest.json'), 'utf8'));
const records = manifest.files.map((file) => ({ path: file.path, bytes: Number(file.bytes || 0) }));
const runtimeBytes = records.reduce((total, file) => total + file.bytes, 0);
const limitBytes = 100 * 1024;
const lines = [
  `Runtime bytes: ${runtimeBytes}`,
  `Limit bytes: ${limitBytes}`,
  `Difference: ${runtimeBytes - limitBytes}`,
  '',
  ...records.sort((a, b) => b.bytes - a.bytes).map((file) => `${file.bytes}\t${file.path}`),
  '',
];

await mkdir(resolve(root, 'artifacts', 'diagnostics'), { recursive: true });
await writeFile(resolve(root, 'artifacts', 'diagnostics', 'runtime-size.txt'), lines.join('\n'), 'utf8');

assert.ok(runtimeBytes < limitBytes, `runtime bundle is unexpectedly large: ${runtimeBytes} bytes (limit ${limitBytes})`);
process.stdout.write(`Runtime size check passed (${runtimeBytes}/${limitBytes} bytes).\n`);
