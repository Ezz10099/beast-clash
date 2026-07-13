# Pixel Mage — Commercial Release Scope

## Status

**Final research complete; explicit owner scope choice pending.**

The one-mage, five-wave build successfully produced a stable Android vertical slice, but the owner completed it in roughly one minute. It remains the technical foundation, not the intended commercial launch game.

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
2. Five fixed one-time enemy groups.
3. Three offered upgrades between waves.
4. Slime variants and one boss.
5. Score, best score, win, loss, and immediate replay.
6. Pause, settings, sound, haptics, focus-loss safety, and Android behavior.
7. A complete runtime of roughly one minute on the owner's phone.

The baseline proves the workflow and technology. It does not prove commercial depth, retention, replay value, or final playtime.

## Final Research Result — Not Locked

The completed evidence review produced three capped options in `docs/SCOPE_OPTIONS.md`:

- **Option A — Refined Survivor:** fastest and safest, but commercially generic.
- **Option B — Living Spell Trials:** recommended balance of identity, mobile fit, asset efficiency, and replay.
- **Option C — Rune-Path Arena:** potentially novel, but high touch-control and testing risk.

Option B's provisional identity is “one thumb, one spell, rewrite its three words.” Its proposed cap uses one mage, a limited three-axis spell system, timed acts, reusable Trials, horizontal Spellbook discovery, limited arenas and bosses, light framing, and optional endless continuation.

No option, count, duration, name, or feature in the packet is approved until the owner explicitly chooses it.

## Why the Current Run Is Short

The current code spawns one fixed group of only 3–6 enemies at the beginning of each wave. It has no timed spawn director, no sustained pressure, and mostly numerical upgrades. A representative commercial run can therefore become longer through scheduled arrivals, formations, behavior changes, elites, meaningful spell transformations, guardians, and a boss—not inflated health or waiting.

## Required Owner Scope Lock

Before gameplay implementation, explicitly approve:

1. One of the three directions, including any requested changes.
2. The repeatable core loop and original marketable hook.
3. The representative run structure to prototype.
4. The provisional launch caps for mages, arenas, Trials, enemy families, bosses, spell parts, modes, and progression.
5. The story level and hard version-1 exclusions.
6. The representative-run acceptance gate.
7. Pixel Mage as a working title until a later explicit naming decision.

## Representative-Run Gate After Approval

The first expansion must remain a test slice, not the complete content build. For the recommended option it would contain one arena, one timed 12-wave run, 2×2×2 spell parts, limited enemies, one boss, checkpoint/resume, automated stress checks, and a consolidated phone test.

Only measured phone results may replace the provisional duration and schedule estimates. Full content and final asset production wait for a second go/no-go after this slice.

## Prohibited Until Scope Lock

- New heroes, extra arenas, stories, currencies, equipment, shops, quests, crafting, gacha, accounts, multiplayer, or external SDKs.
- Large art or animation commitments.
- Changing the display name or package identity.
- Treating the recommendation or its caps as approved.
- Google Play submission of the one-minute vertical slice as the intended commercial product.

## Naming Gate

Google Play currently contains Pixel Mage Survival, Pixel Mage TD, Pixel Mage: Idle RPG, and closely positioned Pixel Wizard titles. Pixel Mage therefore remains a working title. The final display/store name must follow the approved hook and receive owner approval before store graphics and listing text are produced.

The Android package ID can remain `com.ezz10099.pixelmage` even if the later user-facing title changes.

## Commercial Completion Gate

The launch game will be considered finished only after:

- the owner-approved capped scope is implemented;
- a representative run and total progression are measured through real phone tests;
- automated, save-migration, stress, web, and native reliability gates pass;
- external target-player testing provides evidence that the loop is understandable and worth replaying;
- required store, policy, signing, monetization, testing, and business gates are complete.

Google Play acceptance alone is not the definition of commercial readiness.
