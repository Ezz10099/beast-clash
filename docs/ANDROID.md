# Pixel Mage Android Delivery

## Permanent Identity

- App name: Pixel Mage
- Package ID: `com.ezz10099.pixelmage`
- Minimum Android version: Android 7 / API 24
- Target Android version: API 36
- Orientation: portrait

The package ID becomes the permanent Google Play identity. Do not change it after publishing.

## Safe Fast Build Route

The recommended route does not require the owner to have a laptop:

1. A push affecting the Android release automatically starts the `Build Android Debug APK` GitHub Actions workflow.
2. The workflow installs only pinned dependencies, runs all tests, regenerates artwork, synchronizes Capacitor, and builds the APK.
3. GitHub stores `pixel-mage-debug-apk` as a downloadable artifact for 14 days.
4. The owner installs and accepts that APK on the target phone.

The workflow can read repository contents and report its status on the triggering commit; it cannot modify game files. The debug APK uses no private release-signing key and cannot publish to Google Play.

The first cloud build succeeded on July 12, 2026. Build run: `29180335240`.

## Local Commands

- `npm run android:sync` — verify everything and synchronize the native project.
- `npm run android:apk` — build a debug APK when an Android SDK is available.
- `npm run assets:android` — regenerate original icon and splash resources from the committed SVG sources.

Generated PNG artwork and copied web files are intentionally ignored by Git. This keeps the repository smaller while making every build reproducible.

## Release Safety

- The app requests no Internet permission.
- Cleartext traffic is disabled.
- The web package remains fully local.
- Android Back pauses an active run; Back again from the pause screen exits.
- App switching safely pauses gameplay.
- Signing credentials must never be committed. Signing and the Play-ready AAB happen only after APK acceptance.
