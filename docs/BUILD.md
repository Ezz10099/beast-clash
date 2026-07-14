# Pixel Mage Release Build

## Purpose

The repository still contains the retired Beast Clash prototype for reference. It is not part of Pixel Mage and must never enter the Android package.

## Exact Runtime

`npm run build` creates a clean `dist/` directory containing only:

- `index.html`
- `style.css`
- `localization.css`
- `localization.js`
- `game.js`
- `build-manifest.json`

The manifest records the release version, byte count, and SHA-256 checksum of each runtime file.

- `game.js` is bundled with the small Capacitor App bridge for native pause and Android Back handling.
- `localization.js` is separately bundled and minified so Arabic test-readiness does not weaken the enforced runtime-size ceiling.
- English remains the default. Arabic activates only with `?lang=ar`.
- A clean Arabic cell combines parameters as `?fresh=<token>&lang=ar`.
- The localization runtime must not access saves or gameplay state.

The build contains no remote URLs, animal assets, or legacy Phaser code, so it loads entirely offline inside Capacitor.

## Verification

Run:

`npm run check`

This now runs:

- the persistent workflow integrity check;
- `npm run localization:check` for English preservation, Arabic/RTL activation, essential DOM/canvas translations, whitespace stability, and combined fresh-save semantics;
- the normal gameplay, choice, movement, balance, persistence, and stress checks;
- the deterministic release build and manifest checks;
- localization minification and the unchanged 100 KB runtime ceiling;
- Android artwork and native configuration checks.

Before a gameplay gate or commercial recommendation, also run:

`npm run evidence`

This executes the 8-build × 25-seed real-damage matrix, 100 real choice-policy runs, idle/simple-movement controls, deterministic replays, and starting-spell payoff checks. It writes `artifacts/evidence/evidence-report.json` and `.md`. GitHub Actions uploads those reports as `pixel-mage-evidence` when that workflow runs.

Generated evidence and `dist/` are intentionally excluded from Git; stable conclusions are recorded in `docs/EVIDENCE_LEDGER.md`.

Preview the exact release bundle with:

`npm run preview`

`dist/` is generated and intentionally excluded from Git. Capacitor consumes a freshly verified build rather than a manually maintained copy.
