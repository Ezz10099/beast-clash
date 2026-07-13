import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readText = (path) => readFile(resolve(root, path), 'utf8');

const [configText, packageText, manifest, gradle, workflow, nativeEntry] = await Promise.all([
  readText('capacitor.config.json'),
  readText('package.json'),
  readText('android/app/src/main/AndroidManifest.xml'),
  readText('android/app/build.gradle'),
  readText('.github/workflows/android-debug-apk.yml'),
  readText('scripts/native-entry.mjs'),
]);

const config = JSON.parse(configText);
const packageJson = JSON.parse(packageText);

assert.equal(config.appId, 'com.ezz10099.pixelmage');
assert.equal(config.appName, 'Pixel Mage');
assert.equal(config.webDir, 'dist');
assert.equal(config.android.allowMixedContent, false);

for (const [name, version] of Object.entries({
  '@capacitor/core': '8.4.1',
  '@capacitor/android': '8.4.1',
  '@capacitor/app': '8.1.0',
})) {
  assert.equal(packageJson.dependencies[name], version, `${name} must remain exactly pinned`);
}
assert.equal(packageJson.devDependencies['@capacitor/cli'], '8.4.1');

assert.match(manifest, /android:screenOrientation="portrait"/);
assert.match(manifest, /android:usesCleartextTraffic="false"/);
assert.doesNotMatch(manifest, /android\.permission\.INTERNET/, 'offline app must not request internet permission');
assert.match(gradle, /applicationId "com\.ezz10099\.pixelmage"/);
assert.match(gradle, /versionCode 1/);
assert.match(gradle, /versionName "0\.1\.0"/);
assert.match(nativeEntry, /backButton/);
assert.match(nativeEntry, /appStateChange/);

assert.match(workflow, /workflow_dispatch:/);
assert.match(workflow, /assembleDebug/);
assert.match(workflow, /upload-artifact/);
assert.match(workflow, /app-debug\.apk/);
assert.match(workflow, /npm run evidence/);
assert.match(workflow, /pixel-mage-evidence/);
assert.match(workflow, /evidence-report\.\*/);

const requiredImages = [
  ['assets/icon-only.png', 1024, 1024],
  ['assets/splash.png', 2732, 2732],
  ['android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png', 192, 192],
  ['android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png', 432, 432],
  ['android/app/src/main/res/drawable-port-xxxhdpi/splash.png', 1280, 1920],
];

for (const [path, width, height] of requiredImages) {
  const metadata = await sharp(resolve(root, path)).metadata();
  assert.equal(metadata.width, width, `${path} width is incorrect`);
  assert.equal(metadata.height, height, `${path} height is incorrect`);
}

process.stdout.write('Android configuration checks passed.\n');
