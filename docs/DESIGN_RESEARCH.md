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

## Research Round 2 — July 13, 2026 (Final)

### Early-scope and solo-development evidence

- **Vampire Survivors genre interviews:** successful derivatives were most legible when they kept the familiar foundation and added one clear structural hook, such as Deep Rock Galactic: Survivor's mining and short mission stages or Rogue: Genesia's campaign map. Rogue: Genesia's creator also described its early public content as too light. The practical lesson is focused differentiation, not either a clone or total reinvention.
  - https://www.gamesradar.com/games/action/vampire-survivors-kicked-off-a-game-development-gold-rush-but-has-a-legitimately-new-genre-emerged-between-the-cash-ins/
- **SNKRX developer postmortem:** a solo developer finished an initial version in one month and spent two more months on content, yet still felt it lacked enough long-term hooks. Reusing stable engine code accelerated development; unclear planning created major delays; the developer later identified visual quality as important for marketing.
  - https://a327ex.com/posts/lessons_second_game
- **SNKRX post-release log:** substantial weekly updates temporarily increased active players but did not themselves increase sales; creator coverage drove discovery. Planning quality strongly correlated with patch quality, and requested looping/endless support required meaningful work.
  - https://a327ex.com/posts/snkrx_log
- **SNKRX commercial analysis:** a strong, streamable mechanical hook supported 15–20-minute replayable runs despite basic graphics.
  - https://newsletter.gamediscover.co/p/snkrx-anatomy-of-a-sleeper-hit
- **10 Minutes Till Dawn:** its released web version promised 5–10-minute sessions and more than 50 upgrades, showing that a compact run can support hours of experimentation when builds visibly differ. The count is evidence of variety's value, not a feasible Pixel Mage target.
  - https://flanne.itch.io/10-minutes-till-dawn
- **Maze Mice:** its pitch is immediately understandable—familiar bullet-heaven play where time moves only when the player moves. This supports one clear marketable twist over many weak novelties.
  - https://trampolinetales.com/mm/presskit

### Originality check for spell construction

Modular spell or weapon construction is already central to several successful games:

- **Magicraft** advertises roughly one hundred spells and free-form combinations.
  - https://store.steampowered.com/app/2103140/Magicraft/
- **Spell Disk** centers runs on crafted spell, disk, and artifact synergies.
  - https://store.steampowered.com/app/2292060/Spell_Disk/
- **Noita** uses deep wand and spell modification.
  - https://noitagame.com/
- **Nova Drift** builds identity around an endlessly evolving weapon/ship and overlapping modifications.
  - https://store.steampowered.com/app/858210/Nova_Drift/
- **Pixel Wizard: Dungeon Survivor** already markets one-finger play and freely linked spells on Google Play.
  - https://play.google.com/store/apps/details?id=com.qerdoplay.pixelwizard

Therefore “combine spell parts” is not a sufficient original hook. The strongest feasible distinction is a deliberately accessible mobile structure: exactly one living spell, exactly three readable words, rewrite one word at a break, and record coherent named combinations in a Spellbook.

### Direct Google Play market and naming check

- **Pixel Mage Survival** already occupies the same broad name and survivor positioning, with 50K+ downloads at the time of research. Visible reviews criticize movement sensitivity, limited visibility, odd hitboxes, and long currency grind.
  - https://play.google.com/store/apps/details?id=com.creativekind.pixelmagesurvival
- Other current titles include **Pixel Mage TD**, **Pixel Mage: Idle RPG**, and **Pixel Wizard: Dungeon Survivor**.
  - https://play.google.com/store/apps/details?id=com.pmtd.hakuna.and
  - https://play.google.com/store/apps/details?id=com.streetcomplete.pixelmagician
  - https://play.google.com/store/apps/details?id=com.qerdoplay.pixelwizard

The implication is not to rename the package now. Pixel Mage should remain the working title until the core hook is proven, then the owner should approve a more searchable display/store name before store-art production.

### Exact repository feasibility audit

The current `game.js` is a stable 1,198-line single-file runtime. Its five wave definitions spawn only 3, 4, 5, 6, and 3 enemies respectively, with the final group containing the boss. Every group appears once at wave start. Bolts travel upward, enemies mostly chase, and four of five upgrades primarily modify numbers.

This explains the owner's roughly one-minute clear. It is not evidence that JavaScript, SPCK, or Capacitor cannot support a longer game.

The accepted foundation already supplies responsive touch input, interruption handling, local persistence, deterministic complete-run automation, projectile caps, a deterministic offline bundle, and verified Android configuration. A commercial expansion is feasible if the monolith is separated into data-driven run, spawn, spell, enemy, save, and UI responsibilities before content multiplies.

The largest technical risks are combination balance, auto-target clarity, projectile stress, save-schema evolution, and resuming longer mobile runs.

### Design deductions

1. Keep drag movement and auto-cast; do not introduce fine twin-stick aiming.
2. Replace one-time groups with timed scheduled pressure and clear behavior changes.
3. Give the run three acts and a boss payoff, but phone-time it before promising a duration.
4. Create variety from code-driven interactions and horizontal discovery, not animated heroes or permanent stat grind.
5. Prototype only 2×2×2 spell parts before committing to 27 combinations.
6. Save at wave boundaries so Android process loss does not erase a longer run.
7. Use strict visual and runtime budgets because combinatorial spells can overwhelm a small screen.
8. Keep narrative to premise-level or light framing.
9. Treat final naming as a commercial gate, not a technical refactor.
10. Stop discovery now and make the owner decision.

## Final Options and Recommendation

Three bounded options are recorded in `docs/SCOPE_OPTIONS.md`:

1. Refined Survivor — lowest risk, weakest identity.
2. Living Spell Trials — recommended balance.
3. Rune-Path Arena — strongest interaction novelty, highest control risk.

The recommendation was **Living Spell Trials**. The owner explicitly approved Option B as written on July 13, 2026. Its proposed 7–9-minute successful-run target was a test hypothesis, not a release promise.

## Representative Phone Evidence — July 13, 2026

The owner completed the first 12-wave representative run in 5:49. They were entertained by trying different things and found the boss interesting, which supports the living-spell direction and boss climax. They did not understand the game fully at first, became bored in the late stages immediately before the boss, rejected a memorized sequence for filling the 8-slot Spellbook as boring, and judged Orbit much weaker than Bolt.

This evidence changes the design judgment:

1. A longer 7–9-minute target would worsen the observed problem; 5:49 was already long enough to expose padding.
2. Spellbook discovery should record enjoyable experimentation, not ask the player to follow an external recipe. The game must preview the whole resulting spell and identify unseen combinations itself.
3. A rewrite is not meaningful when one Form is a clear downgrade. Bolt should own single-target damage while Orbit earns its positioning risk through competitive clears, crowd damage, and shot defense.
4. Quantity escalation alone does not create an act. The pre-boss sequence needs different compositions and spatial pressures, followed by an earlier boss arrival.
5. Positive replay curiosity and boss enjoyment are promising, but they do not pass the representative gate while comprehension and pacing fail.

Correction build `0.2.0-representative.2` encoded those conclusions without expanding the approved representative content cap. The resulting owner feedback is recorded below.

## Correction Feedback and Evidence Model — July 13, 2026

After trying the correction, the owner reported being “really happy” and finding the game entertaining. They estimated that the available representative content supplied about 15 minutes of entertainment, and still believed some players might not easily understand what every rewrite choice provides.

This updates the design judgment without pretending the feedback proves more than it does:

1. The living-spell loop, corrected encounter sequence, and boss payoff are promising enough to continue bounded development.
2. The earlier late-run boredom and severe Orbit complaint were not repeated, but perceived Form balance still remains a human question at the next major gate.
3. Roughly 15 minutes across the representative content is not a launch-duration promise or a reason to multiply content blindly. It establishes a depth gap to solve with the locked reusable systems and capped Trials.
4. Existing labels satisfy an automated information contract, but the remaining concern is whether fresh players actually interpret them. That requires fresh-player evidence, not more wording asserted from the developer side.

The permanent feedback model is now three-lane: CI bot evidence for reliability/balance/pacing proxies, targeted public-review mining for comparable mechanic risks, and small human cells for fun/comprehension/value at major commercial gates. The exact contract and boundaries are recorded in `docs/EVIDENCE_PROTOCOL.md`; stable results belong in `docs/EVIDENCE_LEDGER.md`.

The first full automated baseline ran 200 real-damage trials across all 8 representative builds. Every run won, all deterministic replays matched, the build median clear-time spread was 9.7%, the Bolt/Orbit median gap was 4.9%, and no forced post-schedule wait appeared. These results support runtime and relative-balance confidence under the bot policy; they do not resolve human choice comprehension.

## Targeted Choice-Comprehension Batch — July 13, 2026

The remaining player concern was concrete: a rewrite card named the resulting spell and compressed role, but still asked a new player to mentally compare it with the current spell. Targeted external evidence supports solving that at the decision itself:

- [Xbox Accessibility Guideline 114](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/114) says players should have enough context to know what to expect before activating a UI element, including new players and players with limited short-term memory.
- [Xbox Accessibility Guideline 101](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/101) treats labels, sub-labels, and descriptor text in menus as information that must remain readable.
- The [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/full-list/) recommend simple, clear language, emphasis of important words, and contextual in-game guidance rather than relying on text alone.
- A [Vampire Survivors beginner report](https://www.reddit.com/r/VampireSurvivors/comments/wvbb0n/the_absolute_beginnerjust_installed_guide_to/) describes completing a full run without realizing its evolution system existed. Discovery logs can reward experimentation, but cannot carry first-decision comprehension by themselves.
- A [20 Minutes Till Dawn pacing discussion](https://www.reddit.com/r/20MinutesTillDawn/comments/zcv8ci/this_game_feels_deeply_flawed/) criticizes an opening dominated by accumulating interdependent upgrades. That argues against answering confusion with a longer tutorial or more simultaneous systems.

`0.2.0-representative.4` exposed four separate text facts before the tap. Automation proved completeness, but the owner's immediate visual review rejected the result: it was a wall of text, used too much card space, and took disproportionate time to produce. The obvious missing move was to show the spell's shape.

`0.2.0-representative.5` corrects that mistake. Each rewrite now shows a miniature resulting spell: Bolt or Orbit shape, Ember or Frost color, and Split or Echo pattern. Visible copy is limited to the axis/name, one short old-to-new effect phrase, and a tiny `NEW/KNOWN` badge; Support uses the same compact layout. Full context remains only in the accessible label.

The lesson is broader than this screen: automated evidence should protect a compact visual contract, not reward adding explanatory text. Human visual judgment can invalidate an automation-green interface immediately.

## Research Stop Rule

The required broad research round and owner choice are complete. Stop broad ideation. Continue only targeted review mining tied to a concrete mechanic or commercial gate, and use the evidence protocol before later content estimates or the second go/no-go.
