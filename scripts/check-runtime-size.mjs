import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { OUTPUT_DIRECTORY } from './release-config.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(resolve(root, OUTPUT_DIRECTORY, 'build-manifest.json'), 'utf8'));
const runtimeBytes = manifest.files.reduce((total, file) => total + Number(file.bytes || 0), 0);
const limitBytes = 100 * 1024;

assert.ok(runtimeBytes < limitBytes, `runtime bundle is unexpectedly large: ${runtimeBytes} bytes (limit ${limitBytes})`);
process.stdout.write(`Runtime size check passed (${runtimeBytes}/${limitBytes} bytes).\n`);
