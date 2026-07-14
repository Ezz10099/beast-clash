# Pixel Mage — Current Session Handoff

## Current Authority

- Repository/branch: `Ezz10099/beast-clash` / `main`
- Product: Pixel Mage
- Entry point: `docs/START_HERE.md`
- Live state: `docs/ACTIVE_SESSION.md`
- Workflow: `docs/CHATGPT_WORKFLOW.md`
- Arabic terminology: `docs/ARABIC_GLOSSARY.md`
- Fresh-player gate: `docs/FRESH_PLAYER_CELL.md`
- Owner test entry: `test-launcher.html`
- Observer tool: `cell-runner.html`

## Current Milestone

**Milestone 8 — Representative Commercial Gate.**

Living Spell Trials remains the evidence-supported direction. Full content, final assets, monetization, signing, and Play submission remain blocked until the valid fresh-player result and owner second go/no-go.

## Accepted Evidence

- `.8` passed owner SPCK review for compact choices, active rune dodging, proven-spell selection, and starting-spell payoff.
- `.9` remained GREEN: 200 active runs, 100 choice-policy runs, 0% idle wins, 100% simple-movement wins, 8/8 starting-spell checks, isolated fresh saves, and no runtime violation.
- The owner confirmed the test tools appear, rejected 56-pixel thumb clearance, and accepted 84 pixels enough to continue.
- Arabic activation worked, but the owner identified incorrect wording; the full glossary correction was then implemented.
- The owner subsequently judged the gameplay layout itself problematic and requested one substantial improvement batch.

## Portrait Gameplay Layout Rebuild

Implemented on `main` without changing `game.js`, the 320×480 arena coordinates, combat, movement speed, balance, progression, content, or saves:

- replaced the accumulated header/canvas/readout/HUD/detached-meter/hint stack with one coherent portrait composition;
- added a compact branded header and consistently reachable Options button;
- made the unchanged arena the dominant visual surface with reduced framing;
- created one combat dashboard containing the current spell, health, wave progress, score, and control feedback;
- attached the five-part health meter directly to health and the 12-part progress meter directly to wave status;
- removed the detached unlabeled meter row;
- added visible-panel DOM state tracking so the dashboard appears during active play and stays hidden behind start, rewrite, Spellbook, and Options overlays;
- rebuilt all overlays around one fluid, scroll-safe hierarchy with larger critical text and consistent English/Arabic behavior;
- replaced extreme tiny-text breakpoints with height-aware whole-frame scaling;
- aligned the rebuilt dashboard and card direction for Arabic;
- strengthened `polish:check` and release checks for the exact hierarchy, panel-state transitions, attached meters, offline boundary, and bundle inclusion.

## Existing Readiness Layers Preserved

- corrected Arabic glossary and player-facing wording;
- offline Cell Runner and tap-only Test Launcher;
- 84-pixel thumb clearance;
- low-health emphasis and two-tap restart protection;
- portrait guidance, focus/disabled states, fully local runtime, and minified release assets.

## Verification Status

Passed in an isolated JavaScript behavior harness:

- `phone-polish.js` syntax;
- health and wave meter generation;
- start → playing → menu screen-state priority;
- first-tap restart blocking.

Repository contracts now cover the new DOM hierarchy, attached meters, dashboard visibility rules, Arabic alignment, responsive overlays, release ordering, minification, and the 100 KB ceiling. A complete clean-checkout `npm run check` still could not run because the assistant environment cannot resolve GitHub. The layout is not phone-accepted until the owner checks it in SPCK.

## Exact Next Action

1. Pull latest `main` in SPCK.
2. Open `test-launcher.html` → **Preview** → **Open Arabic Game**.
3. Check the header and arena on the opening screen.
4. Start a Trial and check the unified spell/HUD dashboard and attached HP/wave bars.
5. Reach one rewrite, open the Spellbook, and open Options; confirm each overlay fits and the dashboard stays out of the way.
6. Briefly check **Open English Game** and **Open Cell Runner**.
7. Report any remaining layout problem with a screenshot.

Do not involve the genuine fresh participant until this owner visual pass succeeds. Do not scale content before the commercial decision.
