# Pixel Mage Agent Guide

## Active Product

Pixel Mage is the only active game in this repository. Read these files before making changes:

1. `docs/START_HERE.md` — permanent project map and mandatory session protocol.
2. `docs/RELEASE_SCOPE.md` — locked product boundaries.
3. `docs/DECISIONS.md` — durable decisions that must not be repeatedly reopened.
4. `docs/ROADMAP.md` — measurable roadmap through Google Play testing.
5. `docs/SESSION_HANDOFF.md` — current status and exact next step.
6. `docs/GOOGLE_PLAY.md` — publishing terminology, requirements, and gates.
7. `docs/BUILD.md` — exact files and verification rules for the Capacitor web bundle.
8. `docs/ANDROID.md` — locked Android identity and cloud build workflow.

The release contract remains authoritative until the first Google Play test release.

## User Workflow

- ChatGPT/Codex edits the GitHub repository.
- The user pulls changes with SPCK Editor on Android and tests through SPCK preview.
- The primary target is a 20:9 portrait POCO X2-class phone.
- Preserve top and bottom safe areas and the one-thumb control model: drag inside the arena to move while spells cast automatically.
- Keep pause, restart, sound, and haptic settings inside the single compact Pause/Options overlay.

## Active Runtime Files

- `index.html`
- `style.css`
- `game.js`

The old `src/`, animal assets, and `phaser.min.js` belong to the previous Beast Clash prototype and are not loaded by the active game. Do not reactivate or extend them.

## Release Bundle

- `npm run build` creates `dist/` from the explicit whitelist in `scripts/release-config.mjs`.
- Never edit or commit `dist/`; it is a verified generated artifact.
- Never add a legacy Beast Clash file to the release whitelist.
- Keep the runtime bundle fully local and below the enforced size ceiling.

## Android Rules

- Keep the package ID `com.ezz10099.pixelmage` unchanged.
- Keep Capacitor and build dependencies exactly pinned.
- Run `npm run android:sync` before any Android build.
- Generate icon and splash PNGs from `assets/android-source/`; do not hand-edit generated density files.
- Never commit a keystore, signing password, service credential, or generated APK/AAB.
- The GitHub workflow may build an unsigned-for-Play debug APK; signing begins only after device acceptance.
- Treat an APK as a direct-install testing artifact and an AAB as the future Google Play upload.

## Scope Rules

- Keep the five-wave run, one mage, slime family, one boss, and between-wave upgrades.
- Do not change engine or add characters, worlds, story, equipment, shops, quests, gacha, or a larger progression system.
- Prefer code-drawn visuals and small, testable changes that do not require a desktop editor.
- New ideas belong after the Google Play testing gate.

## Delivery Pace

- Work in substantial milestone batches, not one micro-feature per pull/test cycle.
- Group related minor improvements, run automated checks, then request one phone test for the complete batch.
- The target is no more than four major batches from the validated foundation to the first APK.
- Prefer a good, stable, time-bounded release over prolonged perfection work.
- Do not restore a D-pad or separate fire button before the APK gate unless phone testing proves the drag-and-auto-cast model unusable.

## Decision Boundaries

- Lead routine technical, architecture, testing, and workflow decisions.
- Obtain explicit owner approval before scope expansion, engine changes, monetization choices, data collection, external SDKs, package identity changes, signing-key creation, publisher-account choices, destructive removals, or Google Play submission.
- Record any new durable decision in `docs/DECISIONS.md`.

## Session Closure

Before ending any meaningful development session:

1. Publish the intended stable changes to `main`.
2. Update `docs/SESSION_HANDOFF.md` with completed work, phone-test status, blockers, and one exact next step.
3. Update milestone status in `docs/ROADMAP.md`.
4. Never mark phone behavior accepted until the owner reports the test result.

## Verification

Run before every stable commit:

`npm run check`

The command must complete ten runs and pass the deterministic release-bundle checks.

For browser preview:

`npm run preview`

Then test drag movement, automatic casting, pause/resume, focus-loss auto-pause, persisted feedback settings, upgrades, victory, defeat, restart, and phone fit in SPCK.
