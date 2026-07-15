# Pixel Mage — Start Here

This is the permanent entry point for every future ChatGPT or Codex session. Chat memory is helpful; the repository is the source of truth. `docs/CHATGPT_WORKFLOW.md` makes the Product Compass operational, and `docs/ACTIVE_SESSION.md` preserves the live state that must affect later responses.

## Fixed Project Context

- Product: Pixel Mage
- Repository: `Ezz10099/beast-clash`
- Working branch: `main`
- Goal: a commercially credible, engaging Google Play release
- Primary validation device: POCO X2-class Android phone in 20:9 portrait
- Layout requirement: responsive portrait screens with safe-area support
- Workflow: ChatGPT/Codex edits GitHub; the owner pulls in SPCK and tests on Android
- Focus rule: Pixel Mage remains the only active game until Google Play testing or formal cancellation

## Product Compass

The final goal is to **finish and publish a worthwhile Android game**, not to keep polishing a prototype forever. Pixel Mage should be understandable, entertaining moment to moment, visibly transformed by meaningful spell choices, paced toward satisfying guardians and bosses, and replayable without permanent-power grinding. It needs a recognizable identity, honest commercial value, responsive one-thumb portrait play, stable offline behavior, and a finishable route to Google Play.

Player promise:

> **One thumb. One living spell. Rewrite its Form, Essence, and Law into genuinely different play styles while escalating Trials test the result.**

Every rewrite should create a visible tradeoff, every run should build toward a climax, and discovery should open new ways to play rather than a rote checklist.

`docs/OWNER_MANDATE.md` is the binding interpretation. Fun and engagement potential are primary; finishability, evidence, scope, documentation, and release safety must support a worthwhile game rather than replace it.

**Goal-to-code rule:** use `docs/DEVELOPMENT_MODEL.md` for the permanent chain: **final goal → intended player experience → feature purpose → alternatives and tradeoffs → code → evidence → updated understanding**.

**Authority boundary:** the Product Compass, player promise, Pixel Mage continuity, and owner mandates are binding. Earlier mechanics, counts, scope fences, and process hypotheses may change when another route inside Pixel Mage better serves the goal. ChatGPT/Codex owns routine diagnosis, research, implementation, testing, and next-batch selection; the owner supplies genuinely needed resources and judges major or irreversible decisions.

## Development-First Review Timing

D-020 is locked:

- continue substantial, coherent, research-guided development batches while the game remains a small representative build;
- use public game evidence, source inspection, automated play, synthetic styles, owner SPCK feedback, and bounded prototypes;
- do not repeatedly stop for the Fresh-Player Cell Runner after each feature batch;
- external player reviews begin when the owner judges the game broad and coherent enough to represent the intended commercial experience, or explicitly requests earlier review;
- until then, newcomer enjoyment, comprehension, retention, replay desire, and willingness to pay remain provisional.

Owner SPCK reviews remain valid development evidence for bugs, controls, layout, wording, readability, balance impressions, and creative judgment.

## Authority Order

Read these files in order:

1. `AGENTS.md`
2. `docs/OWNER_MANDATE.md`
3. `docs/START_HERE.md`
4. `docs/DEVELOPMENT_MODEL.md`
5. `docs/CHATGPT_WORKFLOW.md`
6. `docs/ACTIVE_SESSION.md`
7. `docs/RELEASE_SCOPE.md`
8. `docs/DECISIONS.md`
9. `docs/EVIDENCE_PROTOCOL.md` and `docs/EVIDENCE_LEDGER.md`
10. `docs/ARABIC_GLOSSARY.md`
11. `docs/SPELL_IDENTITY_RESEARCH.md`
12. `docs/DESIGN_RESEARCH.md`
13. `docs/ROADMAP.md`
14. `docs/SESSION_HANDOFF.md`
15. `docs/GOOGLE_PLAY.md`
16. `docs/BUILD.md` and `docs/ANDROID.md`
17. `docs/FRESH_PLAYER_CELL.md` only when the later external-review phase is active

The active session is mutable operational state, not higher authority. Reconcile it against durable authority and latest `main` before coding.

## Current High-Level State

- Stable custom web runtime, one-thumb controls, persistence, release UX, sound, haptics, offline bundle, Capacitor 8, and Android project.
- Installed/verified native foundation accepted without reported bugs.
- Living Spell Trials remains the active direction.
- Representative Trial: one mage, 12 waves, three acts, eight spell combinations, Motes, Glyph Casters, guardians, and The Redactor.
- `.8` accepted active movement, equal rewrite growth, functional Spellbook discovery, and selectable starting spells.
- Arabic/RTL, token-isolated saves, 84-pixel thumb clearance, portrait layout, arena atmosphere, and current-roster enemy variety are implemented.
- Spell identity/build depth is implemented:
  - Bolt precision;
  - Orbit ward pulse;
  - Ember chains;
  - Frost freeze/shatter;
  - Split broadcasting;
  - Echo resonance;
  - eight named English/Arabic identities with live meters and complete-build previews.
- The first spell-depth evidence run exposed per-Trial ward leakage; it was fixed. Final evidence passed all hard gates and 8/8 deterministic replays.
- Current automated status is YELLOW because simple continuous patrol wins 68%, while idle wins 0% and danger-aware active movement wins 99.5%.
- Full release construction, Capacitor sync, debug APK, APK verification, and artifact upload passed.
- Runtime size is reported without an arbitrary blocking cap.
- `test-launcher.html` remains the required tap-only owner entry point.
- The Fresh-Player Cell Runner is preserved but external player testing is deferred under D-020.
- Pixel Mage remains a working title until a later owner-approved store-name decision.

The exact latest state belongs in `docs/ACTIVE_SESSION.md`; the complete cross-session summary belongs in `docs/SESSION_HANDOFF.md`.

## Current Development Boundary

The current owner check is the spell-depth batch only: visibility, impact, layout, Arabic wording, and obvious balance problems. After bounded corrections, continue to **Trial pacing and encounter authorship**. Do not switch projects, introduce arbitrary byte limits, or request the Cell Runner merely because this batch ended.

## Mandatory Session Protocol

At the start:

1. Read the authority files and reconcile `docs/ACTIVE_SESSION.md` against latest `main`.
2. Update stale milestone, implementation, strongest limitation, approval boundary, evidence, goal, or next step.
3. Report the current state, strongest limitation, and one meaningful session goal.
4. Distinguish binding goals from revisable implementation hypotheses.

During work:

1. Apply the mandatory per-response gate in `docs/CHATGPT_WORKFLOW.md`.
2. Include the compact `Work state` line for material responses.
3. Complete/update the `Current Work Packet` before material changes.
4. Work in substantial related batches.
5. Preserve SPCK, portrait, offline, Arabic, and Android routes.
6. Run relevant targeted checks, then `npm run check` before stable code publication.
7. Run `npm run evidence` before gameplay or commercial recommendations when relevant.
8. Keep human-only claims provisional.
9. Before every owner phone request, verify a visible tap path and name the exact file and buttons.
10. Do not require Console, DevTools, terminal, source edits, manual query strings, or hand-built tokens when a visible interface is feasible.
11. Do not request external reviews until the D-020 trigger is met.

Before ending:

1. Push stable intended changes to `main`.
2. Update `docs/ACTIVE_SESSION.md`, `docs/SESSION_HANDOFF.md`, and `docs/ROADMAP.md`.
3. Update decisions, research, or evidence only when durable truth changed.
4. State verified facts, provisional claims, and the next strongest product action.

## Decision Authority

ChatGPT/Codex independently leads routine product diagnosis, research, architecture, implementation, and testing. The owner remains creative director for major commercial gates and irreversible external actions.

## Asset Safety

For every external or generated release asset, preserve source, prompt or license, creation date, and commercial-use evidence.

## New-Session Prompt

> Continue Pixel Mage in `Ezz10099/beast-clash` on `main`. Read `AGENTS.md`, `docs/OWNER_MANDATE.md`, `docs/START_HERE.md`, `docs/DEVELOPMENT_MODEL.md`, `docs/CHATGPT_WORKFLOW.md`, and `docs/ACTIVE_SESSION.md`, then the latest roadmap, evidence, decisions, handoff, Arabic glossary, and relevant research. Reconcile the live state against latest `main`. Pixel Mage remains the project. Develop it through substantial, research-guided batches until I judge the game broad and coherent enough for outside-player reviews; do not repeatedly stop for the Fresh-Player Cell Runner. Maximize fun, engagement, build excitement, replay value, polish, and commercial credibility while remaining realistic to finish and publish. Use the mandatory per-response and owner-execution gates, keep human-only claims provisional, update project memory immediately when decision-relevant facts change, and keep responses brief. Start by reporting the current state, strongest product limitation, and one meaningful batch goal.
