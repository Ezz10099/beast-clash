# Pixel Mage — Roadmap to Google Play Testing

## Ultimate Goal

Finish and publish Pixel Mage as a stable, commercially credible Android game that newcomers quickly understand, genuinely enjoy, and specifically want to replay—without allowing the project to grow beyond what can realistically be finished through the GitHub–SPCK–Capacitor workflow.

The current debug APK and representative slice prove the technical route and support the Living Spell Trials direction. They are not yet the approved commercial release.

## Binding Product Objectives

- Preserve Pixel Mage continuity and the accepted one-thumb drag plus automatic-casting foundation.
- Make Form, Essence, and Law produce visibly different play styles and meaningful tradeoffs.
- Build each run toward stronger escalation, guardians, and a satisfying boss climax.
- Create replay desire through functional discovery and different playable builds rather than permanent-power grinding.
- Keep portrait readability, safe areas, offline play, local persistence, stable performance, and Android delivery intact.
- Use automation, research, synthetic play, and rare human cells at their honest evidence levels.
- Prefer the smallest release that is genuinely enjoyable, replayable, polished, worth keeping, and finishable—not the smallest packageable build.

## Commercial Gate Sequence

1. Focused research and comparable-player evidence — **complete**.
2. Three capped commercial options — **complete**.
3. Owner selection of Living Spell Trials — **complete, July 13, 2026**.
4. One representative 12-wave run with 2×2×2 spell parts — **complete**.
5. Owner phone test and bounded corrections — **complete through `.8`**.
6. Continuous evidence lane: 200 build runs, 100 choice-policy runs, idle/movement controls, replays, and starting-spell payoff — **complete and green on `.9`**.
7. Clean isolated fresh-player saves and frozen human protocol — **complete on `.9`**.
8. Arabic-capable, non-coached access for available testers — **implemented on `main`; owner meaning/layout check pending**.
9. Offline Cell Runner for accurate setup, silent observation, hidden interview, token protection, and complete export — **implemented on `main`; owner usability check pending**.
10. One genuine fresh-player commercial cell and owner second go/no-go — **next after both owner checks pass**.
11. Revise the remaining launch batch from the measured evidence — **blocked on step 10**.

Do not scale full content, create final assets, add monetization, or begin store production before the second go/no-go.

## Milestones 0–7 — Technical and Native Foundation

**Status: Complete and owner-accepted.**

The project has:

- a stable custom HTML/CSS/JavaScript runtime;
- accepted one-thumb portrait controls;
- pause, settings, sound, haptics, app-switch safety, and local persistence;
- deterministic offline release bundling and Android configuration;
- Capacitor 8 with package ID `com.ezz10099.pixelmage`;
- an installed debug APK accepted without reported bugs;
- a proven GitHub → SPCK → Capacitor development route.

The accepted native five-wave build lasts roughly one minute and remains a technical vertical slice, not the commercial endpoint.

## Milestone 8 — Representative Commercial Gate

**Status: Active. Arabic readiness and the Cell Runner are implemented; both owner phone checks and the genuine fresh-player cell remain pending.**

### Accepted representative foundation

- one arena and one 12-wave/three-act run;
- Bolt/Orbit Forms, Ember/Frost Essences, and Split/Echo Laws;
- eight representative combinations;
- Motes, Glyph Casters, guardian charges, and The Redactor;
- compact visual rewrite choices and next-threat previews;
- equal growth for Hold and rewrite choices;
- readable red-rune movement pressure;
- functional Spellbook discovery and selectable starting spells;
- checkpoint/resume and isolated `?fresh=` test saves.

### Human evidence already accepted

- First run: 5:49; experimentation and boss were positive, while onboarding, late pacing, Spellbook value, and Orbit feel failed.
- Corrected loop: reported entertaining with roughly 15 minutes of representative experimentation.
- Text-heavy `.4`: rejected.
- Compact `.5`, closed-loop `.6`, equal-growth `.7`, and agency/progression `.8`: passed owner SPCK review.

### Automated evidence already accepted

- 200 active build runs with 99% wins and about 9% build spread.
- 100 choice-policy runs with 5.8% median spread.
- 0% idle wins and 100% simple-movement wins.
- 8/8 deterministic replays.
- 8/8 selectable starting-spell payoff checks.
- No runtime violation.

These results do not prove human comprehension, boredom/fairness, climax satisfaction, replay desire, or commercial longevity.

### Arabic readiness batch

Implemented on `main`:

- explicit `?lang=ar` activation;
- combined clean path `?fresh=<token>&lang=ar`;
- essential Arabic DOM and canvas language;
- RTL presentation;
- default English preservation;
- no gameplay, balance, progression, save, or scope changes;
- deterministic localization and fresh-save compatibility checks;
- localization assets in the offline release whitelist;
- separately minified localization runtime while retaining the 100 KB bundle ceiling;
- Arabic neutral instruction and exact meaning-preserving questions in `docs/FRESH_PLAYER_CELL.md`.

### Offline Cell Runner batch

Implemented on `main` outside the player release bundle:

- `cell-runner.html`, `cell-runner.css`, and `cell-runner.js` for phone-first execution;
- unique English/Arabic isolated game-link generation;
- local rejection of reused participant tokens;
- neutral instruction visible before play while the interview remains hidden;
- attempt timing and the complete required observation fields;
- exact eight-question English/Arabic interview after observation closes;
- local unnamed draft recovery;
- frozen six-condition GO enforcement;
- complete Markdown export for the development session;
- no network resources, analytics, telemetry, accounts, or participant-name field;
- deterministic syntax, structure, release-exclusion, and headless behavior checks through `npm run cell:check` inside `npm run check`.

The runner reduces execution mistakes. It does not create gameplay evidence, interpret free-text answers, or replace the owner's final decision.

### Remaining Milestone 8 exit criteria

1. Owner pulls latest `main` and passes one consolidated Arabic meaning/layout check in SPCK.
2. Owner opens `cell-runner.html` and passes its mobile usability and staged-flow check.
3. Normal English game path remains unchanged.
4. Normal repository checks pass, including workflow, localization, cell-runner, release-size, gameplay, and Android gates.
5. One genuinely fresh participant completes the frozen non-leading cell using a newly generated token.
6. Predictions are compared against the result.
7. Owner gives the second explicit GO / bounded REVISION / NO-GO-rethink decision.

## Milestone 9 — Play-Ready Release

**Status: Pending Milestone 8 decision.**

After a GO, define the remaining bounded production batch from measured evidence. Then complete only the approved content, polish, release identity, policy materials, secure signing, signed AAB, and Google Play test-track upload.

Exit criteria:

- the production candidate satisfies the approved value/replay target;
- final assets and store materials are complete;
- Play Console accepts the signed AAB;
- the Play-distributed build passes native acceptance.

## Milestone 10 — Closed Test and Production Access

**Status: Pending.**

- Complete any applicable Google Play closed-testing requirement.
- Recruit and retain any testers required by the account and current Play rules.
- Collect structured real-user evidence.
- Fix verified release blockers without reopening uncontrolled scope.
- Apply for production access and publish only after the release candidate passes its gate.

## Exact Next Step

Pull latest `main` and check **both** items in SPCK:

1. Open the game with `?fresh=owner-ar-check&lang=ar` and judge Arabic meaning, RTL fit, clipping, and unchanged behavior across the opening, HUD, wave cues, Spellbook, rewrite choices, pause/options, victory, and defeat.
2. Open `cell-runner.html`, choose Arabic, confirm it generates a unique game URL, walk through setup → observation → interview → gate → export using dummy answers, and confirm the layout is usable on the phone.

These are owner tooling/layout checks, not the genuine commercial cell. If both pass, reset the runner, generate a different unused token, and execute `docs/FRESH_PLAYER_CELL.md` with one genuinely fresh participant without coaching.
