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
- Outcome: The final research round and three capped options were completed, and the owner selected Option B — Living Spell Trials — on July 13, 2026. The representative run was built and first phone-cleared in 5:49. Its correction received strong entertainment feedback; fresh-player choice comprehension and the second explicit go/no-go remain open.
- Change rule: The representative run must be phone-timed before duration or total-playtime claims are locked.


## D-011 — Living Spell Trials Commercial Scope

- Date: July 13, 2026
- Status: Locked by explicit owner approval
- Decision: Build Option B — Living Spell Trials — as Pixel Mage's commercial direction.
- Core identity: One thumb, one mage, one evolving three-word spell; rewrite one Form, Essence, or Law between timed waves and record proven combinations in a Spellbook.
- Launch cap: 1 mage, 3 arena themes, 9 authored Trials, 9 spell parts creating 27 combinations, 6 universal support upgrades, 6 normal enemy behavior families, 3 bosses, 9 Trial Mastery objectives, Trials plus post-victory Endless, and light narrative framing.
- Progression: Horizontal Trial/spell discovery and local records; no permanent-stat currency grind.
- Exclusions: No extra heroes, inventory, equipment, crafting, shop, currencies, permanent stat tree, gacha, energy, daily rewards, battle pass, conventional campaign map, quest/dialogue/cutscene system, multiplayer, online accounts, cloud saves, online leaderboards, external SDKs, engine change, 3D, or large animated asset set for version 1.
- First gate: Build and phone-test one 12-wave representative slice with 2×2×2 spell parts before producing the remaining launch content or final assets.
- Still provisional: Exact component names and behaviors, balance, successful-run duration, final display/store title, monetization, and external SDKs.
- Reason: This is the strongest researched balance of marketable identity, mobile usability, reusable code-driven variety, limited asset burden, and finishable scope.
- Change rule: Reopen the overall direction only if the representative slice fails its acceptance gate or the owner explicitly approves a scope change.

## D-012 — Continuous Evidence Ownership

- Date: July 13, 2026
- Status: Locked workflow rule
- Decision: Codex owns continuous automated evidence, targeted public-review mining, the evidence ledger, and recommendations about when a major human gate is ready. The owner coordinates short, asynchronous human cells only at explicit commercial gates and is not expected to provide friends on command.
- Automated contract: Keep the fast `npm run check` suite and the full `npm run evidence` matrix in CI. The representative baseline is 8 builds × 25 seeds with real damage plus 8 deterministic replays, graded against recorded runtime, survivability, dominance, pacing, and choice-schema thresholds.
- Human boundary: Bot runs and text-schema checks must never be represented as proof of fun, comprehension, touch feel, replay desire, or commercial value.
- Privacy boundary: Do not add analytics, accounts, network permissions, telemetry, or external SDKs for this workflow without separate owner approval.
- Reason: The project needs objective, repeatable evidence without exhausting the owner or drifting away from solutions agreed in chat.
- Change rule: Future agents may strengthen the harness or thresholds with a recorded reason, but may not silently skip the protocol, weaken a threshold to hide a regression, or move human-only claims into the automated column.
