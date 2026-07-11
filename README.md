# Pixel Mage

A tiny mobile-first pixel-action game being finished as the owner's first Google Play release candidate.

This repo is intentionally simple for SPCK Editor on Android.

## Goal

Finish, test, package, and publish one small game before returning to a larger project.

## Current Scope

Locked launch scope:

- One five-wave run lasting roughly five minutes.
- One player mage.
- Reused slime enemies with escalating health and speed.
- One final slime boss.
- One upgrade choice between waves.
- Score and locally saved best score.
- Touch controls.
- Keyboard controls.
- Win state.
- Lose state.
- Pixel-art visuals drawn in code.

Explicitly excluded:

- Shop.
- Gacha.
- Level map.
- Multiple characters.
- Big story.
- Asset pipeline.
- Equipment, inventory, quests, or multiple worlds.

## How to run in SPCK Editor

1. Clone this repo in SPCK:

   `https://github.com/Ezz10099/beast-clash.git`

2. Open:

   `index.html`

3. Start the SPCK preview / local server.

No Phaser file is needed anymore.

## Controls

Mobile:

- D-pad buttons: move.
- Fire button: cast spell.
- Restart button: restart.

Laptop:

- WASD / Arrow keys: move.
- Space: cast spell / start.
- Enter: start.

## Definition of Done

The first release is considered finished when:

- The player can start the game.
- The player can move and cast spells.
- Five escalating waves and the boss can be completed.
- Upgrade choices noticeably change the run.
- The player can win or lose.
- Score and best score work reliably.
- Sound, haptics, pause, and settings are present.
- The game is packaged, device-tested, and accepted into Google Play testing.

## Rule

Do not add a new character, mode, world, story, or progression system before this release is published.

Project authority:

- `docs/RELEASE_SCOPE.md` — locked completion contract.
- `docs/ROADMAP.md` — roadmap to the first Capacitor APK.
- `docs/SESSION_HANDOFF.md` — current status and next-session entry point.
