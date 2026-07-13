# Pixel Mage — Commercial Scope Options

## Status

**Historical decision packet: Option B — Living Spell Trials — was owner-approved on July 13, 2026. D-013 later made every exact cap and mechanic here revisable while retaining the final Product Compass.**

Last updated: July 13, 2026.

This is the decision packet for Milestone 8. It converts the research into three bounded directions, recommends one, and defines the smallest representative test that can confirm or reject that recommendation before large content production.

## Facts Every Option Must Respect

- The installed five-wave APK is technically stable and phone-accepted, but a complete run lasts roughly one minute.
- The current length is caused by five one-time groups of only 3–6 enemies, not by the web runtime or Capacitor.
- Drag movement and automatic casting already work well on the target phone and should remain.
- The owner cannot realistically produce a large animated hero roster, cinematic story, or many bespoke worlds.
- The survivor/auto-caster market is crowded. A generic mage with ordinary stat upgrades is not a strong commercial pitch.
- Modular spell-building already exists in games such as Magicraft, Spell Disk, Noita, Nova Drift, and Pixel Wizard: Dungeon Survivor. Combining spell parts alone is not original enough.
- `Pixel Mage` is commercially crowded on Google Play. It remains the working title and package ID for now, but the final display/store name needs an explicit owner decision before store-art production. The package ID does not need to change with the display name.

## Option Comparison

| Direction | Player-facing hook | Mobile fit | Art burden | Engineering/test risk | Estimated substantial gameplay/QA batches | Main commercial risk |
|---|---|---:|---:|---:|---:|---|
| A. Refined Survivor | Familiar one-thumb arena survival | High | Low | Low–medium | About 7 | Too generic and easy to overlook |
| B. Living Spell Trials | One thumb, one spell, rewrite its three words | High | Low–medium | Medium | About 12 | Combination balance and readability |
| C. Rune-Path Arena | Movement traces rune shapes that cast magic | Unproven | Low | High | About 15 | Touch precision may make the core frustrating |

Batch counts are planning estimates, not calendar promises. The representative-run gate will replace them with better evidence.

## Option A — Refined Survivor

### Player promise

Move with one thumb, survive escalating timed waves, choose familiar upgrades, defeat a boss, and continue into endless mode.

### Hard launch cap

- 1 mage.
- 1 arena.
- 12 timed waves in one complete run.
- 4 enemy behavior families and 1 boss.
- 12 upgrades, mostly familiar projectile and stat changes.
- 3 difficulty presets.
- Standard run plus optional endless continuation.
- Best score and local records.

### Assessment

This is the fastest route and reuses nearly all accepted systems. It is not recommended because Google Play already contains many visually similar one-finger mage survivors. Polish could make it competent, but the store pitch would remain weak and the single arena could still feel thin.

## Option B — Living Spell Trials

### Approved commercial direction

**Store-pitch draft:** “One thumb. One spell. Rewrite it.”

The player controls one mage and one living spell. Instead of collecting an unrelated arsenal, the player rewrites three readable parts of that spell during each run. Its mechanics, name, color, sound, and code-driven effect change together.

This is not claimed as an unprecedented invention. Its distinctiveness comes from the complete combination of:

1. one evolving spell rather than six simultaneous weapons;
2. a three-word interface understandable at a glance;
3. replacing one word between combat waves;
4. generated spell names and visibly coherent effects;
5. a permanent Spellbook that records discovered combinations;
6. one-thumb movement and automatic targeting designed specifically for mobile.

### Repeatable core loop

1. Select an unlocked Trial.
2. Enter with one simple three-part spell.
3. Drag to dodge and position while the spell automatically targets a suitable threat.
4. Survive a short timed wave with scheduled enemy arrivals.
5. Rewrite one spell word or hold the current spell; either path grows the living spell. This supersedes the original universal-Support proposal.
6. Face a guardian at the end of Acts 1 and 2, then a distinct boss at the end of Act 3.
7. Record newly proven spell combinations, Trial Mastery, and local best results.
8. Unlock the next Trial or replay to discover a different spell; after victory, optionally continue in endless mode.

### What is standard and what must be original

| Safe genre convention to reuse | Pixel Mage identity that must remain distinct |
|---|---|
| Drag movement and automatic casting | Exactly one living spell |
| Timed waves and boss acts | Three readable spell words |
| Three clear choices at breaks | Rewrite-one-word decision structure |
| Enemy telegraphs and escalating pressure | Coherent generated spell name/effect |
| Local unlocks, records, and optional endless | Spellbook discovery instead of currency grind |
| Pause, settings, checkpoint, and responsive UI | Magic-trial framing and visual language |

### Provisional Spell Sentence

The launch cap is three parts on each of three axes:

- **Form:** Bolt, Orbit, Sigil.
- **Essence:** Ember, Frost, Storm.
- **Law:** Split, Echo, Seek.

That creates 27 readable combinations from only 9 core parts. Examples include `Seeking Frost Bolt`, `Echoing Ember Sigil`, and `Split Storm Orbit`.

The names and exact behaviors are provisional. Every part must work clearly with every other part in the representative prototype. A part that creates confusing or broken combinations must be replaced before content expansion.

### Provisional full-run structure to phone-time

| Act | Combat waves | Proposed duration | Purpose |
|---|---|---:|---|
| Act 1 | Waves 1–3 plus Wave 4 guardian | 3×20s + 30s = 90s | Teach movement, first rewrites, first pressure test |
| Act 2 | Waves 5–7 plus Wave 8 guardian | 3×25s + 40s = 115s | Combine behaviors and introduce elites |
| Act 3 | Waves 9–11 plus Wave 12 boss | 3×30s + 60s = 150s | Complete the build and deliver a climax |

Total proposed combat time is 355 seconds, or 5 minutes 55 seconds. Eight short rewrite breaks, boss transitions, and results should produce a successful run around 7–9 minutes. This is a test hypothesis, not a promised duration. The target must be changed if phone play feels padded, rushed, or exhausting.

Longer play must come from scheduled enemies, formations, behavior changes, elites, and bosses—not inflated health or waiting.

### Provisional launch content cap

| Content | Cap |
|---|---:|
| Playable mages | 1 |
| Arena themes | 3 |
| Authored Trials | 9 total; 3 per arena |
| Spell parts | 9 total; 3 Forms, 3 Essences, 3 Laws |
| Discoverable spell combinations | 27 |
| Universal support upgrades | 6 proposed originally; replaced by shared spell growth in the representative slice |
| Normal enemy behavior families | 6, with data-driven variants/elites |
| Distinct bosses | 3; one per arena |
| Trial Mastery objectives | 9; one additional objective per Trial |
| Modes | Trials plus post-victory Endless |
| Narrative | One short premise, arena introductions, and one ending |

Nine measured clear-runs would provide a much larger content unit than the current five tiny waves. However, no campaign-hour claim is allowed yet. Perfect first-try time, failure rate, replay desire, and discovery time must be measured instead of guessed.

### Persistent progression

- Unlock Trials and spell words horizontally.
- Record all 27 combinations in the Spellbook when the player proves them in combat.
- Record Trial wins, Mastery, best score, and best survival.
- Teach the system gradually by beginning with a subset of words and unlocking the rest through clear achievements.
- Do not permanently sell or grind raw damage, health, or speed. Run 1 must remain winnable through skill and choices.

### Story recommendation

Use light framing, not a story system: a short reason the mage enters the Trials, one line introducing each arena, boss identity, and a brief ending. No dialogue trees, cutscenes, chapters of text, or animated cast are needed for launch.

### Hard exclusions for version 1

- No additional playable heroes.
- No equipment inventory, crafting, shop, currencies, permanent stat tree, gacha, energy, daily rewards, or battle pass.
- No conventional campaign map, quests, dialogue system, cutscenes, or branching story.
- No multiplayer, online accounts, cloud save, or online leaderboard.
- No external advertising, analytics, login, or purchase SDK until the core game passes the representative-run and external-playtest gates and the owner separately approves monetization and data collection.
- No engine change, 3D content, full character animation set, or large bespoke asset pack.
- No content beyond the approved caps without an explicit scope-change decision.

### Principal risks and controls

| Risk | Control |
|---|---|
| Some of the 27 combinations are unclear or dominant | Build 2×2×2 first, define behavior contracts, and test seeded builds before adding the ninth part |
| Effects overwhelm a small phone screen | Strict projectile/particle caps, contrast rules, telegraphs, and target-phone stress tests |
| Auto-targeting feels unpredictable | Visible target feedback and deterministic nearest/safest-threat rules |
| Nine Trials feel repetitive | Reuse art, but vary schedules, enemy formations, arena rules, and boss behavior through data |
| Persistent progression turns into grind | Horizontal unlocks and achievements only; no purchasable power |
| Content is built before the hook is fun | Stop after the representative run and test replay desire before producing the other arenas |

## Option C — Rune-Path Arena

### Player promise

The mage casts by moving through simple rune points in a particular order. Drawing a triangle, line, or loop in the arena produces a different spell while enemies continue to pressure the player.

### Hard launch cap

- 1 mage.
- 2 arenas and 6 Trials.
- 8 rune paths and 8 resulting spells.
- 5 enemy families and 2 bosses.
- Slow-motion planning assistance and path preview.
- Trial records and challenge unlocks.

### Assessment

This may create the strongest moment-to-moment novelty with very little art, but it changes the accepted control model and could hide hazards beneath the finger or demand frustrating precision. It needs more interaction prototyping, accessibility work, tutorials, and device testing. It is not recommended for the first published game.

## Fastest Safe Route if Option B Is Approved

Do not build all 27 combinations and nine Trials immediately. Build one representative slice first:

1. Extract data-driven run, enemy, spell, save, and UI systems from the monolithic prototype.
2. Implement one 12-wave timed run with automatic threat targeting and wave-boundary checkpoint/resume.
3. Implement only 2 Forms × 2 Essences × 2 Laws: 8 combinations.
4. Use one arena, two normal enemy families, one elite behavior, and one boss.
5. Add seeded automated runs plus maximum-projectile and save-migration tests.
6. Phone-time winning and losing runs and test whether the spell transformation is understandable and worth replaying.
7. Obtain a second explicit go/no-go before producing the remaining launch content and final assets.

This route is faster because it puts the risky commercial hook in front of a real player early while preserving reusable production systems.

## Representative-Run Acceptance Gate

The slice may expand only when:

- a complete run has no control, save, layout, or performance blocker on the target phone;
- its duration is measured and feels active rather than padded;
- the player can explain the three spell words and predict their result without outside instruction;
- at least three mechanically different builds can finish in deterministic tests;
- all eight prototype combinations remain readable under stress;
- the owner wants to try another build after a complete run;
- a small external target-player test is scheduled before the full release is called commercially ready.

External release testing should record—not guess—first-run understanding, run duration, failure cause, immediate second-run starts, favorite combinations, confusion, and device problems.

## Owner Decision Outcome

The owner selected **Option B — Living Spell Trials** as written on July 13, 2026.

The capped launch direction is locked in `docs/RELEASE_SCOPE.md` and D-011 in `docs/DECISIONS.md`. Development begins with the representative slice only. Full 27-combination/9-Trial production and final assets remain blocked until the slice passes its phone gate and receives a second go/no-go.

The overall direction must not be reopened unless the representative slice fails its gate or the owner explicitly approves a scope change.
