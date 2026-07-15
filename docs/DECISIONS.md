# Pixel Mage — Durable Decisions

This is an append-only record of decisions future sessions must not repeatedly reopen. Correct factual errors when found, but do not silently erase a decision's history.

## D-001 — Finish Pixel Mage First

- Date: July 11, 2026
- Status: Locked
- Decision: `Ezz10099/beast-clash` is the active repository, `main` is the working branch, and Pixel Mage is the only active game until Google Play testing or formal cancellation.
- Reason: The owner has many unfinished projects and needs one completed publishing cycle.
- Change rule: Requires an explicit cancellation decision, not temporary frustration or a new idea.

## D-002 — Original Small Release Scope

- Date: July 11, 2026
- Status: Superseded as the commercial launch scope on July 13, 2026; retained as the validated vertical-slice contract
- Original decision: Build one mage, five waves, slime variants, one boss, between-wave upgrades, score, replay, settings, and the existing release UX.
- Outcome: The scope was completed, packaged, installed, and accepted without reported bugs, but the owner completed the entire game in roughly one minute.
- Reason for supersession: It proved the development-to-APK pipeline but does not provide sufficient demonstrated depth for the profit-focused launch goal.
- Change rule: Do not discard the stable baseline. Expand only after a new capped commercial scope receives explicit owner approval.

## D-003 — Web-First Technical Route

- Date: July 11, 2026
- Status: Locked
- Decision: Keep the custom HTML/CSS/JavaScript runtime and do not switch engines before release.
- Reason: It is directly editable through GitHub, previews easily in SPCK, and already passes the release checks.
- Change rule: Reconsider only if a verified release blocker cannot be solved in the current stack.

## D-004 — One-Thumb Controls

- Date: July 11, 2026
- Status: Accepted on phone
- Decision: Drag inside the arena to move; spells cast automatically; pause and options remain in one compact overlay.
- Reason: This tested simpler and easier than a D-pad plus a fire button on the target phone.
- Change rule: Restore separate controls only if native APK testing proves the accepted model unusable.

## D-005 — Android Identity and Capacitor

- Date: July 12, 2026
- Status: Locked for release
- Decision: Use Capacitor 8 with package ID `com.ezz10099.pixelmage`, portrait orientation, API 24 minimum, and API 36 target.
- Reason: Capacitor converts the finished web project into a normal Android project without an engine rewrite.
- Change rule: The package ID must not change after the Play Console app is created. Any earlier change still requires explicit owner approval.

## D-006 — APK and AAB Roles

- Date: July 12, 2026
- Status: Clarified
- Decision: Debug APKs are milestone test builds. The final Google Play upload will be a securely signed release AAB.
- Reason: An APK is directly installable, while Google Play uses an AAB to generate optimized APKs for users.
- Change rule: Never treat a debug APK as a Play-ready release.

## D-007 — Decision Leadership

- Date: July 11, 2026
- Status: Active
- Decision: ChatGPT/Codex leads routine technical and workflow choices; the owner remains creative director and approves major or irreversible decisions.
- Reason: This reduces decision paralysis without surrendering product ownership.
- Change rule: Major decisions are listed in `docs/START_HERE.md` and always require explicit approval.

## D-008 — Repository as Permanent Memory

- Date: July 12, 2026
- Status: Locked
- Decision: GitHub documentation, not chat memory, is the permanent project record. Every meaningful session must close by updating the handoff and roadmap.
- Reason: Different sessions may have incomplete conversation context.
- Change rule: None; only the specific document structure may be improved.

## D-009 — Native Build Is a Vertical Slice

- Date: July 13, 2026
- Status: Locked
- Decision: The accepted one-minute APK is a validated native vertical slice, not the commercially complete Pixel Mage release.
- Reason: Technical stability and Google Play eligibility are different from sufficient player value, engagement, and replayability.
- Change rule: It may become the foundation of the launch game, but it must not be represented as the intended finished commercial product.

## D-010 — Evidence Before Commercial Scope Lock

- Date: July 13, 2026
- Status: Active planning rule
- Decision: Complete one final focused research round, compare feasible capped options, and phone-time a representative full run before locking content-count or playtime claims.
- Reason: Earlier estimates such as 15 or 60 stages and fixed campaign hours were not grounded in the current one-minute build or a tested content unit.
- Outcome: The final research round and three capped options were completed, and the owner selected Option B — Living Spell Trials — on July 13, 2026. The representative run was built and first phone-cleared in 5:49. Its correction received strong entertainment feedback; compact visual `.5`, closed-loop `.6`, incentive correction `.7`, and agency correction `.8` passed owner SPCK review. The clean fresh-player packet is ready in `.9`; its result and the second explicit go/no-go remain open.
- Change rule: The representative run must be phone-timed before duration or total-playtime claims are locked.

## D-011 — Living Spell Trials Commercial Scope

- Date: July 13, 2026
- Status: Direction retained; exact cap superseded as binding authority by D-013
- Decision: Build Option B — Living Spell Trials — as Pixel Mage's commercial direction.
- Core identity: One thumb, one mage, one evolving three-word spell; rewrite one Form, Essence, or Law between timed waves and record proven combinations in a Spellbook. The player experience must make each rewrite a visible tradeoff, build toward a satisfying climax, and create new ways to play rather than a rote checklist.
- Original launch cap: 1 mage, 3 arena themes, 9 authored Trials, 9 spell parts creating 27 combinations, 6 universal support upgrades, 6 normal enemy behavior families, 3 bosses, 9 Trial Mastery objectives, Trials plus post-victory Endless, and light narrative framing.
- Progression: Horizontal Trial/spell discovery and local records; no permanent-stat currency grind.
- Exclusions: No extra heroes, inventory, equipment, crafting, shop, currencies, permanent stat tree, gacha, energy, daily rewards, battle pass, conventional campaign map, quest/dialogue/cutscene system, multiplayer, online accounts, cloud saves, online leaderboards, external SDKs, engine change, 3D, or large animated asset set for version 1.
- First gate: Build and phone-test one 12-wave representative slice with 2×2×2 spell parts before producing the remaining launch content or final assets.
- Still provisional: Exact component names and behaviors, balance, successful-run duration, final display/store title, monetization, and external SDKs.
- Reason: This is the strongest researched balance of marketable identity, mobile usability, reusable code-driven variety, limited asset burden, and finishable scope.
- Change rule: The Living Spell direction should keep earning its place through evidence. Any element may change when a documented alternative better serves the Product Compass.

## D-012 — Continuous Evidence Ownership

- Date: July 13, 2026
- Status: Locked workflow rule
- Decision: Codex owns continuous automated evidence, targeted public-review mining, the evidence ledger, and recommendations about when a major human gate is ready. The owner coordinates short, asynchronous human cells only at explicit commercial gates and is not expected to provide friends on command.
- Automated contract: Keep the fast `npm run check` suite and the full `npm run evidence` matrix in CI. The current contract is 8 builds × 25 seeds with real damage, 4 real choice policies × 25 seeds, 25 idle controls, 25 simple-movement controls, 8 deterministic replays, and 8 starting-spell payoff checks, graded against runtime, survivability, active agency, build dominance, rewrite incentives, pacing, progression, and feedback thresholds.
- Human boundary: Bot runs and text-schema checks must never be represented as proof of fun, comprehension, touch feel, replay desire, or commercial value.
- Privacy boundary: Do not add analytics, accounts, network permissions, telemetry, or external SDKs for this workflow without separate owner approval.
- Reason: The project needs objective, repeatable evidence without exhausting the owner or drifting away from solutions agreed in chat.
- Change rule: Future agents may strengthen the harness or thresholds with a recorded reason, but may not silently skip the protocol, weaken a threshold to hide a regression, or move human-only claims into the automated column.

## D-013 — Final-Goal Authority and Independent Development

- Date: July 13, 2026
- Status: Locked owner mandate
- Decision: The detailed Product Compass and player promise in `docs/START_HERE.md` are the only binding product authority. All earlier mechanics, counts, scope fences, processes, and decisions are revisable working hypotheses. Codex independently owns finding product problems, generating and comparing alternatives, choosing and implementing the next batch, and proving it without waiting for the owner to diagnose the issue or invent the solution.
- Owner role: Supply resources when genuinely needed and judge major commercial gates or irreversible external actions; routine development should continue from evidence without requiring constant creative direction.
- Reason: The objective is an independently developed, worthwhile finished game—not mechanical compliance with an obsolete checklist or dependence on the owner's moment-to-moment creativity.
- Change rule: Only an explicit owner instruction may replace the final Product Compass or this authority model.

## D-014 — Rewriting Must Not Cost Power

- Date: July 13, 2026
- Status: Active representative design decision
- Decision: Remove universal Support from the representative choice screen. Every rewrite or Hold advances one shared living-spell level; the level visibly enlarges the spell and increases damage and cast rate. Hold preserves the current three words but receives no more growth than experimentation.
- Evidence: The original fixed-build bots always took Support and therefore never tested the central choice. A new policy audit found median clears of 247 seconds for always-Support, 265 seconds discovery-first and 274 seconds for rewrite-only, with Support also ending ahead in damage, haste, health, and speed. After `.7`, 100 real policy runs passed with 99% wins, every policy reaching level 12, and only 5.8% median clear spread.
- Reason: The game promised an evolving spell while generic Support supplied the actual vertical growth. That made ignoring the hook the rational strategy and turned Spellbook experimentation into a power tax.
- Change rule: Future growth systems may replace spell levels, but engaging with the game's central expressive mechanic must not be systematically weaker than avoiding it.

## D-015 — Playing and Discovering Must Change Outcomes

- Date: July 13, 2026
- Status: Active representative design decision
- Decision: The automatic spell cannot complete the Trial while the player remains untouched. Combat must contain a slow, readable, avoidable movement check. A proven Spellbook combination must also become a usable starting spell, and the result screen must return to build selection instead of silently repeating the default.
- Evidence: Before `.8`, the default Bolt won 25/25 deterministic runs while the player never moved, with a median of two damage events. The result prompt also promised a different build but immediately restarted the default spell; Spellbook discovery only increased a count. After `.8`, idle, simple-movement, active-build, and starting-spell payoff controls are permanent evidence gates.
- Reason: One-thumb movement and horizontal discovery are part of the player promise. If neither action changes an outcome, the game can look complete while withholding actual agency and replay value.
- Change rule: The exact hazard, UI, and unlock presentation may change, but active input must matter and discovery must unlock a different playable possibility rather than a cosmetic checklist entry.

## D-016 — The Product Goal Must Actively Govern Code

- Date: July 13, 2026
- Status: Locked owner mandate
- Decision: Every material gameplay, UX, progression, or commercial change must follow `docs/DEVELOPMENT_MODEL.md`: final goal → intended player experience → feature purpose → alternatives and tradeoffs → code → evidence → updated understanding. The Product Compass is not a ceremonial preface or end-of-session checklist.
- Creative responsibility: Codex owns generating and comparing improvements using source inspection, public human evidence, cross-platform and experimental mechanics, design patterns, original recombination, bounded prototypes, synthetic play styles, and fresh-context criticism. Owner feedback is decisive evidence but not the project's only source of ideas.
- Fun-potential rule: New ideas must be decomposed into player action, game response, runtime dynamic, and intended feeling. Search exact, component, and experience analogues; include positive and negative implementations; translate deliberately to one-thumb portrait mobile play. Public reviews and theory support hypotheses, not certainty.
- Evidence rule: Tests and bots establish technical and behavioral properties; AI/heuristic review identifies likely logic and playability risks; public reviews establish existing human reactions; only owner or fresh-player cells establish experienced fun, boredom, confusion, touch feel, replay desire, or perceived value.
- Calibration rule: Before a rare human gate, Codex records predictions. Afterward it records correct predictions, misses, causes, and reusable warning patterns in the evidence ledger so sparse feedback improves future independent judgment.
- Reason: A locally correct patch can still fail the final game if it ignores tacit context, optimizes the immediate request, or mistakes measurable proxies for player value. The project needs an external brain that connects every implementation level to the finishable commercial outcome.
- Change rule: Only an explicit owner instruction may replace the Product Compass or this development model. The methods may improve when the reason and evidence boundary are recorded.

## D-017 — Fun-First Continuity

- Date: July 13, 2026
- Status: Locked owner mandate
- Decision: Pixel Mage remains the game and project continuity is the default. Future sessions must not casually reopen project selection or replace the core game. Maximizing fun and engagement potential is a primary development objective alongside actually finishing and publishing the game.
- Interpretation: Finishability, scope control, evidence, testing, documentation, and release safety exist to help produce a worthwhile game. They must not become substitutes for moment-to-moment enjoyment, meaningful choice, escalation, build excitement, curiosity, mastery, satisfying payoff, and replay desire.
- Creative responsibility: Codex must proactively diagnose and improve the strongest fun or engagement limitation using the complete development model. It must not wait for the owner to invent every improvement or treat lack of immediate testers as a reason to stop product development.
- Testing constraint: Arabic-speaking or genre-unfamiliar players remain valid testers when the game uses appropriate visual clarity, localization, simple language, behavioral observation, and meaning-preserving translated questions. English terminology is not a prerequisite for testing the game itself.
- Scope balance: Avoid both endless expansion and premature minimalism. The target is the smallest release that is genuinely fun, engaging, replayable, polished, worth keeping, and realistically finishable through the GitHub–SPCK–Capacitor workflow.
- Permanent source: `docs/OWNER_MANDATE.md` contains the full interpretation and mandatory copy-paste new-session prompt.
- Change rule: Only an explicit owner instruction may replace this continuity and priority mandate. Strong evidence may justify changing mechanics inside Pixel Mage, but not casual project switching.

## D-018 — Persistent Per-Response Development Workflow

- Date: July 14, 2026
- Status: Locked workflow rule
- Decision: Reading the authority documents once at session start is insufficient. Every work-related response must pass the goal, player-effect, strongest-limitation, continuity/scope, evidence-truth, decision-quality, and persistence checks in `docs/CHATGPT_WORKFLOW.md`. `docs/ACTIVE_SESSION.md` must preserve the compact live state, and material responses must expose a concise `Work state` line so drift is visible to the owner.
- Implementation: `AGENTS.md` and `docs/START_HERE.md` require the workflow and active-state files; material decisions require a recorded work packet before coding; state changes must be persisted immediately; interruption recovery must reread the repository; and `npm run workflow:check` is part of the normal verification path.
- Reason: Chat memory and session-opening summaries can fade during long sessions, context compression, interruptions, or narrow implementation work. Multiple independent safeguards are needed so the Product Compass remains the active development logic rather than a ceremonial statement.
- Evidence boundary: The automated check proves only that the persistence structure and mandatory fields remain present. Whether ChatGPT actually applies the gate well is judged through the consistency of later responses, repository updates, and owner observation.
- Change rule: The workflow may be strengthened when a concrete failure is found, but it may not be silently removed, reduced to session-start reading, or treated as optional.

## D-019 — Runtime Size Is Evidence, Not Product Authority

- Date: July 14, 2026
- Status: Locked goal-protection rule
- Decision: Pixel Mage has no arbitrary total-code or per-file size cap. Runtime size must be measured and reported, but it may block development only when tied to a verified platform, performance, memory, download, build, maintenance, or commercial requirement.
- Superseded rule: The 100 KB vertical-slice ceiling and its later 150 KB replacement were assistant-created engineering thresholds, not owner-approved product requirements or Capacitor/Google Play limits.
- Reason: A fixed byte number can silently reward deleting worthwhile localization, presentation, behavior, or content even when the game remains tiny and performs well. That conflicts with the Product Compass and the goal of a finished, commercially credible Google Play game.
- Ongoing discipline: Keep deterministic release whitelisting, minification, checksums, legacy-file exclusion, offline behavior, performance testing, and per-file diagnostic reporting. Investigate suspicious growth, duplication, unnecessary dependencies, or measured phone regressions without treating size alone as a failure.
- Change rule: A blocking size threshold requires a documented real-world constraint and must be reviewed against player value and commercial scope before adoption.

## D-020 — Develop Broadly Before External Player Reviews

- Date: July 15, 2026
- Status: Locked owner workflow decision
- Decision: Continue Pixel Mage through substantial, coherent development batches before asking outside players to review it. Do not repeatedly stop development for the Fresh-Player Cell Runner while the game is still a small representative slice.
- Development method: Independently choose major batches using the Product Compass, source inspection, public game reviews and design research, comparable best practices, automated evidence, synthetic play styles, owner SPCK feedback, and bounded prototypes. Work should materially increase gameplay depth, content breadth, replay value, presentation, and commercial credibility.
- Review trigger: External player reviews begin when Pixel Mage has grown into a broader, coherent pre-release build that reasonably represents the intended game rather than a thin prototype, or when the owner explicitly requests an earlier review. The owner decides when that threshold has been reached.
- Evidence boundary: Until external reviews begin, do not claim that newcomers will enjoy the game, understand it, retain it, or pay for it. Those claims remain provisional even while development continues confidently from research and technical evidence.
- Allowed human checks: The owner may continue SPCK checks for bugs, controls, layout, wording, readability, and direct creative judgment. These are development checks, not substitutes for later outside-player evidence.
- Reason: Premature external testing of a visibly incomplete slice can consume scarce participants and produce feedback about missing scale rather than the intended commercial experience. The project should first become substantial enough that player reviews are worth the effort and meaningfully guide release decisions.
- Change rule: Only an explicit owner instruction may move external player reviews earlier or replace this development-first sequence.
