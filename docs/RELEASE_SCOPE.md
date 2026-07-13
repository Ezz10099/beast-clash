# Pixel Mage — Commercial Release Scope

## Status

**Commercial scope under research; explicit owner approval required before gameplay expansion.**

The previous one-mage, five-wave contract successfully produced and validated an Android vertical slice. It no longer defines a commercially complete launch game because the owner completed it in roughly one minute.

This document prevents two opposite errors:

- publishing an experience that is technically stable but commercially too thin;
- expanding into an asset-heavy RPG that is unlikely to be finished.

## Locked Foundation

These decisions remain locked unless an explicit exception is approved:

- Pixel Mage is the only active project.
- Repository `Ezz10099/beast-clash` and branch `main` remain authoritative.
- Keep the custom HTML/CSS/JavaScript runtime and Capacitor route.
- Keep package ID `com.ezz10099.pixelmage`.
- Keep responsive portrait layout, safe areas, offline play, local persistence, and the accepted drag-plus-auto-cast controls.
- Preserve the verified web and Android build pipeline.

## Validated Vertical Slice

The accepted baseline contains:

1. One mage.
2. Five fixed enemy-group waves.
3. Three offered upgrades between waves.
4. Slime variants and one boss.
5. Score, best score, win, loss, and immediate replay.
6. Pause, settings, sound, haptics, focus-loss safety, and Android behavior.
7. A complete runtime of roughly one minute on the owner's phone.

The baseline proves the workflow and technology. It does not prove commercial depth, retention, replay value, or final playtime.

## Research-Supported Direction — Not Locked

Current comparison research supports exploring:

- short timed combat waves inside a complete run rather than dozens of tiny linear “stages”;
- continuous or scheduled enemy spawning rather than duration created by inflated health;
- meaningful spell-build choices that change behavior, not merely numbers;
- one-thumb movement and automatic casting;
- a boss climax and an optional endless continuation so a satisfying build is not cut off abruptly;
- limited arenas, enemies, and code-driven effects instead of a large animated cast;
- minimal story unless it clearly strengthens identity or progression;
- a distinctive asset-efficient hook, with a “living spell” rewritten during the run as one candidate.

No wave count, run duration, arena count, hero count, story quantity, upgrade count, campaign duration, or monetization model is approved yet.

## Required Scope-Lock Decisions

Before gameplay implementation, explicitly approve:

1. The exact repeatable core loop.
2. Pixel Mage's original marketable hook.
3. The provisional full-run structure to prototype.
4. The capped launch content: mages, arenas, enemy families, bosses, spell parts, modes, and challenges.
5. The persistent progression and replay structure.
6. The story level: none, premise-only, or light framing.
7. Hard exclusions that prevent scope creep.
8. A representative-run phone test used to replace guessed time estimates.

## Prohibited Until Scope Lock

- Speculative heroes, worlds, stories, currencies, shops, equipment, quests, crafting, gacha, accounts, multiplayer, or external SDKs.
- Large art or animation commitments.
- Treating provisional research as an approved design.
- Google Play submission of the one-minute vertical slice as the intended commercial product.

## Commercial Completion Gate

The launch game will be considered finished only after:

- the approved capped scope is implemented;
- a representative run and total progression are measured through real phone tests;
- automated and native reliability gates pass;
- external target-player testing provides evidence that the loop is understandable and worth replaying;
- required store, policy, signing, testing, and business gates are complete.

Google Play acceptance alone is not the definition of commercial readiness.
