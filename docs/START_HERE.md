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

The content cap is a production fence, not the whole design. For every material improvement, Codex must trace the player's logic—what the player sees, expects, chooses, observes, and wants next—then generate and compare solutions using source inspection, automated evidence, targeted comparable research, and bounded prototypes. Owner feedback remains decisive human evidence, but must not be treated as the only source of ideas.

**Goal-to-code rule:** the Product Compass must remain active throughout implementation, not merely be quoted during planning or review. Use `docs/DEVELOPMENT_MODEL.md` for the permanent chain: **final goal → intended player experience → feature purpose → alternatives and tradeoffs → code → evidence → updated understanding**. Use `docs/CHATGPT_WORKFLOW.md` and `docs/ACTIVE_SESSION.md` to keep that chain active across every response and through interruptions. Public-human evidence, creative sources, synthetic play, fresh-context criticism, and calibrated rare human gates jointly reduce dependence on owner creativity without pretending that automation can feel fun.

**Authority boundary, July 13, 2026:** the final goal, player promise, and fun-first continuity mandate are binding. Earlier scope, mechanic, content count, process rule, and design decisions may be revised when Codex can show that another route inside Pixel Mage better serves that goal. Codex owns finding the problem, generating alternatives, selecting and implementing the next step, and proving it; the owner supplies resources when genuinely needed and judges major commercial gates.

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
10. `docs/FRESH_PLAYER_CELL.md`
11. `docs/ARABIC_GLOSSARY.md`
12. `docs/DESIGN_RESEARCH.md`
13. `docs/SCOPE_OPTIONS.md`
14. `docs/ROADMAP.md`
15. `docs/SESSION_HANDOFF.md`
16. `docs/GOOGLE_PLAY.md`
17. `docs/BUILD.md` and `docs/ANDROID.md`

The active session is mutable operational state, not higher authority. If it conflicts with durable authority or newer accepted evidence, reconcile and update it before coding. A new explicit owner decision may override an older document, but every affected document must be updated immediately.

## Current High-Level State

- The gameplay foundation, controls, release UX, persistence, code-drawn polish, sound, haptics, and deterministic web bundle passed SPCK phone testing.
- The browser release candidate is frozen on `web-rc-0.1.0` as the native foundation; the representative Living Spell runtime continues above it.
- Capacitor and the Android project are configured.
- The first cloud debug APK was installed and accepted on July 13, 2026 with no reported bugs.
- The accepted five-wave APK lasts roughly one minute and remains the stable native foundation, not the intended commercial game.
- Living Spell Trials remains the evidence-supported direction; its old exact cap is a revisable production hypothesis rather than binding authority.
- The first complete Living Spell Trials phone run cleared in 5:49. The owner wanted to experiment and enjoyed the boss, but onboarding, late pacing, Spellbook value, and Orbit feel failed.
- Correction build `0.2.0-representative.2` was reported as entertaining, with roughly 15 minutes of representative experimentation.
- Text-heavy `.4` failed immediate visual review. Compact `.5`, player-logic `.6`, equal-growth `.7`, and agency/progression `.8` passed owner SPCK review.
- Gate-preparation `.9` added token-isolated clean saves without changing the owner's normal save.
- Arabic readiness is implemented with a permanent glossary, RTL presentation, isolated clean saves, and default-English preservation.
- The gameplay page was rebuilt into a compact header, dominant arena, unified dashboard, attached meters, and one responsive overlay hierarchy.
- The owner accepted the pointer-transparent arena-feedback layer with act atmosphere, essence identity, touch trail, wave pulse, and damage-edge feedback.
- The current-roster enemy-variety batch is implemented and automated-green: Wave 1 stays simple; Act II adds flanking, spacing, three-line Caster warnings, and visible Caster–Mote links; Act III adds orange warnings before committed fast movement. Phone readability and fairness remain pending.
- The complete pipeline passed release construction, the documented 150 KB/per-file budget, evidence, Android configuration, Capacitor sync, debug APK build, APK verification, and artifact upload.
- `cell-runner.html` is the offline observer tool, and `test-launcher.html` is the required tap-only owner entry point.
- Future owner phone checks must use exact visible tap paths; Console input, manual query editing, token construction, terminal commands, and source edits are prohibited when a bounded interface can do the task.
- Full launch content, final assets, monetization, signing, store materials, and publication remain blocked on the genuine fresh-player cell and the second explicit go/no-go.
- Pixel Mage remains the working title until a later owner-approved store-name decision.

The exact latest state belongs in `docs/ACTIVE_SESSION.md` and `docs/SESSION_HANDOFF.md`. The active state controls continuity during the session; the handoff preserves the complete cross-session record.

## Current Commercial Gate

Preserve the `.8` accepted gameplay and `.9` clean-save foundation. The owner must first open `test-launcher.html` and verify the new enemy roles and warnings, Arabic presentation, English comparison, and Cell Runner flow using only visible buttons. Then one genuinely fresh participant must play through the frozen non-leading cell using a newly generated token. Compare the exported result with the pre-registered predictions and obtain the owner's second explicit go/no-go. Do not scale launch content or replace the project before that decision.

## Mandatory Session Protocol

At the start:

1. Read the authority files, beginning with `docs/OWNER_MANDATE.md`.
2. Read and reconcile `docs/ACTIVE_SESSION.md` against the durable authority files and latest `main`.
3. Update the active state before work when its milestone, build, strongest limitation, approval boundary, evidence, work goal, or exact next step is stale.
4. Report the current milestone, latest accepted phone test, strongest current fun/engagement limitation, and one meaningful session goal.
5. Distinguish the binding final goal and continuity mandate from revisable working hypotheses.
6. Do not propose another project or casual core replacement unless the owner explicitly asks or strong evidence shows Pixel Mage cannot satisfy the Product Compass.

During work:

1. Apply the mandatory per-response gate in `docs/CHATGPT_WORKFLOW.md` before every work-related response.
2. Include the compact `Work state` line for every material recommendation, coding batch, test request, commercial judgment, or direction change.
3. Complete or update the `Current Work Packet` before a material gameplay, UX, progression, or commercial change.
4. Work in substantial related batches.
5. Preserve the SPCK and responsive portrait workflow.
6. Stay inside the current approval boundary.
7. Update `docs/ACTIVE_SESSION.md` immediately when a changed fact could affect later responses in the same session.
8. Run `npm run workflow:check` before stable work commits.
9. Run `npm run localization:check` when changing localization.
10. Run `npm run controls:check` when changing touch controls.
11. Run `npm run polish:check` when changing phone presentation or interaction safety.
12. Run `npm run fx:check` when changing arena feedback.
13. Run `npm run enemy:check` when changing current-roster enemy behavior or telegraphs.
14. Run `npm run cell:check` when changing the Cell Runner.
15. Run `npm run launcher:check` when changing owner test navigation.
16. Run `npm run check` before publishing code.
17. Run `npm run evidence` before gameplay gates or commercial recommendations.
18. Before every owner phone request, verify a visible tap path and name the exact file/screen and buttons in order.
19. Ask for one consolidated human cell only at a major commercial gate.
20. Keep fun, engagement, build excitement, progression payoff, and replay desire active in every material decision; do not reduce the session to the easiest measurable task.

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

ChatGPT/Codex independently leads product diagnosis, solution generation, implementation, research, architecture, testing, and workflow. The owner remains creative director for major commercial gates and irreversible external actions.

## Asset Safety

For every external or generated release asset, preserve its source, prompt or license, creation date, and commercial-use evidence.

## New-Session Prompt

> Continue Pixel Mage in `Ezz10099/beast-clash` on `main`. Read `AGENTS.md`, `docs/OWNER_MANDATE.md`, `docs/START_HERE.md`, `docs/DEVELOPMENT_MODEL.md`, `docs/CHATGPT_WORKFLOW.md`, and `docs/ACTIVE_SESSION.md`, then the latest roadmap, evidence, decisions, handoff, and Arabic glossary. Reconcile the active state against latest `main` before working. I do not want to keep changing projects or casually replacing the core game. I relied on you to lead the development of one complete, worthwhile game. Maximizing fun and engagement potential is a primary goal, not something to undervalue behind scope, process, or easy validation. Apply the repository's mandatory per-response and owner-execution gates throughout the session, update the active state whenever a decision-relevant fact changes, and use the visible `Work state` line for material responses. Every owner phone check must begin from a named SPCK file or screen and a visible tap path; do not require Console input, manual URL/query editing, token construction, terminal commands, or source edits when a bounded interface can do it. Use the full goal-driven methods saved in the repository to independently identify, compare, implement, and test the strongest improvements while still keeping the game realistic to finish and publish. Do not propose a different project or core replacement unless strong evidence shows Pixel Mage cannot satisfy the Product Compass, or I explicitly ask for reconsideration. Keep responses brief. Start by reporting the current state, the strongest fun/engagement problem, and one meaningful session goal.
