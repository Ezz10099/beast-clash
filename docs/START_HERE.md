# Pixel Mage — Start Here

This is the permanent entry point for every future ChatGPT or Codex session. Chat memory is helpful; the repository is the source of truth. `docs/CHATGPT_WORKFLOW.md` makes the Product Compass operational throughout a session, and `docs/ACTIVE_SESSION.md` preserves the compact live state that must affect later responses.

## Fixed Project Context

- Product: Pixel Mage
- Repository: `Ezz10099/beast-clash`
- Working branch: `main`
- Goal: a commercially credible, engaging, time-bounded Google Play release
- Primary validation device: POCO X2-class Android phone in 20:9 portrait
- Layout requirement: responsive across portrait screens, with safe-area support
- Workflow: ChatGPT/Codex edits GitHub; the owner pulls in SPCK and tests on the phone
- Focus rule: Pixel Mage remains the only active game until Google Play testing or formal cancellation

## Product Compass

The final goal is to **finish and publish a worthwhile Android game**, not to keep polishing a prototype forever. Pixel Mage should be immediately understandable, entertaining moment to moment, visibly transformed by meaningful spell choices, paced toward satisfying guardians and bosses, and replayable without permanent-power grinding. It needs a recognizable identity, enough honest value for a commercial release, responsive one-thumb portrait play, stable offline behavior, and a finishable path through this GitHub–SPCK workflow to Google Play.

Player promise: **One thumb. One living spell. Rewrite its Form, Essence, and Law into genuinely different play styles while escalating Trials test the result.** Every rewrite should create a visible tradeoff, every run should build toward a climax, and discovery should open new ways to play rather than a rote checklist.

`docs/OWNER_MANDATE.md` is the binding interpretation of how to pursue this compass. Pixel Mage remains the project; fun and engagement potential are primary design priorities; and finishability, evidence, scope, documentation, and release safety must support a worthwhile game rather than replace it. Do not casually reopen project selection or propose another core game.

The content cap is a production fence, not the whole design. For every material improvement, Codex must trace the player's logic—what the player sees, expects, chooses, observes, and wants next—then generate and compare solutions using source inspection, automated evidence, targeted comparable research, public game reviews, and bounded prototypes. Owner feedback remains decisive human evidence, but must not be treated as the only source of ideas.

**Goal-to-code rule:** the Product Compass must remain active throughout implementation, not merely be quoted during planning or review. Use `docs/DEVELOPMENT_MODEL.md` for the permanent chain: **final goal → intended player experience → feature purpose → alternatives and tradeoffs → code → evidence → updated understanding**. Use `docs/CHATGPT_WORKFLOW.md` and `docs/ACTIVE_SESSION.md` to keep that chain active across every response and through interruptions.

**Development-first review rule, July 15, 2026:** continue substantial, research-guided development until Pixel Mage becomes a broader coherent pre-release game. Do not repeatedly stop for the Fresh-Player Cell Runner while the product remains a small representative slice. External player reviews begin when the owner judges the game substantial enough to represent the intended commercial experience. Until then, enjoyment, newcomer comprehension, retention, replay desire, and willingness-to-pay claims remain provisional.

**Authority boundary:** the final goal, player promise, fun-first continuity, development-first review timing, and owner-led commercial threshold are binding. Earlier scope, mechanic, content count, process rule, and design decisions may be revised when another route inside Pixel Mage better serves that goal. Codex owns finding the problem, generating alternatives, selecting and implementing the next step, and proving it; the owner supplies resources when genuinely needed and judges major or irreversible commercial actions.

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
11. `docs/DESIGN_RESEARCH.md`
12. `docs/ROADMAP.md`
13. `docs/SESSION_HANDOFF.md`
14. `docs/FRESH_PLAYER_CELL.md`
15. `docs/GOOGLE_PLAY.md`
16. `docs/BUILD.md` and `docs/ANDROID.md`

The active session is mutable operational state, not higher authority. If it conflicts with durable authority or newer accepted evidence, reconcile and update it before coding. A new explicit owner decision may override an older document, but every affected document must be updated immediately.

## Current High-Level State

- The gameplay foundation, controls, release UX, persistence, code-drawn polish, sound, haptics, and deterministic web bundle passed SPCK phone testing.
- Capacitor and the Android project are configured; the first cloud debug APK was installed and accepted.
- The accepted five-wave APK remains a stable native foundation, not the intended commercial game.
- Living Spell Trials remains the evidence-supported direction.
- The representative run, compact rewrite loop, equal-growth system, active movement requirement, functional Spellbook starts, isolated saves, Arabic/RTL support, portrait rebuild, arena feedback, and enemy-variety systems are implemented.
- The latest automated gameplay matrix and Android pipeline passed.
- Runtime size is reported diagnostically and has no arbitrary blocking byte cap.
- `cell-runner.html` remains preserved for later external reviews, and `test-launcher.html` remains the required tap-only owner entry point.
- Future owner phone checks must use exact visible tap paths; Console input, manual query editing, token construction, terminal commands, and source edits are prohibited when a bounded interface can do the task.
- External player review is intentionally deferred until the game is broader and the owner explicitly judges it substantial enough.
- The next major product priority is spell identity and build depth, followed by Trial pacing, replay/progression, scalable content, and commercial presentation.
- Pixel Mage remains the working title until a later owner-approved store-name decision.

The exact latest state belongs in `docs/ACTIVE_SESSION.md` and `docs/SESSION_HANDOFF.md`. The active state controls continuity during the session; the handoff preserves the complete cross-session record.

## Current Development Phase

Continue major development batches rather than treating the representative slice as the final review candidate.

Current sequence:

1. deepen spell identity, synergies, tradeoffs, and build payoff;
2. improve authored Trial pacing, encounter rhythm, guardians, and boss buildup;
3. strengthen replay and progression motivation;
4. build scalable content systems and broader launch content;
5. improve commercial presentation, art direction, animation, audio, and identity;
6. begin structured outside-player review only when the owner judges the game broad and coherent enough.

The Cell Runner is ready but deferred. Do not block development on it and do not repeatedly ask the owner to recruit a fresh participant after each batch.

## Mandatory Session Protocol

At the start:

1. Read the authority files, beginning with `docs/OWNER_MANDATE.md`.
2. Read and reconcile `docs/ACTIVE_SESSION.md` against the durable authority files and latest `main`.
3. Update the active state before work when its milestone, build, strongest limitation, approval boundary, evidence, work goal, external-review timing, or exact next step is stale.
4. Report the current milestone, latest accepted phone test, strongest current fun/engagement limitation, and one meaningful session goal.
5. Distinguish the binding final goal and continuity mandate from revisable working hypotheses.
6. Do not propose another project or casual core replacement unless the owner explicitly asks or strong evidence shows Pixel Mage cannot satisfy the Product Compass.

During work:

1. Apply the mandatory per-response gate in `docs/CHATGPT_WORKFLOW.md` before every work-related response.
2. Include the compact `Work state` line for every material recommendation, coding batch, test request, commercial judgment, or direction change.
3. Complete or update the `Current Work Packet` before a material gameplay, UX, progression, or commercial change.
4. Work in substantial related batches.
5. Use public reviews, comparable best practices, design research, source inspection, automated evidence, synthetic play styles, and owner SPCK feedback.
6. Preserve the SPCK and responsive portrait workflow.
7. Stay inside the current approval boundary.
8. Update `docs/ACTIVE_SESSION.md` immediately when a changed fact could affect later responses in the same session.
9. Run `npm run workflow:check` before stable work commits.
10. Run relevant targeted checks, `npm run check`, and `npm run evidence` when appropriate.
11. Before every owner phone request, verify a visible tap path and name the exact file/screen and buttons in order.
12. Use owner checks for bugs, touch, layout, wording, readability, and creative judgment.
13. Do not ask for outside-player reviews until the owner confirms the broader pre-release review trigger has been reached.
14. Keep fun, engagement, build excitement, progression payoff, and replay desire active in every material decision; do not reduce the session to the easiest measurable task.

Before ending:

1. Push intended stable changes to `main`.
2. Confirm `docs/ACTIVE_SESSION.md` contains the exact live state and next action.
3. Update the handoff and roadmap.
4. Update decisions only for durable decisions.
5. Update design research when evidence changes the recommendation.
6. Never call untested behavior or provisional scope accepted.
7. State what was verified, what remains provisional, and what the next session must do first.
8. Confirm that the next step is the strongest finishable response to the current fun/engagement problem.

## Decision Authority

ChatGPT/Codex independently leads product diagnosis, solution generation, implementation, research, architecture, testing, and workflow. The owner remains creative director for major commercial gates, the timing of outside-player reviews, and irreversible external actions.

## Asset Safety

For every external or generated release asset, preserve its source, prompt or license, creation date, and commercial-use evidence.

## New-Session Prompt

> Continue Pixel Mage in `Ezz10099/beast-clash` on `main`. Read `AGENTS.md`, `docs/OWNER_MANDATE.md`, `docs/START_HERE.md`, `docs/DEVELOPMENT_MODEL.md`, `docs/CHATGPT_WORKFLOW.md`, and `docs/ACTIVE_SESSION.md`, then the latest roadmap, evidence, decisions, handoff, and Arabic glossary. Reconcile the active state against latest `main` before working. Pixel Mage remains the project. Continue developing it in substantial research-guided batches until it becomes a broader coherent commercial game; do not repeatedly stop for the Fresh-Player Cell Runner or ask for outside-player reviews while it remains a small representative slice. Use public game reviews, comparable best practices, source inspection, automated evidence, synthetic play styles, and owner SPCK feedback to independently identify and implement the strongest next improvements. The owner decides when the game is substantial enough for external reviews. Keep the Product Compass, fun, engagement, replay value, finishability, Android delivery, and evidence honesty active throughout development. Every owner phone check must use a named SPCK file or screen and visible tap path. Keep responses brief.
