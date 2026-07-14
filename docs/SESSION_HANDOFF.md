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
- Arabic activation worked, but the owner identified incorrect wording; the full glossary correction was implemented.
- The owner judged the accumulated gameplay layout problematic, then requested another substantial improvement before involving a fresh participant.

## Portrait Gameplay Layout Rebuild

Implemented on `main` without changing `game.js`, the 320×480 arena coordinates, combat, movement speed, balance, progression, content, or saves:

- compact branded header and dominant arena;
- one combat dashboard containing spell, health, wave progress, score, and control feedback;
- health and wave meters attached directly to their labels;
- visible-panel DOM state tracking so the dashboard stays behind start, rewrite, Spellbook, and Options overlays;
- one fluid, scroll-safe English/Arabic overlay hierarchy;
- height-aware whole-frame scaling instead of unreadably small breakpoint text;
- strengthened `polish:check` and release contracts.

## Arena Feedback and Atmosphere Batch

Implemented on `main` without changing `game.js`, combat timing, damage, movement, balance, progression, content, or saves:

- added `arena-fx.js` and `arena-fx.css` as a pointer-transparent 320×480 overlay above the existing game canvas;
- added distinct low-opacity ambience for Acts I, II, and III;
- tied arena edge identity to displayed Ember/Frost spell text;
- added a short fading trail for the adjusted touch target;
- added wave-entry border pulses from displayed wave text;
- added damage and critical-health edge feedback from displayed health text;
- added automatic reduced-motion behavior;
- used lightweight 90 ms HUD sampling rather than mutation callbacks on text rewritten every frame;
- added `npm run fx:check`, release inclusion, minification, offline/read-only checks, and 100 KB ceiling coverage.

The new layer reads only `healthText`, `waveText`, `spellText`, public pointer events, and `game-card[data-screen]`. It has `pointer-events: none` and cannot access saves or private game state.

## Existing Readiness Layers Preserved

- corrected Arabic glossary and player-facing wording;
- offline Cell Runner and tap-only Test Launcher;
- 84-pixel thumb clearance;
- low-health emphasis and two-tap restart protection;
- portrait guidance, focus/disabled states, fully local runtime, and minified release assets.

## Verification Status

Repository contracts cover:

- arena-FX dimensions, DOM and script order, pointer transparency, active-play scoping, and reduced-motion behavior;
- English/Arabic health, wave, act, and essence parsing;
- presence of touch trail, wave pulse, damage feedback, and act ambience;
- absence of network calls, storage access, telemetry, and private-state access;
- release inclusion, minification, ordering, and the 100 KB ceiling;
- unchanged gameplay file and existing layout/localization/control checks.

A complete clean-checkout `npm run check` could not run because the assistant environment cannot resolve GitHub. The layout and effects are not phone-accepted until the owner checks them in SPCK.

## Exact Next Action

1. Pull latest `main` in SPCK.
2. Open `test-launcher.html` → **Preview** → **Open Arabic Game**.
3. Start a Trial and check the arena atmosphere, touch trail, wave-entry pulse, damage-edge feedback, dashboard, and enemy/projectile/rune readability.
4. Reach Act II or III if practical and confirm the atmosphere changes without becoming distracting.
5. Reach one rewrite, open Spellbook, and open Options; confirm effects remain behind overlays and nothing clips.
6. Briefly check **Open English Game** and **Open Cell Runner**.
7. Report any remaining problem with a screenshot.

Do not involve the genuine fresh participant until this owner visual pass succeeds. Do not scale content before the commercial decision.
