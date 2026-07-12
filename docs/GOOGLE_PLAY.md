# Pixel Mage — Google Play Path

This document explains the complete route in beginner-friendly terms and tracks the work after normal game development.

## How the Parts Connect

1. HTML, CSS, and JavaScript are the actual game.
2. The web build creates the verified `dist/` bundle.
3. Capacitor copies that bundle into a normal Android project and provides access to native Android behavior.
4. Gradle compiles the Android project.
5. A debug APK installs directly on a phone for milestone testing.
6. A signed release AAB is uploaded to Google Play.
7. Google Play generates optimized APKs from the AAB and delivers them to users.

GitHub Actions is only the cloud computer that performs builds. It replaces routine local Android Studio building; it does not replace Capacitor.

## Current Position

- Game and web release candidate: complete within the locked scope and SPCK-accepted.
- Capacitor Android project: complete.
- First cloud debug APK: built successfully.
- Native APK acceptance: pending.
- Monetization and privacy decisions: pending.
- Release signing and AAB: pending.
- Play Console setup, store listing, and testing: pending.
- Production publication: pending.

## Gate 1 — Finished Product

- Locked gameplay loop is complete and understandable.
- Tutorial, controls, pause, settings, persistence, win, loss, and replay work.
- Visuals and audio have no visible placeholders.
- Multiple full runs complete without a critical problem.
- The owner explicitly accepts the game as complete within `docs/RELEASE_SCOPE.md`.

## Gate 2 — Native Android Acceptance

- Install the debug APK on the target phone.
- Test first launch and offline relaunch.
- Test drag, casting, upgrades, pause, app switching, Android Back, victory, defeat, and restart.
- Confirm settings and best score persist after fully closing the app.
- Fix only consolidated release blockers, then accept the APK milestone.

## Gate 3 — Publisher and Business Decisions

- Confirm the legal owner of the Play Console account.
- Confirm whether the account's type and creation date trigger Google's closed-testing requirements.
- Choose the launch monetization model before adding any advertising or billing SDK.
- Confirm banking, tax, payment-profile, and contact responsibilities for the publisher.

These decisions require the owner. Do not guess them from previous plans.

## Gate 4 — Store and Policy Preparation

- App name, category, contact email, short description, and full description.
- Final store icon, feature graphic, and phone screenshots.
- Public privacy-policy URL.
- Data Safety, content rating, target audience, ads, and app-access declarations.
- Verify every included SDK and asset has valid publishing and commercial-use rights.

Google Play requirements can change, so verify the official rules again at submission time.

## Gate 5 — Secure Release Build

- Keep `com.ezz10099.pixelmage` unchanged.
- Create the release/upload signing key only after the publisher account is confirmed.
- Store secrets outside Git and use encrypted build secrets if cloud signing is enabled.
- Increase `versionCode` for every uploaded release.
- Build and verify a signed release AAB targeting the current required Android API.
- Never commit a keystore, password, service credential, APK, or AAB.

## Gate 6 — Google Play Testing

- Upload the AAB to an internal or closed testing track.
- Install through Google Play and repeat the complete native acceptance test.
- Collect structured tester feedback and crash information.
- For a qualifying new personal account, maintain at least 12 opted-in testers for 14 consecutive days before applying for production access.
- Fix blockers in consolidated batches and upload a higher version code.

## Gate 7 — Production

- Complete Google Play review and production-access requirements.
- Use a controlled rollout when available.
- Monitor crashes, reviews, retention, and monetization behavior.
- Release only small verified updates; never change the package identity or lose signing access.

## Definition of Published

Pixel Mage reaches the project goal when the production version is available to real Google Play users, its store and privacy information are accurate, its release identity and signing are secure, and the owner can safely produce an update.

