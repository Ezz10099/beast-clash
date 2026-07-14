# Pixel Mage — Current Session Handoff

## Current Authority

- Active repository/branch: `Ezz10099/beast-clash` / `main`
- Active product: Pixel Mage
- Permanent entry point: `docs/START_HERE.md`
- Live session state: `docs/ACTIVE_SESSION.md`
- Persistent execution workflow: `docs/CHATGPT_WORKFLOW.md`
- Product authority: `docs/OWNER_MANDATE.md` and `docs/DEVELOPMENT_MODEL.md`
- Fresh-player gate: `docs/FRESH_PLAYER_CELL.md`
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

These results support the current direction but do not establish newcomer comprehension, experienced pacing/fairness, climax satisfaction, replay desire, or launch-scale longevity.

## Latest Accepted Automated Evidence

`0.2.0-representative.9` remained GREEN before the test-readiness/tooling batches:

- 200 active build runs with 99% wins and about 9% build spread;
- 100 real choice-policy runs with 5.8% median spread;
- 25/25 idle controls lost;
- 25/25 simple-movement controls won;
- 8/8 deterministic replays matched;
- all 8 proven starting spells equipped correctly;
- isolated `?fresh=` saves preserved normal owner progress;
- no runtime violation.

Automation does not prove fun, comprehension, fairness, replay desire, or value.

## Completed in the Arabic Readiness Batch

- Added query-activated Arabic mode: `?lang=ar`.
- Made it compatible with isolated clean saves: `?fresh=<unique-token>&lang=ar`.
- Kept English as the default and left `game.js` gameplay, balance, progression, persistence, and content unchanged.
- Added Arabic/RTL presentation for essential opening, HUD, Spellbook, rewrite, pause, wave, cue, result, and spell-part language.
- Added deterministic checks for English preservation, Arabic activation, essential translations, canvas text, whitespace stability, RTL state, and combined fresh-save isolation.
- Added the localization assets to the release whitelist and `npm run localization:check` to the normal verification path.
- Preserved the 100 KB release ceiling by minifying the localization runtime separately.
- Updated the frozen human protocol with exact Arabic setup, instruction, questions, and issue recording.

## Completed in the Offline Cell Runner Batch

- Added `cell-runner.html`, `cell-runner.css`, and `cell-runner.js` as repository-only observer tooling.
- Kept the runner outside `RELEASE_FILES`, `dist/`, the APK, and the future AAB.
- Added mobile-safe layout, English/Arabic selection, fresh-token generation, correct combined URLs, and local rejection of reused tokens.
- Added the exact neutral instruction before play while keeping the interview section hidden until observation closes.
- Added a timer, required behavior fields, issue notes, retry wording, and exact eight-question English/Arabic interview.
- Added local unnamed draft recovery; no participant-name field, remote resource, analytics, telemetry, account, or network transmission exists.
- Added a frozen gate checklist that refuses to export `GO candidate` unless all six GO conditions are checked.
- Added complete Markdown copy/download export for the development session.
- Added `scripts/headless-cell-runner.mjs` and `scripts/check-cell-runner.mjs`.
- Added `npm run cell:check` to the normal `npm run check` path.
- Updated the protocol, build contract, roadmap, active state, and handoff.

## Verification Status

Verified directly in isolated Node harnesses:

- localization source syntax and default-English preservation;
- Arabic/RTL activation and essential DOM/canvas translations;
- combined Arabic/fresh-save query semantics;
- Cell Runner source syntax;
- mobile/offline/release-exclusion contracts;
- fresh-token URL generation and Arabic parameter handling;
- used-token rejection;
- setup → silent observation → interview → gate → export stage flow;
- hidden interview during play;
- eight exact questions;
- refusal of a partial `GO candidate`;
- complete Arabic Markdown result export.

A complete clean-checkout `npm run check` could not be executed inside this assistant environment because direct GitHub cloning failed DNS resolution, and no commit status was exposed for these direct `main` writes. The repository now enforces both new contracts during its normal check. Do not represent either batch as phone-accepted or fully green until the normal repository check and owner SPCK checks complete.

## Exact Next Action — Check Both

The owner should pull latest `main` in SPCK and perform these two checks before involving the genuine participant.

### 1. Arabic game check

Open:

`?fresh=owner-ar-check&lang=ar`

Confirm:

- Arabic appears from the opening onward;
- opening, HUD, wave cues, Spellbook, rewrite cards, pause/options, victory, and defeat are readable without clipping or overlap;
- meanings are understandable and do not add coaching beyond the English game;
- movement, casting, hazards, choices, saving, and replay behavior remain unchanged;
- the normal URL without `lang=ar` still shows the unchanged English path.

### 2. Cell Runner check

Open `cell-runner.html` through SPCK preview.

- Choose Arabic and confirm a unique URL containing both `fresh` and `lang=ar` is generated.
- Use dummy information to walk through setup → observation → interview → gate → export.
- Confirm the interview is hidden during setup/observation and contains eight Arabic questions afterward.
- Confirm controls fit the phone, local draft restoration works after refresh, a partial GO is rejected, and the final Markdown record can be copied.
- Reset the runner after this owner check.

These are tooling/layout checks, not the genuine commercial cell.

## After Both Owner Checks Pass

- Reset `cell-runner.html`.
- Generate a different unused token.
- Use one genuinely fresh participant.
- Follow the runner and `docs/FRESH_PLAYER_CELL.md` exactly without coaching.
- Return the exported Markdown record.

Then compare the result with the pre-registered predictions and choose:

- **GO candidate:** owner may approve the next bounded production batch.
- **REVISION candidate:** diagnose one observed clarity, feedback, fairness, pacing, localization, or tooling cause and make one bounded correction.
- **NO-GO/rethink candidate:** reconsider the current implementation within Pixel Mage if the central loop, climax, or replay desire fails despite valid uncoached access.

Do not scale content before that decision.
