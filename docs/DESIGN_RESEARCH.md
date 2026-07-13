# Pixel Mage — Design Research

## Purpose

This file preserves external evidence and design reasoning so future sessions do not rely on incomplete chat memory or repeat unsupported estimates.

Research informs the decision; it does not lock scope. Only an explicit owner-approved decision recorded in `docs/DECISIONS.md` can do that.

## Baseline Being Evaluated

The accepted Pixel Mage APK currently has:

- one-thumb drag movement;
- automatic upward spell casting;
- five fixed enemy-group waves;
- an upgrade selection between waves;
- slime variants and one boss;
- a complete successful run of roughly one minute.

The technical route passed. The commercial depth has not.

## Research Round 1 — July 13, 2026

### Comparable evidence

- **Brotato:** its Google Play description uses waves lasting 20–90 seconds, followed by looting, shopping, leveling, and build creation. This demonstrates that a short wave can be an internal unit of a substantially longer run.
  - https://play.google.com/store/apps/details?id=com.brotato.shooting.survivors.action.roguelike
- **20 Minutes Till Dawn:** its mobile listing advertises 10–20-minute sessions, more than 80 upgrades, multiple characters, weapons, runes, maps, and difficulty. The useful pattern is build experimentation; its mature content count is not a feasible launch target for Pixel Mage.
  - https://play.google.com/store/apps/details?id=com.Flanne.MinutesTillDawn.roguelike.shooting.fr.gp
- **Magic Survival:** Google Play reviews praise one-handed simplicity, evolving features, characters, classes, and skill variety, while criticizing progression that can require hours of currency grinding.
  - https://play.google.com/store/apps/details?id=com.vkslrzm.Zombie
- **Halls of Torment mobile:** player feedback warns that fine dodging and projectile weaving can feel substantially worse with imprecise touchscreen controls.
  - https://play.google.com/store/apps/details?id=com.halls.of.torment.paid.gp
- **Bounty of One:** player feedback asks for endless continuation because a run can stop just as the build reaches its satisfying power peak.
  - https://play.google.com/store/apps/details?id=com.bountyofone.premium.mobile.gp
- **Slice & Dice:** player feedback praises mix-and-match combinations, modes, and rule-changing items as sources of replay without relying on animation-heavy presentation.
  - https://play.google.com/store/apps/details?id=com.com.tann.dice
- **Hoplite:** its listing emphasizes small maps, meaningful movement, upgrades, procedural levels, achievements, and “every move counts,” showing how compact rules can create depth.
  - https://play.google.com/store/apps/details?id=com.magmafortress.hoplite

### Conclusions supported by the comparison

1. **Stop calling every combat group a stage.**
   - Wave: a short combat segment.
   - Run: a sequence of waves and build decisions ending in a boss, victory, or death.
   - Arena: a replayable environment or ruleset.

2. **A linear stage count is a poor scope measure for this game.**
   The earlier 15-stage and 60-stage suggestions were guesses. Comparable arena roguelites create much of their value through combinations, difficulty, challenges, and repeated runs.

3. **Current waves end too quickly because they spawn one small fixed group.**
   A future prototype may use timed or scheduled continuous spawning, enemy behavior changes, elites, objectives, and bosses. Duration must not come mainly from inflated health or waiting.

4. **Build behavior matters more than raw upgrade quantity.**
   Players should see and feel a build transform: splitting, orbiting, returning, chaining, piercing, freezing, detonating, or otherwise changing decisions and movement.

5. **The accepted controls are an advantage.**
   Keep one-thumb drag and auto-cast. Avoid systems requiring precise twin-stick aiming or obscuring important action beneath the player's finger.

6. **Runs should reach a payoff.**
   A boss or victory should arrive after the player's build becomes expressive. Optional endless continuation is a candidate, not yet a requirement.

7. **Story is not automatically necessary.**
   Pixel Mage may use no story, a premise only, or light framing. Story must earn its implementation and asset cost by improving identity or progression.

8. **Monetization must not manufacture grind.**
   Forced ads, gacha gates, and slow currency progression are research warnings, not launch requirements.

## Candidate Synthesis — Not Approved

A promising original direction is **one living spell** rather than an arsenal of unrelated weapons.

During a run, the player would rewrite parts of the same spell—for example its form, element, and behavior—so its mechanics and code-driven appearance visibly evolve. This could create combinatorial variety without requiring many animated heroes or weapon assets.

The idea still requires research because modular spell crafting already exists in other games. Pixel Mage needs a distinct rule, presentation, and decision structure rather than only renaming familiar upgrades.

No exact rune count, combination count, wave count, duration, or content total is approved.

## Final Research Round Required

The next and final discovery round must:

1. Compare several spell-building and asset-light games specifically for originality and repetitive-build risks.
2. Examine early commercially released scope where evidence exists, not only years of accumulated updates.
3. Evaluate two or three Pixel Mage directions against:
   - player appeal;
   - originality;
   - code complexity;
   - art and animation burden;
   - mobile-control suitability;
   - testing and balancing burden;
   - realistic implementation batches;
   - monetization compatibility without grind.
4. Recommend one capped direction and list hard exclusions.
5. Stop researching and request explicit owner approval.

## Lock Gate

After that round, update `docs/RELEASE_SCOPE.md` and `docs/DECISIONS.md` with the approved direction. Then build one representative full run, measure it on the target phone, and use that evidence for all later duration and total-content estimates.
