import { mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = resolve(root, 'assets/android-source');
const androidResources = resolve(root, 'android/app/src/main/res');
const background = { r: 16, g: 20, b: 32, alpha: 1 };

const sources = {
  icon: await readFile(resolve(sourceDirectory, 'icon-only.svg')),
  foreground: await readFile(resolve(sourceDirectory, 'icon-foreground.svg')),
  iconBackground: await readFile(resolve(sourceDirectory, 'icon-background.svg')),
  splash: await readFile(resolve(sourceDirectory, 'splash.svg')),
};

async function render(input, output, width, height, options = {}) {
  await mkdir(dirname(output), { recursive: true });
  await sharp(input, { density: 384 })
    .resize(width, height, {
      fit: options.fit || 'contain',
      background: options.background || background,
    })
    .png({ compressionLevel: 9, palette: false })
    .toFile(output);
}

await render(sources.icon, resolve(root, 'assets/icon-only.png'), 1024, 1024);
await render(sources.foreground, resolve(root, 'assets/icon-foreground.png'), 1024, 1024, { background: { r: 0, g: 0, b: 0, alpha: 0 } });
await render(sources.iconBackground, resolve(root, 'assets/icon-background.png'), 1024, 1024);
await render(sources.splash, resolve(root, 'assets/splash.png'), 2732, 2732);
await render(sources.splash, resolve(root, 'assets/splash-dark.png'), 2732, 2732);

const iconDensities = [
  ['mdpi', 48, 108],
  ['hdpi', 72, 162],
  ['xhdpi', 96, 216],
  ['xxhdpi', 144, 324],
  ['xxxhdpi', 192, 432],
];

for (const [density, iconSize, foregroundSize] of iconDensities) {
  const directory = resolve(androidResources, `mipmap-${density}`);
  await render(sources.icon, resolve(directory, 'ic_launcher.png'), iconSize, iconSize);
  await render(sources.icon, resolve(directory, 'ic_launcher_round.png'), iconSize, iconSize);
  await render(
    sources.foreground,
    resolve(directory, 'ic_launcher_foreground.png'),
    foregroundSize,
    foregroundSize,
    { background: { r: 0, g: 0, b: 0, alpha: 0 } },
  );
}

const portraitSplashes = [
  ['mdpi', 320, 480],
  ['hdpi', 480, 800],
  ['xhdpi', 720, 1280],
  ['xxhdpi', 960, 1600],
  ['xxxhdpi', 1280, 1920],
];
const landscapeSplashes = portraitSplashes.map(([density, width, height]) => [density, height, width]);

for (const [density, width, height] of portraitSplashes) {
  await render(sources.splash, resolve(androidResources, `drawable-port-${density}/splash.png`), width, height);
}
for (const [density, width, height] of landscapeSplashes) {
  await render(sources.splash, resolve(androidResources, `drawable-land-${density}/splash.png`), width, height);
}
await render(sources.splash, resolve(androidResources, 'drawable/splash.png'), 480, 320);

process.stdout.write('Generated original Pixel Mage Android icon and splash resources.\n');
