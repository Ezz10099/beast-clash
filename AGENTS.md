# Pixel Mage Agent Guide

## Active Product

Pixel Mage is the only active game in this repository. Read these files before making changes:

1. `docs/START_HERE.md` — permanent project map and mandatory session protocol.
2. `docs/RELEASE_SCOPE.md` — current scope status and approval gate.
3. `docs/DECISIONS.md` — durable decisions that must not be repeatedly reopened.
4. `docs/DESIGN_RESEARCH.md` — completed evidence review and design reasoning.
5. `docs/SCOPE_OPTIONS.md` — capped commercial directions, recommendation, and representative-run gate.
6. `docs/ROADMAP.md` — measurable roadmap through Google Play.
7. `docs/SESSION_HANDOFF.md` — latest verified state and exact next step.
8. `docs/GOOGLE_PLAY.md` — publishing terminology, requirements, and gates.
9. `docs/BUILD.md` and `docs/ANDROID.md` — technical build contracts.

The accepted technical foundation and the owner-approved Living Spell Trials commercial scope are authoritative. Exact duration, balance, component behavior, final title, and monetization remain gated.

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
- Option B — Living Spell Trials — was explicitly owner-approved on July 13, 2026. Follow the locked cap in `docs/RELEASE_SCOPE.md`.
- Build the representative slice before scaling content: one arena, one 12-wave timed run, 2 Forms × 2 Essences × 2 Laws, two normal enemy families, one elite behavior, one boss, wave-boundary checkpoint/resume, and expanded automated checks.
- Do not produce the remaining launch content or final assets until that slice passes its consolidated phone gate.
- The 7–9-minute successful-run target, exact spell-word names/behaviors, balance, and final display title remain provisional until their listed gates pass.
- Treat Pixel Mage as a working title. Do not change the display name or package ID without explicit owner approval.
- Do not invent fixed content counts or playtime promises before a representative full run is built and phone-timed.
- Prefer code-driven variety and reusable data over asset-heavy animation or large rosters.

## Delivery Pace

- Work in substantial milestone batches, not micro-feature test cycles.
- Implement the representative slice as one substantial related batch, then request one consolidated phone test and a second go/no-go.
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
