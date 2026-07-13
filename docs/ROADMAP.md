# Pixel Mage — Roadmap to Google Play Testing

## Ultimate Goal

Finish Pixel Mage as a stable, commercially credible Android game and take it through the complete Google Play publishing pipeline. The production candidate must be engaging enough to justify replay, realistic for the mobile-first AI-assisted workflow, responsive across portrait phones, and reliable on the target POCO X2-class device.

The current debug APK proves the technical route. It is not the project endpoint or the approved commercial product.

## Product Objectives

- Preserve the accepted one-thumb drag-and-auto-cast controls.
- Build depth from meaningful spell behavior and enemy patterns rather than a large animated roster.
- Make each run develop toward a satisfying power build and clear climax.
- Provide replay through combinations, challenges, difficulty, and/or endless continuation without grind-heavy padding.
- Keep story optional and light unless research proves it materially strengthens the game.
- Measure a representative full run on the target phone before setting duration or total-playtime claims.
- Maintain responsive portrait layout, safe-area fit, offline play, local persistence, stable performance, and secure Android delivery.

## Time Boundary and Batch Rule

Milestones 0–7 completed the technical vertical slice and Android acceptance route.

The commercial expansion uses a bounded decision gate:

1. Complete one final focused internet/player-review research round — complete.
2. Record three capped scope options with implementation and asset costs — complete in `docs/SCOPE_OPTIONS.md`.
3. Obtain one explicit owner-approved commercial scope — complete: Option B selected July 13, 2026.
4. Build one representative full run and phone-time it — next.
5. Revise the remaining batch count from that measured unit — pending.

Do not conduct indefinite research and do not start speculative content before the scope lock. After approval, group related work into substantial batches with automated checks and one consolidated phone test per batch.

## Milestone 0 — Foundation

**Status:** Complete.

- Five escalating waves.
- Final boss wave.
- Three upgrade choices between waves.
- Score and saved best score.
- Automated gameplay-flow check.
- Locked release scope and agent guidance.

## Milestone 1 — Phone Validation

**Status:** Complete on the target SPCK/phone workflow.

**Goal:** prove that the foundation feels usable on the actual target phone.

Objectives:

- Pull and run `main` in SPCK preview.
- Confirm the full interface fits without clipping or unwanted scrolling.
- Confirm movement can be held reliably with one thumb.
- Confirm firing, upgrade selection, restart, victory, and defeat work by touch.
- Record whether Wave 1 feels too easy, fair, or frustrating.

Exit criteria:

- No control or layout blocker remains on the target phone.
- The user can complete or meaningfully attempt a full run.

## Milestone 2 — Gameplay Feel and Balance

**Status:** Complete and accepted through the target SPCK/phone workflow.

**Goal:** make the five-wave run satisfying enough to replay.

Objectives:

- Balance enemy health, speed, contact damage, and wave duration.
- Ensure every offered upgrade is useful and understandable.
- Give the final boss one clear code-driven behavior beyond ordinary slime movement.
- Improve hit, damage, wave-clear, upgrade, victory, and defeat feedback.
- Measure the successful vertical-slice run and record the result; do not treat that measurement as the future commercial target.

Exit criteria:

- At least three different upgrade builds can finish the run.
- Failure feels attributable to play, not broken controls or unfair collisions.
- Three consecutive runs complete without a logic error.

## Milestone 3 — Release UX

**Status:** Complete and accepted through the target SPCK/phone workflow.

**Goal:** supply the minimum experience expected from a standalone mobile game.

Objectives:

- Add a very short first-run control explanation.
- Add pause/resume behavior.
- Add sound and haptic feedback with independent toggles.
- Add a compact settings panel.
- Preserve settings and best score locally.
- Handle focus loss safely so returning to the app cannot cause an unfair death.

Exit criteria:

- A new player can understand and start without external instructions.
- Sound, haptics, pause, resume, and persistence work reliably.

## Milestone 4 — Visual and Audio Polish

**Status:** Complete. Runtime polish is phone-accepted, and original Android icon/splash artwork is implemented.

**Goal:** make the small scope cohesive rather than prototype-like.

Objectives:

- Refine the existing code-drawn mage, slimes, boss, bolts, particles, panels, and background.
- Create one original app icon and splash image.
- Add a small original sound set for casting, hits, damage, wave clear, upgrades, victory, and defeat.
- Verify readable contrast and touch targets on small portrait screens.

Exit criteria:

- No visible placeholder or “Game 0” language remains.
- Visuals and audio consistently communicate game state.
- No additional character or world assets are required.

## Milestone 5 — Web Release Candidate

**Status:** Complete and phone-accepted. Frozen on branch `web-rc-0.1.0`.

**Goal:** freeze a browser build that is ready to wrap.

Objectives:

- Run `npm run check` successfully.
- Test 20:9 and at least one smaller portrait viewport.
- Verify offline loading, local persistence, restart, pause/resume, and repeated runs.
- Remove or clearly isolate unused legacy Beast Clash runtime files from the mobile bundle.
- Fix all critical and high-severity defects.

Exit criteria:

- The exact web build intended for Capacitor is frozen as the web release candidate.
- Ten test runs produce no crash, blank screen, lost input, or corrupted saved data.

## Milestone 6 — Capacitor Android Build

**Status:** Complete. The first cloud debug APK build succeeded on July 12, 2026.

**Goal:** generate the first installable Android APK.

Objectives:

- Add pinned Capacitor dependencies and configuration.
- Use the completed deterministic `dist/` build containing only the active game.
- Create and synchronize the Android project.
- Configure portrait orientation, app identity, icon, splash, status/navigation-bar behavior, and Android back handling.
- Build a debug APK from the synchronized web release candidate.

Exit criteria:

- Capacitor produces an APK successfully from a clean checkout. Complete.
- The build artifact passes integrity checks. Complete.
- Installation and launch are verified under Milestone 7.

## Milestone 7 — APK Acceptance

**Status:** Complete and owner-accepted on July 13, 2026.

**Goal:** approve the first Android build before Google Play work.

Objectives:

- Test first launch and offline relaunch.
- Test drag controls, automatic casting, upgrades, victory, defeat, pause/resume, app switching, and Android back behavior.
- Confirm settings and best score persist after closing and reopening the app.
- Complete multiple runs without crashes, severe slowdown, clipping, or save loss.

Exit criteria:

- The user accepts the installed APK as stable enough for the next release phase. Complete: no bugs were reported and all tested behavior worked.

## Milestone 8 — Research and Commercial Scope Lock

**Status:** Commercial scope locked: Option B — Living Spell Trials. Representative-slice implementation is next.

**Goal:** choose the smallest scope that is genuinely marketable and engaging without becoming unfinishable.

Objectives:

- Preserve the findings and sources in `docs/DESIGN_RESEARCH.md`.
- Preserve the completed final comparison of feasible games, player feedback, original hooks, run structures, and early commercial content.
- Keep reusable genre patterns separate from Pixel Mage's required original identity.
- Present the three capped options in `docs/SCOPE_OPTIONS.md`, including code, art, animation, testing, and schedule implications.
- Preserve the owner-approved Living Spell Trials core loop, hook, content cap, horizontal progression, light framing, and exclusions.
- Keep `docs/RELEASE_SCOPE.md` and `docs/DECISIONS.md` authoritative.
- Build and phone-time the approved representative slice before locking duration estimates or scaling full content.

Exit criteria:

- One commercially credible scope is explicitly approved. Complete: Option B.
- Provisional duration, behavior, naming, and monetization are separated from locked requirements. Complete.
- The first implementation batch and its phone acceptance test are precisely defined. Complete in `docs/RELEASE_SCOPE.md`.
- The representative slice is implemented and phone-timed. Pending.

## Milestone 9 — Play-Ready Release

**Status:** Pending.

**Goal:** create the secure production candidate and complete its store materials.

Objectives:

- Prepare the privacy policy and Play Console declarations.
- Create final store text, icon, feature graphic, and screenshots.
- Create and secure release/upload signing outside Git.
- Build and verify a signed release AAB with an incremented version code.
- Upload the AAB to the appropriate Google Play testing track.

Exit criteria:

- Play Console accepts the AAB and all required app-content sections are complete.
- The Play-distributed test build installs and passes the native acceptance checklist.

## Milestone 10 — Closed Test and Production Access

**Status:** Pending.

**Goal:** satisfy Google Play testing requirements and submit a stable production release.

Objectives:

- Recruit and retain the required testers if the publisher account is subject to the 12-testers/14-days rule.
- Collect structured feedback and fix only verified release blockers.
- Apply for production access when eligible.
- Submit the reviewed production release and monitor its rollout.

Exit criteria:

- Pixel Mage is available to real users on Google Play.
- The owner can safely create and publish a future update.

## Remaining Major Batches

1. Representative Living Spell Trials slice and phone timing — next.
2. Remaining approved gameplay/content batches — count revised after the measured slice.
4. External playtest, balance, and release QA — pending.
5. Publisher, monetization, privacy, and SDK decisions — pending.
6. Signed AAB and store preparation — pending.
7. Google Play testing, blocker fixes, production access, and rollout — pending.

One correction batch per gate may be used for verified blockers. New scope requires a new explicit decision.
