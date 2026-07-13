# Pixel Mage — Start Here

This file is the permanent entry point for every future ChatGPT or Codex session. Chat memory is helpful, but the repository is the source of truth.

## Fixed Project Context

- Product: Pixel Mage
- Repository: `Ezz10099/beast-clash`
- Working branch: `main`
- Target: a small, finished, profitable-capable Google Play release
- Primary test device: POCO X2-class Android phone in 20:9 portrait
- Daily workflow: ChatGPT/Codex edits GitHub, the owner pulls in SPCK, then tests on the phone
- Product rule: Pixel Mage is the only active game until it enters Google Play testing or is formally cancelled

## Authority Order

Read these files in order before changing the project:

1. `AGENTS.md` — mandatory working rules.
2. `docs/START_HERE.md` — project map and session protocol.
3. `docs/RELEASE_SCOPE.md` — locked product boundaries.
4. `docs/DECISIONS.md` — decisions that must not be repeatedly reopened.
5. `docs/ROADMAP.md` — milestones through Google Play testing.
6. `docs/SESSION_HANDOFF.md` — latest verified state and exact next step.
7. `docs/GOOGLE_PLAY.md` — publishing path and release checklist.
8. `docs/BUILD.md` and `docs/ANDROID.md` — technical build contracts.

If two files conflict, stop and reconcile them in the same change. A new explicit user decision may override an older document, but the affected documents must then be updated immediately.

## Current High-Level State

- The locked five-wave game, release UX, controls, persistence, visual/audio polish, and deterministic web bundle were accepted through SPCK phone testing.
- The accepted browser release candidate is frozen on branch `web-rc-0.1.0`.
- Capacitor and the Android project are configured.
- The first cloud debug APK build succeeded on July 12, 2026.
- The first debug APK was installed and accepted on the target phone on July 13, 2026; the owner reported no bugs and all tested behavior worked.
- The current one-minute five-wave build is a validated native vertical slice, not yet the approved commercial launch scope.
- A Play-ready signed AAB, store listing, policy declarations, monetization integration, and Google Play testing are not complete.

The exact current status always belongs in `docs/SESSION_HANDOFF.md`.

## Mandatory Session Protocol

### At the start

1. Read the authority files above.
2. Check the latest `main` state before editing.
3. State one meaningful session goal and its acceptance test.
4. Do not reopen a locked decision unless new evidence makes it unsafe or impossible.

### During work

1. Work in substantial related batches, not isolated cosmetic micro-edits.
2. Stay inside `docs/RELEASE_SCOPE.md`.
3. Preserve the SPCK and 20:9 portrait workflow.
4. Run `npm run check` before publishing a stable batch.
5. Ask for one consolidated phone test after the complete batch.

### Before ending

1. Push the intended changes to `main`.
2. Update `docs/SESSION_HANDOFF.md` with the date, completed work, test status, blockers, and one exact next step.
3. Update milestone statuses in `docs/ROADMAP.md`.
4. Append to `docs/DECISIONS.md` only when a durable decision changed or was added.
5. Never describe untested phone behavior as accepted.

## Decision Authority

- ChatGPT/Codex should lead routine technical, architecture, testing, and workflow decisions.
- The owner remains the creative director and final product authority.
- Obtain explicit approval before a scope expansion, engine change, monetization choice, data collection, external SDK, package identity change, signing-key creation, publisher-account decision, destructive removal, or Google Play submission.

## Asset Safety

Any external or generated release asset must retain its source, generation prompt or license, creation date, and commercial-use evidence. Do not add an asset with unclear publishing rights.

## New-Session Prompt

Use this short prompt in a new conversation:

> Work on `Ezz10099/beast-clash`, branch `main`. Read `AGENTS.md` and `docs/START_HERE.md`, then continue from `docs/SESSION_HANDOFF.md`. Keep the locked release scope, run the required checks, push the completed batch, and update the handoff.
