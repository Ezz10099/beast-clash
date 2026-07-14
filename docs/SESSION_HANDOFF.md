# Pixel Mage — Current Session Handoff

## Current Authority

- Active repository/branch: `Ezz10099/beast-clash` / `main`
- Active product: Pixel Mage
- Permanent entry point: `docs/START_HERE.md`
- Live session state: `docs/ACTIVE_SESSION.md`
- Persistent execution workflow: `docs/CHATGPT_WORKFLOW.md`
- Product authority: `docs/OWNER_MANDATE.md` and `docs/DEVELOPMENT_MODEL.md`
- Fresh-player gate: `docs/FRESH_PLAYER_CELL.md`
- Owner test entry point: `test-launcher.html`
- Observer tool: `cell-runner.html`
- Evidence: `docs/EVIDENCE_PROTOCOL.md` and `docs/EVIDENCE_LEDGER.md`
- Roadmap: `docs/ROADMAP.md`

Durable development history is preserved in Git, `docs/DECISIONS.md`, the evidence ledger, design research, and the roadmap. This handoff intentionally stays focused on the exact current state.

## Current Milestone

**Milestone 8 — Representative Commercial Gate.**

Living Spell Trials remains the evidence-supported Pixel Mage direction. The representative slice contains one 12-wave/three-act run, 2 Forms × 2 Essences × 2 Laws, two normal enemy families, guardian behavior, The Redactor boss, readable red-rune movement pressure, selectable proven starting spells, checkpoint/resume, and the compact visual rewrite flow.

Full launch content, final assets, monetization, signing, and Google Play submission remain blocked pending the valid fresh-player result and the owner's second explicit go/no-go.

## Latest Accepted Human Evidence

- The first complete representative run cleared in 5:49 and exposed unclear onboarding, a boring late pre-boss stretch, rote Spellbook risk, and weak-feeling Orbit.
- The corrected `.2` loop was reported as entertaining, with roughly 15 minutes of representative experimentation.
- Text-heavy `.4` failed immediate visual review.
- Compact visual `.5`, player-logic `.6`, equal-growth `.7`, and agency/progression `.8` passed the owner's SPCK review.
- In `.8`, the owner dodged a red Trial rune, proved and selected a spell, and confirmed that the next Trial began with it equipped.
- On July 14, the owner entered the provided Arabic query string into SPCK Console. SPCK interpreted it as JavaScript and returned `SyntaxError: Unexpected token '?'`. This is evidence that the hidden test workflow was not usable; it is not evidence that Arabic mode or gameplay failed.

These results support the current direction but do not establish newcomer comprehension, experienced pacing/fairness, climax satisfaction, replay desire, or launch-scale longevity.

## Latest Accepted Automated Evidence

`0.2.0-representative.9` remained GREEN before the test-readiness/tooling batches:

- 200 active build runs with 99% wins and about 9% build spread;
- 100 real choice-policy runs with 5.8% median spread;
- 25/25 idle controls lost;
- 25/25 simple-movement controls won;
- 8/8 deterministic replays matched;
- all 8 proven starting spells equipped correctly;
- isolated fresh saves preserved normal owner progress;
- no runtime violation.

Automation does not prove fun, comprehension, fairness, replay desire, or value.

## Completed Test-Readiness Infrastructure

### Arabic readiness

- Added Arabic/RTL presentation for essential opening, HUD, Spellbook, rewrite, pause, wave, cue, result, and spell-part language.
- Preserved English as default and left gameplay, balance, progression, persistence, and content unchanged.
- Added localization and fresh-save compatibility checks.
- Preserved the 100 KB release ceiling by minifying localization separately.

### Offline Cell Runner

- Added repository-only `cell-runner.html`, `cell-runner.css`, and `cell-runner.js`.
- Added English/Arabic selection, isolated token generation, reused-token rejection, hidden interview stages, timing, observations, exact questions, GO enforcement, local draft recovery, and Markdown export.
- Kept the runner offline, telemetry-free, unnamed, and outside `dist/`, APKs, and AABs.
- Added `npm run cell:check` to normal verification.

### Tap-only SPCK Test Launcher

- Added repository-only `test-launcher.html`, `test-launcher.css`, and `test-launcher.js`.
- Added three visible touch-sized buttons: **Open Arabic Game**, **Open English Game**, and **Open Cell Runner**.
- Arabic and English buttons generate unique clean owner-check tokens automatically.
- No Console, DevTools, URL editing, source editing, or manual token construction is required.
- Added `scripts/check-test-launcher.mjs` and `npm run launcher:check` inside `npm run check`.
- Kept launcher files outside the production release whitelist.

### Permanent workflow correction

- Added **Owner execution** to the mandatory per-response gate.
- Added `## Owner Phone Workflow Gate` to `docs/CHATGPT_WORKFLOW.md`.
- Future phone requests must name an exact SPCK file or screen and provide a visible tap path.
- Hidden query strings, Console input, terminal commands, manual tokens, and source edits are prohibited when a bounded interface can perform the action.
- `npm run workflow:check` now protects this rule.

## Verification Status

Verified through isolated source/static/headless contracts:

- localization source syntax and Arabic/English behavior;
- fresh-save semantics;
- Cell Runner staged flow, token reuse blocking, hidden interview, GO enforcement, and export;
- Test Launcher automatic Arabic/English URL construction and direct Cell Runner navigation;
- touch-sized/safe-area layout contracts;
- offline/no-telemetry behavior;
- exclusion of launcher and runner files from the production release whitelist.

A complete clean-checkout `npm run check` could not be executed inside the assistant environment because direct GitHub cloning failed DNS resolution, and no commit status was exposed for these direct `main` writes. Do not represent the new batches as phone-accepted until the owner completes the SPCK checks.

## Exact Next Action — Tap Only

The owner should pull latest `main` in SPCK and perform these checks before involving the genuine participant:

1. In the SPCK file list, tap `test-launcher.html`.
2. Tap **Preview**.
3. Tap **Open Arabic Game**.
   - Check Arabic appears immediately.
   - Check opening, HUD, wave cues, Spellbook, rewrites, options, victory, and defeat for incorrect meaning, clipping, overlap, or changed behavior.
4. Press Android **Back** to return to the launcher.
5. Tap **Open English Game**.
   - Confirm the normal English path remains unchanged.
6. Press Android **Back** to return to the launcher.
7. Tap **Open Cell Runner**.
   - Use dummy information.
   - Complete Setup → Observation → Interview → Gate → Export.
   - Confirm questions stay hidden during observation, partial GO is rejected, draft recovery works, and the Markdown record copies.
8. Reset the Cell Runner after the owner check.

Do not type into SPCK Console, edit the preview URL, or construct a token manually.

## After the Owner Checks Pass

- Open the Cell Runner from `test-launcher.html`.
- Generate a different unused token.
- Use one genuinely fresh participant.
- Follow `docs/FRESH_PLAYER_CELL.md` exactly without coaching.
- Return the exported Markdown record.

Then compare the result with the pre-registered predictions and choose:

- **GO candidate:** owner may approve the next bounded production batch.
- **REVISION candidate:** diagnose one observed clarity, feedback, fairness, pacing, localization, or tooling cause and make one bounded correction.
- **NO-GO/rethink candidate:** reconsider the current implementation within Pixel Mage if the central loop, climax, or replay desire fails despite valid uncoached access.

Do not scale content before that decision.
