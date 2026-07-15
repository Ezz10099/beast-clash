# Pixel Mage — Spell Identity and Build-Depth Research

## Status

- Date: July 15, 2026
- Purpose: guide the first substantial development-first batch after external player reviews were deferred.
- Evidence boundary: public reviews and comparable systems support design hypotheses; they do not prove that Pixel Mage players will enjoy the result.

## Comparable lessons

- *Noita* gains depth by letting projectile, modifier, multicast, trajectory, timing, and utility rules interact. The useful lesson is not its complexity, but that each component changes behavior and creates unexpected combinations rather than supplying only numeric bonuses.
- *Magicraft* is praised for build diversity around modular spell creation, while its reported balance problems warn that free-form combinations need clear roles and controlled payoff.
- *Vampire Survivors* and related auto-attacking games demonstrate that simple input can support deep replay when upgrades visibly transform attacks and different players produce recognizably different builds.
- *Brotato* is frequently distinguished from shallow imitators by dynamic build strategy and experimentation, despite automatic attacking and short waves.
- *Slay the Spire* analysis repeatedly highlights small choices that snowball into a coherent strategy. The relevant pattern is that each decision should alter later priorities, not merely add isolated power.
- Negative reviews of repetitive combo systems warn that a combination layer becomes stale when the same sequence is always correct or its payoff arrives too late.
- Bullet-heaven criticism repeatedly identifies visual clutter as a failure mode. Build depth must preserve immediate readability on a 320×480 portrait arena.

## Diagnosis of the representative spell system

The existing six parts already changed baseline behavior:

- Bolt targeted one threat; Orbit occupied close space and blocked shots.
- Ember burned and splashed; Frost slowed.
- Split cast three immediate copies; Echo repeated later.

However, most interactions stopped at the first-order effect. A player could read the parts, but the complete spell did not always develop a distinct combat rhythm or visible payoff. Split Bolts often chased the same target, Echo mostly repeated damage, Frost lacked a culmination, Ember lacked a satisfying defeat chain, and Orbit blocked shots without converting successful defense into momentum.

## Alternatives considered

1. **Add more spell parts immediately.** Rejected for this batch because it multiplies content before the existing 2×2×2 foundation fully earns its identity.
2. **Add passive statistical bonuses per combination.** Rejected because it would deepen arithmetic more than play style and would weaken visual comprehension.
3. **Create axis payoffs that combine naturally.** Selected because it strengthens all eight existing spells, preserves the readable three-word grammar, and creates future expansion rules.

## Selected interaction model

### Form

- **Bolt — Precision:** repeated Bolt hits on one target build toward a visible burst.
- **Orbit — Ward:** blocked enemy shots charge a visible meter; three blocks release a nearby defensive pulse.

### Essence

- **Ember — Chain burn:** defeating a burning enemy erupts into nearby targets.
- **Frost — Freeze and shatter:** repeated Frost hits temporarily freeze movement; another Frost hit shatters the frozen target for bonus damage.

### Law

- **Split — Broadcast:** split Bolts seek different living threats instead of wasting all copies on one target when alternatives exist.
- **Echo — Resonance:** an echoed hit gains a payoff when the first cast already established burn or slow.

## Combination identities

1. Bolt · Ember · Split — **Wildfire Volley**
2. Bolt · Ember · Echo — **Afterburn Script**
3. Bolt · Frost · Split — **Crystal Hunt**
4. Bolt · Frost · Echo — **Shatter Script**
5. Orbit · Ember · Split — **Solar Rings**
6. Orbit · Ember · Echo — **Cinder Aegis**
7. Orbit · Frost · Split — **Glacial Bastion**
8. Orbit · Frost · Echo — **Winter Ward**

Each identity receives an English and Arabic promise in the live dashboard, rewrite choices, and Spellbook. The names organize memory and anticipation; the mechanics remain the proof.

## Predictions

- Bolt/Echo should feel like focused setup and payoff rather than delayed duplicate damage.
- Bolt/Split should visibly cover multiple threats.
- Orbit should feel less passive because successful blocking produces an attack pulse.
- Ember should create more satisfying crowd collapses.
- Frost should create a readable control climax rather than indefinite slowing.
- Rewrite choices should become easier to compare because each complete result names its intended rhythm.

## Main risks

- Secondary damage may raise survivability or reduce encounter tension too far.
- Frost feedback may become visually noisy beside enemy telegraphs and red runes.
- The extra dashboard card may make short-screen layouts too tall.
- Named identities may overpromise if the interaction is too subtle.

## Required evidence

- deterministic pure-function checks for identities, targeting, freeze durations, resonance, and payoff meters;
- existing headless gameplay/evidence matrix with the spell-depth runtime loaded;
- release, offline, Capacitor, and Android pipeline;
- owner SPCK judgment of visibility, layout, impact, and whether each tested rewrite feels meaningfully different.

## Sources

- https://noitagame.com/
- https://store.steampowered.com/app/2103140/Magicraft/
- https://store.steampowered.com/app/858210/Nova_Drift/
- https://store.steampowered.com/app/1942280/Brotato/
- https://www.gdcvault.com/play/1025731/-Slay-the-Spire-Metrics
- https://www.wired.com/story/dead-cells-roguelike
- https://www.rockpapershotgun.com/vampire-survivors-likes-need-to-cut-through-the-clutter
