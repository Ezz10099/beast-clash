# Pixel Mage — Roadmap to the First Capacitor APK

## Ultimate Goal

Produce a stable, installable Pixel Mage Android APK from the same HTML/CSS/JavaScript game through Capacitor. The APK must run offline on the target POCO X2-class phone, preserve the best score, fit a 20:9 portrait display, and complete repeated five-wave runs without critical errors.

Google Play publishing uses an Android App Bundle (AAB), not the APK. The first APK is the device-validation gate before monetization, AAB creation, and Play testing.

## Product Objectives

- Deliver a complete run with a beginning, four upgrade decisions, a final boss, and a clear ending.
- Keep an average successful run approximately 3–6 minutes.
- Make touch movement, casting, damage, upgrades, and results immediately understandable.
- Provide enough build variation to make replaying meaningful without adding new characters or worlds.
- Maintain stable phone performance, safe-area fit, offline play, and reliable local progress.
- Reach the APK gate without engine changes or scope expansion.

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

**Status:** In progress.

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

**Goal:** freeze a browser build that is ready to wrap.

Objectives:

- Run `npm run check` successfully.
- Test 20:9 and at least one smaller portrait viewport.
- Verify offline loading, local persistence, restart, pause/resume, and repeated runs.
- Remove or clearly isolate unused legacy Beast Clash runtime files from the mobile bundle.
- Fix all critical and high-severity defects.

Exit criteria:

- The exact web build intended for Capacitor is tagged as the web release candidate.
- Ten test runs produce no crash, blank screen, lost input, or corrupted saved data.

## Milestone 6 — Capacitor Android Build

**Goal:** generate the first installable Android APK.

Objectives:

- Add pinned Capacitor dependencies and configuration.
- Add a deterministic script that copies only the active game into the mobile web directory.
- Create and synchronize the Android project.
- Configure portrait orientation, app identity, icon, splash, status/navigation-bar behavior, and Android back handling.
- Build a debug APK from the synchronized web release candidate.

Exit criteria:

- Capacitor produces an APK successfully from a clean checkout.
- The APK installs and launches on the target phone.

## Milestone 7 — APK Acceptance

**Goal:** approve the first Android build before Google Play work.

Objectives:

- Test first launch and offline relaunch.
- Test touch controls, upgrades, victory, defeat, pause/resume, app switching, and Android back behavior.
- Confirm settings and best score persist after closing and reopening the app.
- Complete multiple runs without crashes, severe slowdown, clipping, or save loss.

Exit criteria:

- The user accepts the installed APK as stable enough for the next release phase.

## After the APK Gate

Only after APK acceptance:

- Decide whether retention is sufficient for one optional rewarded revive.
- Add required privacy and data disclosures.
- Build a signed AAB.
- Prepare the store listing and closed Google Play test.

## Estimated Development Sessions

1. Foundation and roadmap — complete.
2. Phone validation and control fixes.
3. Boss behavior, upgrade tuning, and balance.
4. Tutorial, pause, settings, sound, and haptics.
5. Visual polish and web release-candidate QA.
6. Capacitor setup and first APK build using a laptop.
7. Installed APK testing and fixes.

One additional correction session is reserved if necessary. Scope expansion is not a valid use of that session.
