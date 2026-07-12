# Pixel Mage

A tiny mobile-first pixel-action game being finished as the owner's first Google Play release candidate.

This repo is intentionally simple for SPCK Editor on Android.

## Goal

Finish, test, package, and publish one small game on Google Play before returning to a larger project.

For any new ChatGPT or Codex session, begin with `docs/START_HERE.md` and continue from `docs/SESSION_HANDOFF.md`.

## Current Scope

Locked launch scope:

- One five-wave run lasting roughly five minutes.
- One player mage.
- Reused slime enemies with escalating health and speed.
- One final slime boss.
- One upgrade choice between waves.
- Score and locally saved best score.
- Touch controls.
- Keyboard controls.
- Pause/options menu with persistent sound and haptic toggles.
- Automatic safe pause when the game loses focus.
- Original synthesized sound effects with no external audio files.
- Win state.
- Lose state.
- Pixel-art visuals drawn in code.

Explicitly excluded:

- Shop.
- Gacha.
- Level map.
- Multiple characters.
- Big story.
- Asset pipeline.
- Equipment, inventory, quests, or multiple worlds.

## How to run in SPCK Editor

1. Clone this repo in SPCK:

   `https://github.com/Ezz10099/beast-clash.git`

2. Open:

   `index.html`

3. Start the SPCK preview / local server.

No Phaser file is needed anymore.

## Release build

Run `npm run check` to execute ten complete automated runs, create the offline release bundle, and verify its contents and checksums.

Run `npm run preview` to serve the exact generated `dist/` bundle intended for Capacitor. Legacy Beast Clash files remain available in the repository but are excluded from that bundle.

## Android build

The Capacitor 8 project uses the locked package ID `com.ezz10099.pixelmage`. A GitHub Actions workflow successfully builds an installable debug APK in the cloud, so Android Studio is not required for routine milestone builds.

See `docs/ANDROID.md` for the build and installation workflow.

The debug APK is a phone-testing artifact, not the Google Play upload. Google Play preparation and the future signed AAB are tracked in `docs/GOOGLE_PLAY.md`.

## Controls

Mobile:

- Drag anywhere in the arena: move toward your finger.
- Spells cast automatically.
- Pause button: pause, change feedback settings, or restart.

Laptop:

- WASD / Arrow keys: move.
- Spells cast automatically.
- Space / Enter: start.
- P / Escape: pause or resume.

## Definition of Done

The first release is considered finished when:

- The player can start the game.
- The player can move and cast spells.
- Five escalating waves and the boss can be completed.
- Upgrade choices noticeably change the run.
- The player can win or lose.
- Score and best score work reliably.
- Sound, haptics, pause, and settings are present.
- The game is packaged, device-tested, and accepted into Google Play testing.

## Rule

Do not add a new character, mode, world, story, or progression system before this release is published.

Project authority:

- `docs/START_HERE.md` — permanent cross-session entry point and working protocol.
- `docs/RELEASE_SCOPE.md` — locked completion contract.
- `docs/DECISIONS.md` — durable decisions that must not be repeatedly reopened.
- `docs/ROADMAP.md` — roadmap through Google Play testing.
- `docs/SESSION_HANDOFF.md` — current status and next-session entry point.
- `docs/GOOGLE_PLAY.md` — publishing path, terminology, and release gates.
- `docs/BUILD.md` — deterministic offline release-build contract.
- `docs/ANDROID.md` — Capacitor, cloud APK, and signing-safety contract.
