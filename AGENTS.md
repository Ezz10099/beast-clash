# Pixel Mage Agent Guide

## Active Product

Pixel Mage is the only active game in this repository. The release contract in `docs/RELEASE_SCOPE.md` is authoritative until the first Google Play test release.

## User Workflow

- ChatGPT/Codex edits the GitHub repository.
- The user pulls changes with SPCK Editor on Android and tests through SPCK preview.
- The primary target is a 20:9 portrait POCO X2-class phone.
- Preserve top and bottom safe areas and obvious touch controls.

## Active Runtime Files

- `index.html`
- `style.css`
- `game.js`

The old `src/`, animal assets, and `phaser.min.js` belong to the previous Beast Clash prototype and are not loaded by the active game. Do not reactivate or extend them.

## Scope Rules

- Keep the five-wave run, one mage, slime family, one boss, and between-wave upgrades.
- Do not change engine or add characters, worlds, story, equipment, shops, quests, gacha, or a larger progression system.
- Prefer code-drawn visuals and small, testable changes that do not require a desktop editor.
- New ideas belong after the Google Play testing gate.

## Verification

Run before every stable commit:

`npm run check`

For browser preview:

`npm run preview`

Then test movement, firing, upgrade selection, victory, defeat, restart, and phone fit in SPCK.
