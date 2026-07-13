# Pixel Mage Agent Guide

## Active Product

Pixel Mage is the only active game in this repository. Read these files before making changes:

1. `docs/START_HERE.md` — permanent project map and mandatory session protocol.
2. `docs/DEVELOPMENT_MODEL.md` — locked goal-to-code reasoning, creative discovery, fun-potential assessment, evidence boundaries, and calibration.
3. `docs/RELEASE_SCOPE.md` — current scope status and approval gate.
4. `docs/DECISIONS.md` — durable decisions that must not be repeatedly reopened.
5. `docs/EVIDENCE_PROTOCOL.md` and `docs/EVIDENCE_LEDGER.md` — permanent automated/research/human evidence roles and latest stable conclusions.
6. `docs/FRESH_PLAYER_CELL.md` — exact clean setup, non-leading questions, predictions, and commercial stop conditions.
7. `docs/DESIGN_RESEARCH.md` — completed evidence review and design reasoning.
8. `docs/SCOPE_OPTIONS.md` — capped commercial directions, recommendation, and representative-run gate.
9. `docs/ROADMAP.md` — measurable roadmap through Google Play.
10. `docs/SESSION_HANDOFF.md` — latest verified state and exact next step.
11. `docs/GOOGLE_PLAY.md` — publishing terminology, requirements, and gates.
12. `docs/BUILD.md` and `docs/ANDROID.md` — technical build contracts.

The final product goal and player promise in the Product Compass are authoritative. Everything else—scope details, mechanics, counts, process, and earlier decisions—is a revisable working hypothesis when evidence shows a better route to that goal. Apply `docs/DEVELOPMENT_MODEL.md` to every material decision: the goal must actively shape the intended experience, alternatives, code, evidence, and learning. Do not wait for the owner to identify problems or invent patches.

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
- Living Spell Trials remains the current product direction because it has positive phone evidence, not because its old exact cap is untouchable.
- Treat the implemented representative slice—one arena, one 12-wave run, 2 Forms × 2 Essences × 2 Laws, two normal enemy families, one elite behavior, one boss, readable Trial-rune movement pressure, selectable proven starting spells, checkpoint/resume, and expanded evidence—as the current test bed.
- The representative slice passed its consolidated owner phone gate through `.8`; do not produce the remaining launch content or final assets until the fresh-player cell and second explicit go/no-go.
- The 7–9-minute successful-run target, exact spell-word names/behaviors, balance, and final display title remain provisional until their listed gates pass.
- Treat Pixel Mage as a working title. Do not change the display name or package ID without explicit owner approval.
- Do not invent fixed content counts or playtime promises before a representative full run is built and phone-timed.
- Prefer code-driven variety and reusable data over asset-heavy animation or large rosters.

## Delivery Pace

- Work in substantial milestone batches, not micro-feature test cycles.
- Implement the representative slice as one substantial related batch, then request one consolidated phone test and a second go/no-go.
- Group related implementation and run automated checks. Request one consolidated human cell only at an explicit major commercial gate; do not create micro-test fatigue.
- Prefer a stable, engaging, time-bounded release over either a one-minute shell or an unfinishable large RPG.

## Decision Boundaries

- Codex owns routine product discovery as well as technical, architecture, testing, research, and workflow decisions. This includes finding the next issue without waiting for owner diagnosis.
- Obtain explicit owner approval before irreversible external actions: spending money, monetization or data collection, external SDKs, package identity or publisher-account changes, signing-key creation, destructive loss of accepted work, Google Play submission, or the major commercial go/no-go.
- Record every durable decision in `docs/DECISIONS.md`.

## Session Closure

Before ending any meaningful session:

1. Publish intended stable changes to `main`.
2. Update `docs/SESSION_HANDOFF.md` with completed work, phone-test status, blockers, and one exact next step.
3. Update `docs/ROADMAP.md`.
4. Update `docs/DESIGN_RESEARCH.md` when new evidence changes design judgment.
5. Never mark phone behavior or provisional scope as accepted without owner confirmation.

## Verification

Run `npm run check` before every stable code commit. Run `npm run evidence` before a stable gameplay gate or commercial recommendation. Documentation-only commits must still preserve all expected check results.

For browser preview, run `npm run preview` and test the complete accepted phone checklist.
