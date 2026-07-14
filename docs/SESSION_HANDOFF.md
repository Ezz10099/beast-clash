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
- The owner identified fingertip occlusion and then judged the first 56-canvas-pixel clearance as **too small**.

## Touch-Occlusion Correction

Implemented on `main`:

- `touch-controls.js` loads before `game.js`.
- Non-mouse touch targets now shift upward by **84 canvas pixels**, scaled to the displayed canvas.
- Mouse input remains exact.
- English and Arabic guidance explains that the mage stays above the thumb.
- `npm run controls:check` and release checks enforce the calibrated value.
- `game.js`, movement speed, combat, balance, progression, and saves remain unchanged.

The remaining uncertainty is phone feel: whether 84 pixels is enough without feeling disconnected.

## Verification Status

Static/headless checks verify scaled touch adjustment, unchanged mouse input, `preventDefault()`, offline operation, release inclusion, and no direct save/game-state access.

A complete clean-checkout `npm run check` could not run in the assistant environment. Do not call the recalibration phone-accepted yet.

## Exact Next Action

1. Pull latest `main` in SPCK.
2. Open `test-launcher.html` → **Preview**.
3. Tap **Open Arabic Game**.
4. Drag during Wave 1 and judge whether the mage stays visible while steering remains natural.

Report whether it now feels **right**, **still too small**, or **too large**, plus any visible bug.

Do not involve the genuine fresh participant until the owner checks pass. Do not scale content before the commercial decision.
