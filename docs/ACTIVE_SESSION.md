# Pixel Mage — Active Session State

## Role and Authority

This mutable state must remain active throughout a ChatGPT/Codex work session. It cannot override the Product Compass, Owner Mandate, Development Model, durable decisions, or accepted evidence.

## Current State

- **Last updated:** July 14, 2026
- **Active repository/branch:** `Ezz10099/beast-clash` / `main`
- **Active product:** Pixel Mage
- **Current milestone:** Milestone 8 — Representative Commercial Gate
- **Current implementation:** `0.2.0-representative.9` gameplay plus corrected Arabic/RTL wording, Cell Runner, tap-only Test Launcher, 84-pixel thumb clearance, and the rebuilt portrait gameplay layout on `main`
- **Latest accepted phone behavior:** `.8` passed. The owner confirmed later readiness edits appear, accepted 84-pixel clearance enough to continue, identified the prior layout as problematic, and requested another substantial improvement before the fresh-player cell. The rebuilt layout is not yet phone-accepted.
- **Latest automated evidence:** `.9` remained GREEN. Later localization/control/layout layers have isolated contracts; full clean-checkout `npm run check` remains unavailable in this environment.
- **Current verification status:** page hierarchy is rebuilt, but the arena itself still relies on the original flat background and minimal feedback. The next batch is a presentation-only arena layer.
- **Strongest current fun/engagement limitation:** combat may be mechanically readable yet still feel visually flat, weakly responsive, and insufficiently differentiated across acts and spell essences.
- **Current approval boundary:** combat presentation, visual feedback, responsive overlay behavior, and release-safe polish only; preserve combat rules, timing, balance, progression, saves, content, package identity, and launch scope.
- **Current commercial gate:** owner checks the rebuilt layout, combat presentation, corrected Arabic, English comparison, and Cell Runner; then one genuinely fresh participant completes the frozen cell.
- **Current workflow goal:** make active play feel clearer, more responsive, and more distinctive without contaminating gameplay evidence through balance changes.
- **Workflow implementation status:** arena feedback and atmosphere batch is in progress.
- **Exact next product action:** add one read-only arena-FX layer driven only by displayed HUD text and pointer events, integrate it into the offline release, strengthen deterministic contracts, and request one consolidated SPCK pass.

## Response Watchlist

- Pixel Mage continuity and a worthwhile finished game remain primary.
- Do not present static checks as proof of phone visual quality or experienced fun.
- Full launch scaling remains blocked.
- Phone requests must use exact visible SPCK tap paths.
- Arabic must follow `docs/ARABIC_GLOSSARY.md`.
- The arena-FX layer must not access saves or private game state and must not intercept controls.
- Do not involve a genuine participant until the owner visual pass succeeds.

## Current Work Packet

- **Status:** diagnosis complete; implementation in progress.
- **Player-facing problem:** the arena has limited atmosphere, weak act differentiation, minimal connection between the current spell and the playfield, no persistent visual indication of touch motion, and feedback concentrated inside small pixel effects.
- **Intended player experience:** the arena remains easy to read while feeling alive; each act has a distinct atmosphere; Ember and Frost visibly tint the surrounding magic; dragging leaves a short non-obstructive trail; wave changes and damage register immediately at the edge of vision.
- **Strongest known causes:** one static arena treatment; no presentation layer outside private gameplay rendering; touch feedback disappears quickly; displayed HUD changes are not used to reinforce the playfield.
- **Alternatives considered:** modifying combat entities or timings would invalidate the frozen gate; rewriting the core renderer would create unnecessary regression risk; another CSS-only frame change would not improve active-play response. A separate pointer-transparent overlay canvas driven by public DOM text was selected.
- **Selected approach:** add `arena-fx.js` and `arena-fx.css`; render subtle act ambience, spell-essence edge glow, short touch trail, wave-entry pulse, damage vignette, and critical-health warning; observe only `healthText`, `waveText`, and `spellText`; preserve the underlying 320×480 canvas and all input.
- **Predicted visible benefit:** stronger moment-to-moment response, clearer act escalation, better spell identity, easier touch tracking, and a more polished mobile-game feel.
- **Likely failure mode:** effects may feel too busy, too dim, or may scale incorrectly on SPCK; reduced-motion and visibility safeguards are required.
- **Evidence required:** syntax and isolated parser/state tests, pointer-events and offline boundaries, release inclusion/minification/size checks, then one owner SPCK visual pass.
- **Files/systems expected to change:** `index.html`, new `arena-fx.js`/`.css`, release config/build checks/package scripts, README/build docs, roadmap, active state, and handoff. `game.js` remains unchanged.
- **Approval boundary:** presentation only.

## Session Update Log

### July 14, 2026 — Arena Feedback and Atmosphere Batch Started

- Recorded the owner's request for another substantial improvement.
- Selected combat readability and impact as the strongest next bounded improvement.
- Chose a separate read-only overlay to avoid changing mechanics, balance, saves, or the accepted renderer.

### July 14, 2026 — Portrait Gameplay Layout Rebuild Completed

- Replaced the fragmented screen stack with a compact header, dominant arena, and unified combat dashboard.
- Attached health and wave meters to their labels and added screen-aware dashboard visibility.

### July 14, 2026 — Arabic Wording and Glossary Completed

- Standardized the full Arabic game vocabulary and corrected direct/dynamic wording.

### July 14, 2026 — Thumb Clearance Recalibrated

- Recorded 56 pixels as too small and increased clearance to 84 canvas pixels.
