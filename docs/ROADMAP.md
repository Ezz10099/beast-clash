# Pixel Mage — Roadmap to Google Play Testing

## Ultimate Goal

Finish Pixel Mage as a small, stable Android game and take it through the complete Google Play publishing pipeline. The production candidate must run reliably on the target POCO X2-class phone, preserve local data, fit a 20:9 portrait display, and complete repeated five-wave runs without critical errors.

Google Play publishing uses an Android App Bundle (AAB), not the debug APK. The first APK is a device-validation gate, not the project endpoint.

## Product Objectives

- Deliver a complete run with a beginning, four upgrade decisions, a final boss, and a clear ending.
- Keep an average successful run approximately 3–6 minutes.
- Make touch movement, casting, damage, upgrades, and results immediately understandable.
- Provide enough build variation to make replaying meaningful without adding new characters or worlds.
- Maintain stable phone performance, safe-area fit, offline play, and reliable local progress.
- Reach the APK gate without engine changes or scope expansion.

## Time Boundary and Batch Rule

From the validated five-wave foundation, complete the APK in no more than four major development batches:

1. Gameplay completion: phone validation, enemy variety, boss behavior, feedback, upgrades, and balance.
2. Release experience: tutorial, pause, settings, audio, haptics, and visual polish.
3. Web release candidate: automated checks, device QA, performance, and blocker fixes.
4. Android delivery: Capacitor setup, APK build, installation, and acceptance fixes.

Related small changes must be grouped into these batches. Each batch receives one consolidated phone test. Perfection work that does not materially improve release readiness is excluded.

After APK acceptance, finish Google Play preparation in no more than three additional major batches: release/business decisions, signed AAB plus store preparation, and closed-test fixes. Any Google-mandated testing period is calendar waiting time, not extra development scope.

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
- Keep the successful run within the 3–6 minute target.

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

**Status:** Pending owner installation and native phone testing.

**Goal:** approve the first Android build before Google Play work.

Objectives:

- Test first launch and offline relaunch.
- Test drag controls, automatic casting, upgrades, victory, defeat, pause/resume, app switching, and Android back behavior.
- Confirm settings and best score persist after closing and reopening the app.
- Complete multiple runs without crashes, severe slowdown, clipping, or save loss.

Exit criteria:

- The user accepts the installed APK as stable enough for the next release phase.

## Milestone 8 — Release and Business Readiness

**Status:** Pending APK acceptance.

**Goal:** confirm that the locked small game is genuinely complete and decide only the business details required for launch.

Objectives:

- Audit the installed game against `docs/RELEASE_SCOPE.md` and fix release blockers as one batch.
- Explicitly accept the game as complete within the locked scope.
- Confirm the Play Console publisher and account type.
- Decide the launch monetization model, including whether the optional rewarded revive is justified.
- Define accurate privacy and data behavior before adding any external SDK.

Exit criteria:

- No unfinished locked-scope feature remains.
- Publisher, monetization, data, and SDK decisions are recorded in `docs/DECISIONS.md`.

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

1. Gameplay completion — complete and phone-accepted.
2. Release experience and polish — complete and phone-accepted.
3. Web release-candidate QA — complete and frozen.
4. Capacitor build — complete; APK acceptance pending.
5. Release and business readiness — pending.
6. Play-ready signed AAB and store preparation — pending.
7. Closed test, blocker fixes, and production access — pending.

One correction batch per gate may be used only for verified release blockers. Scope expansion is never a valid use of that reserve.
