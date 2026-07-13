# Pixel Mage — Commercial Release Scope

## Status

**Locked: Option B — Living Spell Trials. Owner-approved July 13, 2026.**

The earlier five-wave Android build remains a stable, accepted vertical slice. It is the technical foundation, not the intended commercial launch game.

## Locked Foundation

- Pixel Mage is the only active project.
- Repository `Ezz10099/beast-clash` and branch `main` remain authoritative.
- Keep the custom HTML/CSS/JavaScript runtime and Capacitor route.
- Keep package ID `com.ezz10099.pixelmage`.
- Keep responsive portrait layout, safe areas, offline play, local persistence, and the accepted drag-plus-auto-cast controls.
- Preserve the verified web and Android build pipeline.

## Commercial Identity

**Working pitch:** “One thumb. One spell. Rewrite it.”

The player controls one mage and exactly one living spell. The spell has three readable words—Form, Essence, and Law. Between combat waves, the player rewrites one word or takes a universal support improvement. The spell's mechanics, generated name, color, sound, and code-driven effect change coherently.

The distinct identity is the complete combination of:

1. one evolving spell rather than an unrelated weapon arsenal;
2. three readable spell words;
3. a rewrite-one-word decision structure;
4. coherent named and visible combinations;
5. permanent Spellbook discovery;
6. one-thumb movement and automatic threat targeting designed for mobile.

## Locked Repeatable Core Loop

1. Select an unlocked Trial.
2. Enter with one simple three-part spell.
3. Drag to dodge and position while the spell automatically targets a suitable threat.
4. Survive a short timed wave with scheduled enemy arrivals.
5. Rewrite one spell word or choose one universal support improvement.
6. Face guardians at the ends of Acts 1 and 2 and a distinct boss at the end of Act 3.
7. Record newly proven spell combinations, Trial Mastery, and local best results.
8. Unlock the next Trial or replay for another discovery; after victory, optionally continue into Endless.

## Locked Launch Cap

| Content | Version-1 cap |
|---|---:|
| Playable mages | 1 |
| Arena themes | 3 |
| Authored Trials | 9 total; 3 per arena |
| Spell axes | Form, Essence, Law |
| Spell parts | 9 total; 3 per axis |
| Discoverable combinations | 27 |
| Universal support upgrades | 6 |
| Normal enemy behavior families | 6, with data-driven variants/elites |
| Distinct bosses | 3; one per arena |
| Trial Mastery objectives | 9; one additional objective per Trial |
| Modes | Trials plus post-victory Endless |
| Narrative | One short premise, arena introductions, and one ending |

The working component set is Bolt, Orbit, Sigil; Ember, Frost, Storm; and Split, Echo, Seek. Exact names or behaviors may be replaced during the representative prototype when a combination is unclear, but the three-axis 3×3×3 cap remains locked.

## Locked Progression

- Unlock Trials and spell words horizontally.
- Record all 27 proven combinations in the Spellbook.
- Record Trial wins, Mastery, best score, and best survival.
- Introduce words gradually through clear achievements.
- Do not use permanent purchasable or grind-based damage, health, or speed. Run 1 must remain winnable through skill and choices.

## Locked Story Level

Use light framing only: a short reason the mage enters the Trials, one line introducing each arena, boss identity, and a brief ending.

Do not build dialogue trees, cutscenes, chapters of text, quests, or an animated cast for version 1.

## Locked Version-1 Exclusions

- No additional playable heroes.
- No equipment inventory, crafting, shop, currencies, permanent stat tree, gacha, energy, daily rewards, or battle pass.
- No conventional campaign map, quests, dialogue system, cutscenes, or branching story.
- No multiplayer, online accounts, cloud save, or online leaderboard.
- No external advertising, analytics, login, or purchase SDK until the representative slice and external playtest gates pass and the owner separately approves monetization and data collection.
- No engine change, 3D content, full character animation set, or large bespoke asset pack.
- No content beyond the locked caps without a new explicit owner decision.

## First Approved Implementation Batch — Representative Slice

**Implementation status:** Complete on `main` on July 13, 2026; automated gates pass. Consolidated SPCK phone acceptance and the second owner go/no-go are pending.

Build this as one substantial related batch before producing the full launch content:

1. Separate data-driven run, spawn, enemy, spell, save, and UI responsibilities while preserving the accepted runtime and controls.
2. Implement one three-act, 12-wave timed run with scheduled enemy spawning.
3. Add deterministic automatic threat targeting with clear target feedback.
4. Implement 2 Forms × 2 Essences × 2 Laws: 8 prototype combinations.
5. Use one arena, two normal enemy behavior families, one elite behavior, and one boss.
6. Add a versioned save schema, migrations, and checkpoint/resume at wave boundaries.
7. Expand automation with seeded builds, full-run checks, save-migration checks, and maximum projectile/particle stress checks.
8. Preserve pause, settings, safe areas, offline play, Android identity, and the current release pipeline.
9. Request one consolidated SPCK phone test after all automated checks pass.

## Representative-Slice Acceptance Gate

Full launch-content production begins only when:

- no control, save, layout, or performance blocker appears on the target phone;
- a complete winning run is measured and feels active rather than padded;
- the player can explain the three spell words and predict their result without outside instruction;
- at least three mechanically different builds finish deterministic tests;
- all eight prototype combinations remain readable under stress;
- the owner wants to try another build after the completed run;
- the owner gives the second explicit go/no-go.

The proposed 7–9-minute successful clear is a test target, not a locked promise. Measured phone results decide the actual timing and remaining batch estimate.

## Naming Gate

Pixel Mage remains the working title. The final display/store name must follow the proven hook and receive owner approval before store graphics and listing text are produced.

The package ID remains `com.ezz10099.pixelmage` unless the owner explicitly approves a separate identity change.

## Commercial Completion Gate

The game is finished only after:

- the locked capped scope is implemented;
- representative-run and total-progression measurements are recorded;
- automated, save-migration, stress, web, and native reliability gates pass;
- external target-player testing shows that the loop is understandable and worth replaying;
- store, policy, signing, monetization, Play testing, and business gates are complete.

Google Play acceptance alone is not commercial readiness.
