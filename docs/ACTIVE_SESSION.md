# Pixel Mage — Active Session State

## Role and Authority

This is the small mutable state that must stay active throughout a ChatGPT/Codex work session. It does not override the Product Compass, Owner Mandate, Development Model, durable decisions, or accepted evidence. When this file conflicts with newer authoritative evidence, reconcile and update it before continuing.

## Current State

- **Last updated:** July 14, 2026
- **Active repository/branch:** `Ezz10099/beast-clash` / `main`
- **Active product:** Pixel Mage
- **Current milestone:** Milestone 8 — Representative Commercial Gate
- **Current implementation:** `0.2.0-representative.9` gameplay plus Arabic readiness, the offline Fresh-Player Cell Runner, and a repository-only tap-first SPCK Test Launcher on `main`
- **Latest accepted phone behavior:** `.8` passed the consolidated SPCK check. The July 14 Arabic check did not execute because the owner reasonably entered the supplied query string into SPCK Console; SPCK treated it as JavaScript and raised `SyntaxError: Unexpected token '?'`. This is a failed test-workflow design, not evidence that Arabic mode or gameplay failed.
- **Latest automated evidence:** `.9` remained GREEN: 200 active build runs, 100 choice-policy runs, 0% idle wins, 100% simple-movement wins, 8/8 deterministic replays, 8/8 selectable starting spells, isolated fresh saves, and no runtime violation. Later localization, Cell Runner, and Test Launcher batches have isolated syntax/behavior contracts but not yet a complete clean-checkout run.
- **Current verification status:** Repository checks now enforce localization, fresh-save compatibility, offline Cell Runner behavior, token reuse rejection, staged question reveal, frozen GO rules, tap-only launcher navigation, release exclusion, localization minification, and the existing 100 KB bundle ceiling. Owner phone acceptance remains pending.
- **Strongest current fun/engagement limitation:** newcomer comprehension, pacing/fairness, climax satisfaction, and specific replay desire remain human-uncertain. The immediate blocker is now whether the owner-facing test workflow itself works naturally in SPCK.
- **Current approval boundary:** preserve `.8` gameplay and `.9` saves; do not change balance, progression, content, final assets, monetization, package identity, or release actions before the commercial gate.
- **Current commercial gate:** owner checks the tap-only launcher, Arabic game path, English comparison, and Cell Runner usability; then one genuinely fresh participant completes the frozen non-leading cell and the owner gives the second explicit go/no-go.
- **Current workflow goal:** obtain trustworthy human evidence through a phone workflow that requires visible taps only—no Console, manual query strings, hand-built tokens, terminal commands, or hidden controls.
- **Workflow implementation status:** persistent workflow, Arabic readiness, offline Cell Runner, and tap-only SPCK Test Launcher are implemented on `main`; owner phone evidence is pending.
- **Exact next product action:** owner pulls latest `main`, opens `test-launcher.html` in SPCK Preview, taps `Open Arabic Game`, returns and taps `Open English Game`, then returns and taps `Open Cell Runner`. Report only incorrect Arabic, clipping/overlap, changed behavior, or launcher/runner usability problems.

## Response Watchlist

Every work-related response must preserve these points:

- Pixel Mage continuity is the default.
- A worthwhile game—not merely a completed build—is the final goal.
- Fun and engagement potential remain primary design concerns.
- The strongest limitation must guide priority.
- Automated evidence must not be presented as proof of human enjoyment or comprehension.
- Exact mechanics and old content caps remain revisable when a stronger route serves the same Product Compass.
- Full launch scaling remains blocked at the current gate.
- The owner should not have to diagnose every problem or invent every solution.
- The owner checks are localization/tooling checks, not the genuine commercial cell.
- Test requests must begin from a named SPCK file or screen and use a visible tap path.
- Never ask the owner to enter query strings into Console, edit URLs manually, construct tokens, use DevTools, or modify source when a bounded interface can do it.
- The Test Launcher and Cell Runner are repository-only tools, not gameplay evidence and not part of the Android release bundle.

## Current Work Packet

- **Status:** Implementation complete; owner phone evidence pending.
- **Player-facing problem:** The game could be ready for a valid Arabic cell while the owner cannot reliably reach that path in SPCK. Hidden query parameters and ambiguous instructions made the test workflow itself fail before the game was tested.
- **Intended player experience served:** The owner should reach clean Arabic, clean English, and observer-tool checks through obvious touch-sized buttons; the participant should encounter only the intended game and neutral instruction.
- **Strongest known cause:** The previous implementation exposed technically correct query parameters but provided no visible SPCK route. The instruction did not distinguish a browser address field from SPCK Console, where the string is invalid JavaScript.
- **Alternatives considered:** more detailed URL instructions still relied on hidden UI knowledge; adding permanent debug controls to the production game polluted release scope; a repository-only tap-first launcher was selected.
- **Selected approach:** Added `test-launcher.html`, `test-launcher.css`, and `test-launcher.js`. It automatically creates unique clean English/Arabic owner-check URLs and opens `cell-runner.html`. Added a permanent Owner Phone Workflow Gate to `docs/CHATGPT_WORKFLOW.md`, enforced by `npm run workflow:check` and `npm run launcher:check`.
- **Predicted visible benefit:** The owner can perform all pending checks by opening one file and tapping three labeled buttons, without understanding URL parameters or developer tools.
- **Likely failure mode:** SPCK may handle same-tab navigation or Android Back unexpectedly, a launcher button may clip, or repository preview may not resolve sibling files correctly.
- **Evidence obtained:** static and headless launcher contracts cover touch-sized layout, automatic unique tokens, correct Arabic/English parameters, direct Cell Runner navigation, no external resources, no telemetry, and exclusion from the release whitelist.
- **Evidence still required:** normal clean-checkout `npm run check` and one consolidated owner SPCK pass of the launcher, Arabic path, English path, and Cell Runner.
- **Files/systems changed:** `test-launcher.html`, `test-launcher.css`, `test-launcher.js`, `scripts/check-test-launcher.mjs`, package scripts, `docs/CHATGPT_WORKFLOW.md`, workflow integrity checks, agent guidance, active state, handoff, roadmap, README, and fresh-player instructions. Production `game.js` and the release whitelist remain unchanged.
- **Approval boundary:** Test-access and execution workflow only. No gameplay, balance, progression, persistence, content scaling, production telemetry, final art, monetization, identity, or release action changes.

## Session Update Log

### July 14, 2026 — Tap-Only SPCK Testing Rule

- Recorded the owner screenshot as evidence that a technically valid hidden query path was not a usable SPCK workflow.
- Replaced manual URL/query instructions with `test-launcher.html` and three visible buttons.
- Automated clean Arabic/English token generation and direct Cell Runner navigation.
- Added the permanent Owner Phone Workflow Gate: exact file, exact buttons, visible tap path, no Console/query/token/source-edit requirements when a UI is feasible.
- Added deterministic launcher checks and included them in `npm run check`.
- Preserved production runtime, gameplay, save behavior, and release bundle exclusion.

### July 14, 2026 — Offline Cell Runner Completed

- Added a phone-first repository-only runner for the complete fresh-player protocol.
- Added unique English/Arabic link generation and local used-token rejection.
- Kept the interview hidden until play observation ends.
- Added timing, complete observations, exact questions, gate review, unnamed local draft recovery, and Markdown export.
- Prevented a partial `GO candidate` from being exported.

### July 14, 2026 — Arabic Fresh-Cell Readiness Completed

- Added explicit Arabic activation and RTL presentation without changing default English.
- Translated essential static, dynamic, and canvas language for the representative journey.
- Preserved `?fresh=` isolation when combined with Arabic mode.

### July 14, 2026 — Persistence Workflow Integration

- Implemented permanent authority, mutable active state, a mandatory per-response gate, visible work state, work packets, interruption recovery, and automated workflow integrity checks.
