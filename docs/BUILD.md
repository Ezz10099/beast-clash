# Pixel Mage Release Build

## Purpose

The repository still contains the retired Beast Clash prototype for reference. It is not part of Pixel Mage and must never enter the Android package.

## Exact Runtime

`npm run build` creates a clean `dist/` directory containing only:

- `index.html`
- `style.css`
- `game.js`
- `build-manifest.json`

The manifest records the release version, byte count, and SHA-256 checksum of each runtime file. `game.js` is bundled with the small Capacitor App bridge for native pause and Android Back handling. The build contains no remote URLs, animal assets, or legacy Phaser code, so it can load entirely offline inside Capacitor.

## Verification

Run:

`npm run check`

This validates controls and settings, all eight representative spell combinations, versioned save migration and boundary recovery, stress limits, and three seeded 12-wave clears. It then rebuilds `dist/`, verifies every checksum, regenerates Android artwork, validates native configuration, rejects unexpected bundle files, and enforces the runtime-size ceiling.

Preview the exact release bundle with:

`npm run preview`

`dist/` is generated and intentionally excluded from Git. Capacitor will consume a freshly verified build rather than a manually maintained copy.
