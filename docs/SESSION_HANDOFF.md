# Pixel Mage — Current Session Handoff

## Current Authority

- Repository/branch: `Ezz10099/beast-clash` / `main`
- Product: Pixel Mage
- Entry point: `docs/START_HERE.md`
- Live state: `docs/ACTIVE_SESSION.md`
- Workflow: `docs/CHATGPT_WORKFLOW.md`
- Fresh-player gate: `docs/FRESH_PLAYER_CELL.md`
- Owner test entry: `test-launcher.html`
- Observer tool: `cell-runner.html`

## Current Milestone

**Milestone 8 — Representative Commercial Gate.**

Living Spell Trials remains the evidence-supported direction. Full content, final assets, monetization, signing, and Play submission remain blocked until the valid fresh-player result and owner second go/no-go.

## Accepted Evidence

- `.8` passed owner SPCK review for compact choices, active rune dodging, proven-spell selection, and starting-spell payoff.
- `.9` remained GREEN: 200 active runs, 100 choice-policy runs, 0% idle wins, 100% simple-movement wins, 8/8 deterministic replays, 8/8 starting-spell checks, isolated fresh saves, and no runtime violation.
- Arabic readiness, the Cell Runner, and the tap-only Test Launcher are implemented but still await consolidated phone acceptance.
- The owner’s latest phone observation identified a real control problem: the fingertip directly covered the mage and nearby threats while moving.

## Touch-Occlusion Correction

Implemented on `main`:

- Added `touch-controls.js` before `game.js`.
- Non-mouse pointer targets shift upward by 56 canvas pixels, scaled to the displayed canvas.
- Mouse input remains exact.
- Added visible English and Arabic guidance that the mage stays above the thumb.
- Added `npm run controls:check` inside `npm run check`.
- Added release-bundle checks for load order, clearance value, offline behavior, and no direct save/game-state access.
- Added `touch-controls.js` to the production release whitelist.
- Left `game.js`, movement speed, combat, balance, progression, and saves unchanged.

The selected correction is deliberately smaller than a virtual joystick or full relative-drag redesign. Its remaining uncertainty is phone feel: the 56-pixel clearance may be correct, too small, or too large.

## Verification Status

Passed in an isolated Node behavior harness:

- touch input receives the scaled upward offset;
- `preventDefault()` remains functional;
- mouse coordinates remain unchanged;
- the control script is offline and telemetry-free;
- bilingual guidance and release inclusion are enforced.

A complete clean-checkout `npm run check` could not run because the assistant environment could not resolve GitHub. Do not call the touch correction phone-accepted yet.

## Exact Next Action

1. Pull latest `main` in SPCK.
2. Open `test-launcher.html` and tap **Preview**.
3. Tap **Open Arabic Game**.
4. During Wave 1, drag from the lower half of the arena and confirm:
   - the mage remains clearly above the thumb;
   - red runes and nearby enemies stay visible;
   - steering still feels immediate;
   - reaching left, right, upward, and near the bottom remains comfortable.
5. Continue the Arabic/layout check, then use **Open English Game** and **Open Cell Runner** as previously listed.

Report only whether the clearance feels **right**, **too small**, or **too large**, plus any remaining visible bug.

Do not involve the genuine fresh participant until the owner checks pass. Do not scale content before the commercial decision.