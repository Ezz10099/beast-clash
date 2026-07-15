# Pixel Mage Agent Guide

## Product and Authority

Pixel Mage in `Ezz10099/beast-clash` on `main` is the only active game. The goal is a polished, enjoyable, replayable, commercially credible Android game that is actually finished and published.

Read in this order before material work:

1. `docs/OWNER_MANDATE.md`
2. `docs/START_HERE.md`
3. `docs/DEVELOPMENT_MODEL.md`
4. `docs/CHATGPT_WORKFLOW.md`
5. `docs/ACTIVE_SESSION.md`
6. `docs/RELEASE_SCOPE.md`
7. `docs/DECISIONS.md`
8. `docs/EVIDENCE_PROTOCOL.md` and `docs/EVIDENCE_LEDGER.md`
9. `docs/ARABIC_GLOSSARY.md`
10. directly relevant research, roadmap, build, Android, or Google Play documents

The Product Compass and owner mandates are binding. Mechanics, counts, and earlier implementation plans remain revisable when a stronger route inside Pixel Mage better serves the final goal.

## Persistent Workflow

Follow `docs/CHATGPT_WORKFLOW.md` throughout every meaningful session.

- Reconcile `docs/ACTIVE_SESSION.md` against latest `main` before implementation.
- Apply the mandatory per-response gate before every work-related response.
- Material responses include: `Work state: milestone | strongest limitation | approval boundary | response goal`.
- Complete the `Current Work Packet` before material gameplay, UX, progression, or commercial changes.
- Update active state immediately when evidence, direction, limitation, blocker, boundary, or next step changes.
- Recover from interruption by rereading repository state, not guessing from chat memory.

## Owner Workflow

- ChatGPT/Codex edits GitHub; the owner pulls and tests on Android using SPCK Editor and SPCK Preview.
- Primary validation is a POCO X2-class 20:9 portrait phone; layouts must remain responsive across portrait screens.
- Preserve one-thumb drag movement with automatic casting.
- Every phone request must provide a verified visible tap path from an exact SPCK file or screen.
- Use `test-launcher.html` for owner checks. Never require Console input, terminal commands, manual query editing, token construction, or source edits when a visible route can perform the task.
- English is default. Arabic must follow `docs/ARABIC_GLOSSARY.md`.

## Development Rules

- Work in substantial coherent batches, not micro-patches.
- Independently diagnose the strongest limitation on fun, clarity, build excitement, pacing, replay value, or commercial credibility.
- Use source inspection, public game evidence, comparable systems, synthetic play styles, bounded prototypes, automation, and owner SPCK feedback.
- Do not repeatedly stop for outside-player reviews. Under D-020, the owner decides when the broader pre-release build is substantial enough.
- Separate technical truth, automated evidence, public-human evidence, owner evidence, predictions, and uncertainty.
- Do not claim bots or research prove human enjoyment, comprehension, fairness, retention, or willingness to pay.
- Runtime size is diagnostic evidence only. No arbitrary byte cap may block worthwhile development.
- Prefer reusable code-driven variety over large asset-heavy systems.

## Runtime and Scope Safety

Active production runtime includes:

- `index.html`, `style.css`, `game.js`
- localization, touch-control, phone-polish, arena-FX, enemy-variety, and spell-depth JavaScript/CSS layers

The retired Beast Clash `src/`, animal assets, and `phaser.min.js` are legacy and must never enter Pixel Mage builds.

Repository-only testing tools (`test-launcher.*` and `cell-runner.*`) must remain outside `dist/`, APKs, and AABs.

Preserve:

- custom HTML/CSS/JavaScript runtime;
- Capacitor 8 and package ID `com.ezz10099.pixelmage`;
- portrait orientation, offline operation, safe areas, local persistence, pause/back handling;
- release whitelisting, minification, checksums, legacy exclusion, and deterministic testing.

Never commit signing keys, passwords, credentials, APKs, or AABs. Debug APKs are test artifacts; Google Play receives a securely signed release AAB.

## Decision Boundaries

Codex owns routine design, research, implementation, testing, architecture, and next-batch selection. Obtain owner approval before spending money, adding monetization/data collection/external SDKs, changing package or publisher identity, creating signing keys, destroying accepted work, submitting to Google Play, or making a major commercial go/no-go decision.

Record durable decisions in `docs/DECISIONS.md`.

## Verification

- Run `npm run workflow:check` before stable work commits.
- Run relevant targeted checks for changed systems.
- Run `npm run check` before stable code commits.
- Run `npm run evidence` before gameplay gates or commercial recommendations.
- Never weaken evidence merely to hide a regression.

Before ending meaningful work, ensure stable changes are on `main`, update `docs/ACTIVE_SESSION.md` and `docs/ROADMAP.md`, and record durable evidence or decisions where appropriate.