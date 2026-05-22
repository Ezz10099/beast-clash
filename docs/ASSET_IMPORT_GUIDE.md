# Sprite Asset Import Guide (Animal PNGs)

## Folder path
Place all animal PNG files in:

`assets/sprites/animals/`

## Required file names
Use these exact file names (lowercase):

- `gorilla.png`
- `tiger.png`
- `snake.png`
- `rhino.png`
- `crocodile.png`
- `eagle.png`

## Format requirements
- PNG format only.
- Use transparent background (alpha).
- Keep each animal centered with clean margins.

## Recommended size
- Recommended source size: around **512x512 px** per animal.
- Keep all sprites at similar canvas size for consistent in-battle scaling.

## Facing direction
- Draw animals in side view facing **right** by default.
- In battle:
  - Player team uses right-facing sprites.
  - Enemy team is auto-flipped to face left.

## Fallback safety (important)
If a PNG is missing or fails to load, Beast Clash automatically falls back to the existing Phaser shape animal. The game should continue working without black screens.

## How to test in SPCK (Android)
1. Open your project in **SPCK Editor**.
2. Create folder: `assets/sprites/animals/`.
3. Add the 6 PNG files with exact names listed above.
4. Run/preview the app from SPCK.
5. Start flow: **BootScene → TeamPreviewScene → BattleScene**.
6. Verify:
   - Animals render as PNGs when files exist.
   - Missing files fall back to shape animals.
   - HP bars, names, and status text stay aligned.
   - Ultimate buttons still work.
   - Win goes to RewardsScene.
   - Defeat retry restarts battle.
