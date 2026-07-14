# Pixel Mage — Roadmap to Google Play Testing

## Ultimate Goal

Finish and publish Pixel Mage as a stable, commercially credible Android game that newcomers quickly understand, genuinely enjoy, and specifically want to replay—without exceeding what can realistically be finished through the GitHub–SPCK–Capacitor workflow.

## Binding Product Objectives

- Preserve Pixel Mage continuity and one-thumb automatic-casting play.
- Keep the mage and immediate threats visible during touch control.
- Make Form, Essence, and Law create meaningful, visible play-style changes.
- Make the small enemy roster produce distinct, readable tactical situations.
- Build runs toward satisfying guardians and bosses.
- Create replay desire through functional discovery rather than permanent-power grinding.
- Preserve natural Arabic and English presentation, coherent portrait hierarchy, offline play, persistence, performance, and Android delivery.
- Keep automation and human evidence within their honest boundaries.

## Commercial Gate Sequence

1. Focused research and capped scope options — **complete**.
2. Owner selected Living Spell Trials — **complete**.
3. Representative 12-wave 2×2×2 slice — **complete**.
4. Owner corrections through `.8` — **complete**.
5. Continuous evidence lane and clean fresh saves on `.9` — **complete**.
6. Arabic-capable access — **implemented**.
7. Offline Cell Runner — **implemented; owner check pending**.
8. Tap-only SPCK Test Launcher — **implemented and visible on phone**.
9. 84-pixel thumb-clearance correction — **owner accepted enough to continue**.
10. Phone readability, Arabic correction, portrait layout, and arena-feedback batches — **implemented; latest presentation batch owner-confirmed**.
11. Current-roster enemy-variety batch — **implemented and automated-green; owner phone check pending**.
12. Genuine fresh-player commercial cell and owner second go/no-go — **next after step 11 phone acceptance**.
13. Define remaining production scope from measured evidence — **blocked on step 12**.

Do not scale content, create final assets, add monetization, or begin store production before the second go/no-go.

## Milestones 0–7 — Technical and Native Foundation

**Status: Complete and owner-accepted.**

The project has a stable HTML/CSS/JavaScript runtime, one-thumb portrait controls, pause/settings/sound/haptics, local persistence, deterministic offline bundling, Capacitor 8, package ID `com.ezz10099.pixelmage`, and an installed debug APK accepted without reported bugs.

## Milestone 8 — Representative Commercial Gate

**Status: Active.**

### Accepted representative foundation

- one arena and one 12-wave/three-act run;
- Bolt/Orbit, Ember/Frost, Split/Echo;
- eight combinations;
- Motes, Glyph Casters, guardians, and The Redactor;
- compact rewrite choices and next-threat previews;
- equal Hold/rewrite growth;
- red-rune movement pressure;
- selectable proven starting spells;
- checkpoint/resume and isolated fresh saves.

### Accepted evidence

- First run: 5:49; experimentation and boss positive, onboarding/pacing/Spellbook/Orbit failed.
- Corrected loop: entertaining, with roughly 15 minutes of representative experimentation.
- Text-heavy `.4` rejected.
- Compact `.5`, closed-loop `.6`, equal-growth `.7`, and agency/progression `.8` passed owner SPCK review.
- Direct touch occluded play; 56-pixel clearance was too small; 84 pixels was acceptable enough to proceed.
- Arabic activation worked but required a full terminology correction.
- The initial stacked gameplay layout failed owner review and was rebuilt.
- The arena-feedback/atmosphere batch was owner-confirmed.
- The owner selected enemy variety as the next substantial field.

These results do not prove newcomer comprehension, touch quality across players, boredom/fairness, climax satisfaction, replay desire, or commercial longevity.

### Test-readiness and presentation infrastructure

Implemented on `main`:

- Arabic/RTL game access with a permanent glossary and default-English preservation;
- offline Cell Runner with staged observation/interview/gate/export;
- tap-only Test Launcher for Arabic, English, and Cell Runner access;
- permanent Owner Phone Workflow Gate;
- 84-pixel scaled thumb clearance and protected restart;
- compact header, dominant arena, unified dashboard, attached meters, and responsive overlays;
- act/essence atmosphere, touch trail, wave pulse, and damage-edge feedback;
- UTF-8-minified offline release assets under a documented 150 KB total and per-file budget.

### Current-roster enemy-variety batch

Implemented on `main` without adding a new enemy family, asset dependency, save field, currency, or progression system:

- Wave 1 remains the simple pursuit onboarding lane;
- Act II introduces deterministic flanking Motes;
- later Mote groups use separation so threats remain readable instead of collapsing into one blob;
- selected Glyph Casters use a visible purple three-lane pattern with warning and recovery time;
- nearby Casters visibly link to one Mote, creating a priority interaction;
- Act III introduces orange-ring/line Motes that pause for a warning and then commit toward the captured lane;
- Frost still slows this movement, Orbit can block the new projectiles, and Ember remains useful against nearby groups;
- indicators use a pointer-transparent 320×480 overlay;
- the deterministic headless runtime loads `enemy-variety.js`, so normal checks and evidence include the new behavior;
- `npm run enemy:check` protects roles, Wave 1 simplicity, formations, timing, links, current-roster scope, release inclusion, and no persistence/network access.

### Enemy-variety automated result

- Full GitHub Actions pipeline: **PASS**.
- Evidence: 200 build runs, 100 choice-policy runs, 25 idle controls, 25 movement controls, and 8 deterministic replays.
- Outcomes: 99% overall active survivability, 96% weakest-build survivability, 0% idle wins, 96% simple-movement wins, 9.2% build spread, 4.3% Form gap, 5.8% policy spread, and zero runtime violations.
- Release: 127,449-byte runtime under all size limits; Android configuration, Capacitor sync, debug APK build, APK verification, and artifact upload passed.
- Boundary: readability, fairness, tactical distinctness, and enjoyment remain owner/human claims.

### Remaining Milestone 8 exit criteria

1. Owner passes one consolidated SPCK enemy-readability and fairness check in Arabic.
2. Owner confirms normal English presentation remains correct.
3. Owner passes Cell Runner usability and staged-flow checks.
4. One genuine fresh participant completes the frozen non-leading cell.
5. Predictions are compared with the result.
6. Owner gives GO / bounded REVISION / NO-GO-rethink.

## Milestone 9 — Play-Ready Release

**Status: Pending Milestone 8 decision.**

After a GO, define and complete only the approved production batch, final identity/assets, policy materials, secure signing, signed AAB, and Play test-track upload.

## Milestone 10 — Closed Test and Production Access

**Status: Pending.**

Complete any applicable Play testing requirement, collect structured evidence, fix verified release blockers, and publish only after the production candidate passes its gate.

## Exact Next Step

Pull latest `main`, open `test-launcher.html` in SPCK Preview, tap **Open Arabic Game**, and check Wave 1 simplicity, Act II flanking/three-line warnings/links, and Act III orange movement warnings. Confirm the patterns are readable and fair rather than chaotic, then briefly check **Open English Game** and **Open Cell Runner**. Do not involve a fresh participant until this pass succeeds.
