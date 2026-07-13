# Pixel Mage Agent Guide

## Active Product

Pixel Mage is the only active game in this repository. Read these files before making changes:

1. `docs/START_HERE.md` — permanent project map and mandatory session protocol.
2. `docs/RELEASE_SCOPE.md` — current scope status and approval gate.
3. `docs/DECISIONS.md` — durable decisions that must not be repeatedly reopened.
4. `docs/DESIGN_RESEARCH.md` — evidence, provisional findings, and unanswered design questions.
5. `docs/ROADMAP.md` — measurable roadmap through Google Play.
6. `docs/SESSION_HANDOFF.md` — latest verified state and exact next step.
7. `docs/GOOGLE_PLAY.md` — publishing terminology, requirements, and gates.
8. `docs/BUILD.md` and `docs/ANDROID.md` — technical build contracts.

The accepted technical foundation is authoritative. The exact commercial gameplay scope is not locked yet.

## User Workflow

- ChatGPT/Codex edits the GitHub repository.
- The owner pulls changes with SPCK Editor on Android and tests through SPCK preview.
- The primary validation device is a POCO X2-class 20:9 portrait phone, but layouts must remain responsive across portrait screens.
- Preserve safe areas and the accepted one-thumb control model: drag inside the arena while spells cast automatically.
- Keep pause, restart, sound, and haptic settings inside the compact Pause/Options overlay.

## Active Runtime Files

- `index.html`
- `style.css`
- `game.js`

The old `src/`, animal assets, and `phaser.min.js` belong to the previous Beast Clash prototype and are not loaded by Pixel Mage. Do not reactivate them.

## Release Bundle and Android

- `npm run build` creates `dist/` from the whitelist in `scripts/release-config.mjs`.
- Never edit or commit `dist/`.
- Keep the runtime fully local and below the enforced size ceiling.
- Keep package ID `com.ezz10099.pixelmage` unchanged.
- Keep Capacitor and build dependencies pinned.
- Run `npm run android:sync` before Android builds.
- Generate Android artwork from `assets/android-source/`.
- Never commit signing keys, passwords, credentials, APKs, or AABs.
- A debug APK is a test artifact; the future Play upload is a signed AAB.

## Scope Rules

- Treat the accepted one-minute five-wave build as a stable vertical slice, not a commercially finished game.
- Preserve its validated controls, technical route, Android identity, and automated checks.
- Research and documentation work may refine the proposed commercial direction.
- Do not implement new heroes, arenas, stories, currencies, equipment, shops, quests, external SDKs, or major progression systems until the owner explicitly approves the capped launch scope.
- Provisional ideas—including timed waves, endless continuation, and the “living spell” concept—must not be described as locked.
- Do not invent fixed content counts or playtime promises before a representative full run is built and phone-timed.
- Prefer code-driven variety and reusable data over asset-heavy animation or large rosters.

## Delivery Pace

- Work in substantial milestone batches, not micro-feature test cycles.
- Complete one final focused research round, present capped options, and obtain a scope lock before commercial gameplay expansion.
- After the lock, group related implementation, run automated checks, and request one consolidated phone test per batch.
- Prefer a stable, engaging, time-bounded release over either a one-minute shell or an unfinishable large RPG.

## Decision Boundaries

- Lead routine technical, architecture, testing, research, and workflow decisions.
- Obtain explicit owner approval before scope expansion, engine changes, monetization, data collection, external SDKs, package identity changes, signing-key creation, publisher-account choices, destructive removals, or Google Play submission.
- Record every durable decision in `docs/DECISIONS.md`.

## Session Closure

Before ending any meaningful session:

1. Publish intended stable changes to `main`.
2. Update `docs/SESSION_HANDOFF.md` with completed work, phone-test status, blockers, and one exact next step.
3. Update `docs/ROADMAP.md`.
4. Update `docs/DESIGN_RESEARCH.md` when new evidence changes design judgment.
5. Never mark phone behavior or provisional scope as accepted without owner confirmation.

## Verification

Run `npm run check` before every stable code commit. Documentation-only commits must still preserve all expected check results.

For browser preview, run `npm run preview` and test the complete accepted phone checklist.
