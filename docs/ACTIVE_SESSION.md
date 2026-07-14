# Pixel Mage — Active Session State

## Role and Authority

This mutable state must remain active throughout a ChatGPT/Codex work session. It cannot override the Product Compass, Owner Mandate, Development Model, durable decisions, or accepted evidence.

## Current State

- **Last updated:** July 14, 2026
- **Active repository/branch:** `Ezz10099/beast-clash` / `main`
- **Active product:** Pixel Mage
- **Current milestone:** Milestone 8 — Representative Commercial Gate
- **Current implementation:** `0.2.0-representative.9` gameplay plus corrected Arabic/RTL wording, Cell Runner, tap-only Test Launcher, 84-pixel thumb clearance, and the rebuilt portrait gameplay layout on `main`
- **Latest accepted phone behavior:** `.8` passed. The owner confirmed later readiness edits appear, accepted 84-pixel clearance enough to continue, and identified the previous gameplay layout as still problematic. The new layout is not yet phone-accepted.
- **Latest automated evidence:** `.9` remained GREEN. The portrait layout passes isolated JavaScript behavior checks and strengthened source/build contracts; full clean-checkout `npm run check` remains unavailable in this environment.
- **Current verification status:** the page now has one compact header, dominant unchanged arena, unified combat dashboard, attached health/wave meters, screen-aware dashboard visibility, and one responsive overlay system. Phone visual quality remains pending.
- **Strongest current fun/engagement limitation:** confirm that the new hierarchy feels clean and readable on the target phone before a fresh participant judges the game.
- **Current approval boundary:** preserve gameplay, balance, progression, saves, content, package identity, and launch scope.
- **Current commercial gate:** owner checks the rebuilt layout, corrected Arabic, English comparison, and Cell Runner; then one genuinely fresh participant completes the frozen cell.
- **Current workflow goal:** obtain trustworthy fresh-player evidence from a coherent, owner-approved phone presentation.
- **Workflow implementation status:** portrait gameplay layout rebuild is complete on `main`; owner phone evidence is pending.
- **Exact next product action:** owner pulls latest `main`, opens `test-launcher.html` → **Preview** → **Open Arabic Game**, checks the opening, active dashboard, rewrite, Spellbook, and Options layouts, then briefly confirms English and Cell Runner still work.

## Response Watchlist

- Pixel Mage continuity and a worthwhile finished game remain primary.
- Do not present static checks as proof of phone visual quality.
- Full launch scaling remains blocked.
- Phone requests must use exact visible SPCK tap paths.
- Arabic must follow `docs/ARABIC_GLOSSARY.md`.
- Do not involve a genuine participant until the owner visual pass succeeds.

## Current Work Packet

- **Status:** Implementation complete; owner phone evidence pending.
- **Player-facing problem:** the canvas, title, spell readout, text stats, detached meter row, and control hint competed for space and did not read as one intentional portrait interface. Height breakpoints also shrank critical text too aggressively.
- **Intended player experience:** the arena is the visual focus; Options is immediately reachable; spell, health, wave progress, score, and control feedback form one compact dashboard; overlays remain readable without clipping in English or Arabic.
- **Strongest known causes:** detached unlabeled meters; excessive framing/padding; tiny breakpoint typography; inconsistent card hierarchy; overlays accumulated across separate patches.
- **Alternatives considered:** another small CSS patch would preserve fragmentation; changing canvas aspect ratio would affect mechanics and touch mapping; a full art redesign exceeded the gate. A markup-and-CSS composition rebuild around the unchanged 320×480 arena was selected.
- **Selected approach:** compact header; dominant arena; unified combat deck; meters attached to labels; fluid type and spacing; one scroll-safe overlay system; DOM screen-state tracking without private game-state access.
- **Predicted visible benefit:** faster parsing, less clutter, more arena presence, clearer survival/progress status, and a more credible app-like presentation.
- **Likely failure mode:** the combat deck may still feel too tall or overlay cards may remain dense on the target phone.
- **Evidence obtained:** `phone-polish.js` syntax and isolated behavior passed for meter generation, start/playing/menu state priority, and restart blocking. Static/release contracts cover the new hierarchy, attached meters, responsive overlays, Arabic alignment, offline boundaries, ordering, minification, and size ceiling.
- **Evidence still required:** one consolidated owner SPCK visual pass and a complete clean-checkout `npm run check`.
- **Files/systems changed:** `index.html`, `phone-polish.css`, `phone-polish.js`, `localization.css`, polish/build checks, README, build guide, roadmap, active state, and handoff. `game.js` is unchanged.
- **Approval boundary:** presentation and layout only.

## Session Update Log

### July 14, 2026 — Portrait Gameplay Layout Rebuild Completed

- Replaced the fragmented screen stack with a compact header, dominant arena, and unified combat dashboard.
- Attached health and wave meters to their labels and removed the detached meter row.
- Added screen-aware dashboard visibility for start, play, rewrite, Spellbook, and Options states.
- Rebuilt overlays with fluid critical text and responsive scroll-safe spacing.
- Aligned Arabic dashboard/card direction and strengthened polish/release checks.
- Preserved `game.js`, arena coordinates, gameplay, balance, progression, and saves.

### July 14, 2026 — Arabic Wording and Glossary Completed

- Standardized the full Arabic game vocabulary and corrected direct/dynamic wording.

### July 14, 2026 — Thumb Clearance Recalibrated

- Recorded 56 pixels as too small and increased clearance to 84 canvas pixels.
