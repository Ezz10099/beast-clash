# Pixel Mage — Active Session State

## Role and Authority

This is the small mutable state that must stay active throughout a ChatGPT/Codex work session. It does not override the Product Compass, Owner Mandate, Development Model, durable decisions, or accepted evidence. When this file conflicts with newer authoritative evidence, reconcile and update it before continuing.

## Current State

- **Last updated:** July 14, 2026
- **Active repository/branch:** `Ezz10099/beast-clash` / `main`
- **Active product:** Pixel Mage
- **Current milestone:** Milestone 8 — Representative Commercial Gate
- **Current implementation:** `0.2.0-representative.9` gameplay plus query-activated Arabic readiness and a repository-only offline Fresh-Player Cell Runner on `main`
- **Latest accepted phone behavior:** `.8` passed the consolidated SPCK check: the owner dodged a red Trial rune, proved a spell, selected it, and began the next Trial with that spell equipped.
- **Latest automated evidence:** `.9` remained GREEN: 200 active build runs, 100 choice-policy runs, 0% idle wins, 100% simple-movement wins, 8/8 deterministic replays, 8/8 selectable starting spells, isolated fresh saves, and no runtime violation. The later test-readiness/tooling batches have isolated syntax and behavior checks but not yet a complete clean-checkout run.
- **Current verification status:** Arabic and Cell Runner source syntax and isolated behavior passed. Normal checks now enforce localization, fresh-save compatibility, offline runner behavior, token reuse rejection, stage gating, frozen questions/GO rules, release exclusion, localization minification, and the existing 100 KB bundle ceiling. Full clean-checkout `npm run check` and target-phone checks remain pending because this assistant environment could not clone GitHub.
- **Strongest current fun/engagement limitation:** newcomer comprehension, experienced pacing/fairness, climax satisfaction, and specific replay desire remain human-uncertain. Language access and cell execution are prepared but not phone-accepted.
- **Current approval boundary:** preserve `.8` gameplay and `.9` saves; do not change balance, progression, content, final assets, monetization, package identity, or release actions before the commercial gate.
- **Current commercial gate:** owner checks Arabic meaning/layout and Cell Runner usability, then one genuinely fresh participant completes the frozen non-leading cell and the owner gives the second explicit go/no-go.
- **Current workflow goal:** obtain trustworthy human evidence without English vocabulary, coaching, reused saves, early question reveal, or incomplete result records contaminating the result.
- **Workflow implementation status:** persistent workflow, Arabic readiness, and the offline cell-runner batch are complete on `main`; owner phone evidence is pending.
- **Exact next product action:** owner pulls latest `main`, checks `?fresh=owner-ar-check&lang=ar`, then opens `cell-runner.html` and walks through its complete staged flow with dummy answers. If both pass, reset the runner and use a different generated token for the genuine participant.

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
- The two owner checks are localization/tooling checks, not the genuine commercial cell.
- The Cell Runner is an observation and recording tool, not gameplay evidence and not part of the Android release bundle.

## Current Work Packet

- **Status:** Implementation complete; owner phone evidence pending.
- **Player-facing problem:** The fresh-player cell could be invalidated by reused tokens, accidental coaching, revealing interview questions during play, incomplete observations, or an inconsistent result record—even when the game itself is ready.
- **Intended player experience served:** A genuinely fresh player encounters only the game and one neutral instruction, while the owner can silently capture the full journey and preserve exact post-play answers for an evidence-based decision.
- **Strongest known cause:** The protocol existed as a document. On a phone, the owner had to manually construct URLs, remember sequencing, time the attempt, hide later questions, and assemble the final record.
- **Alternatives considered:** document-only execution retained too much error risk; analytics/telemetry added privacy and product scope; in-game observer controls risked contaminating the participant; a separate offline runner was selected.
- **Selected approach:** Added `cell-runner.html`, `cell-runner.css`, and `cell-runner.js`, excluded from `dist/`. The runner generates valid fresh tokens, supports English/Arabic paths, shows only the neutral instruction before play, keeps interview questions hidden until observation closes, autosaves locally, and exports a complete Markdown record.
- **Predicted visible benefit:** The owner can conduct the cell from one phone with fewer protocol mistakes and return a complete, structured record suitable for prediction calibration and the second go/no-go.
- **Likely failure mode:** The tool may still feel too complicated on phone, a control may clip, local browser behavior may block copy/open actions, or the observer may still coach despite the guardrails.
- **Evidence obtained:** isolated source syntax, static contract, and headless behavior checks passed for mobile/offline structure, English/Arabic URL generation, reused-token rejection, hidden interview, full five-stage flow, eight exact questions, partial-GO rejection, local draft behavior, and Markdown export.
- **Evidence still required:** normal clean-checkout `npm run check` and one consolidated owner SPCK usability check of the runner, alongside the Arabic game check.
- **Files/systems changed:** `cell-runner.html`, `cell-runner.css`, `cell-runner.js`, `scripts/headless-cell-runner.mjs`, `scripts/check-cell-runner.mjs`, package scripts, the fresh-player protocol, build contract, active state, handoff, and roadmap. Production `game.js` and the release whitelist are unchanged.
- **Approval boundary:** Test-execution tooling only. No gameplay, balance, progression, persistence, content scaling, production telemetry, final art, monetization, identity, or release action changes.

## Session Update Log

### July 14, 2026 — Offline Cell Runner Completed

- Added a phone-first repository-only runner for the complete fresh-player protocol.
- Added unique English/Arabic link generation and local used-token rejection.
- Kept the interview hidden until play observation ends.
- Added timing, complete observations, exact questions, gate review, unnamed local draft recovery, and Markdown export.
- Prevented a partial `GO candidate` from being exported.
- Added deterministic static and headless workflow checks through `npm run cell:check` inside `npm run check`.
- Preserved privacy, no-network operation, production runtime exclusion, and the existing commercial gate.

### July 14, 2026 — Arabic Fresh-Cell Readiness Completed

- Added explicit Arabic activation and RTL presentation without changing default English.
- Translated essential static, dynamic, and canvas language for the representative journey.
- Preserved `?fresh=` isolation when combined with `&lang=ar`.
- Added deterministic localization and bundle checks to the normal verification path.
- Found and fixed whitespace-churn risk in dynamic DOM translation.
- Found and prevented likely release-size regression by compacting and separately minifying localization while retaining the 100 KB ceiling.
- Updated the frozen human cell with exact Arabic setup, neutral instruction, questions, and result fields.

### July 14, 2026 — Persistence Workflow Integration

- Implemented permanent authority, mutable active state, a mandatory per-response gate, visible work state, work packets, interruption recovery, and automated workflow integrity checks.
