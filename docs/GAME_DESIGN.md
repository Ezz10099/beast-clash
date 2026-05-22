# Beast Clash — Game Design Document

## 1) Core Game Identity

**Genre/Format**
- Mobile portrait 2D auto-battle.
- Fast match loops (target: 60–120 seconds).
- Team-based combat where positioning, role mix, and timing matter more than manual aiming.

**Fantasy Hook**
- Real animal traits become combat mechanics (e.g., venom, charge force, pack tactics, glide/flight pressure).
- Dark fantasy beast arena tone: rugged arenas, ominous UI accents, primal SFX, high-impact VFX.

**MVP Intent**
- Keep the first playable loop small and readable.
- Validate combat clarity, role identity, and fun before scale.

## 2) Core Combat Loop (Practical)

1. Player chooses a 3-beast squad.
2. Fight starts automatically in portrait arena.
3. Beasts use basic attacks and triggered abilities by cooldown/conditions.
4. Match ends by wipeout or timeout with HP tiebreak.
5. Rewards feed lightweight progression (upgrade materials, unlock currency).

## 3) Design Pillars

- **Readable in 1 second:** Player should instantly see who is tanking, diving, controlling, or supporting.
- **Biology-driven mechanics:** Mechanics must map to believable animal behavior.
- **Short, replayable battles:** Minimal downtime and fast rematch cadence.
- **Small-system depth:** Meaningful team composition without over-complex UI.

## 4) Animal Design Rules (Must-Have Template)

Every animal spec must define:

1. **Role** (primary + optional secondary).
2. **Traits** (2–4 biological traits turned into gameplay properties).
3. **Basic Attack** (single clear behavior, range, cadence).
4. **Ultimate** (fight-swinging signature action; clear tell and payoff).
5. **Passive** (always-on identity rule, no micromanagement required).
6. **Biome Affinity** (where it performs best; grants contextual bonus).
7. **Rarity/Tier** (Common, Apex, Rare Biome, Extinct, Boss).

### Quality gates for new animals
- Has one clear job in team comps.
- Ultimate and passive are not redundant.
- Counterplay exists (at least one weakness).
- Visual/sound cue is distinguishable in portrait view.

## 5) Role Catalog (Initial)

- **Tank:** Frontline soak, displacement resistance, protect allies.
- **Assassin:** Bursts fragile targets, mobility/spike windows.
- **Bruiser:** Sustained frontline DPS + moderate durability.
- **Poison/Control:** Damage-over-time, slows, disables, zoning.
- **Charger:** Momentum engage, knockback/knockdown initiation.
- **Aerial Striker:** Air pressure, backline poke, angle-based threat.
- **Support:** Heal, cleanse, buffs, energy/cooldown utility.
- **Swarm/Pack:** Multiple units or stacking bonuses through numbers/synergy.

## 6) MVP Animal Set (First 6 to Polish)

1. **Gorilla** — Bruiser/Control
2. **Tiger** — Assassin
3. **Crocodile** — Tank/Control
4. **Eagle** — Aerial Striker
5. **Viper** — Poison/Control
6. **Rhino** — Charger/Tank

Goal: these six should establish all major combat patterns before adding roster scale.

## 7) Biome Affinity System (Simple Version)

- Biomes: Jungle, Savannah, Wetland, Mountain, Desert (expand later).
- Each beast has one primary affinity.
- In matching biome: small stat or effect bonus (e.g., +8% HP, +10% poison duration).
- Avoid hard counters in MVP; keep bonuses light and understandable.

## 8) Rarity/Tier Intention

- **Common:** Easy to unlock; straightforward kits.
- **Apex:** Strong role specialists with sharper strengths/weaknesses.
- **Rare Biome:** Niche mechanics linked to specific arenas.
- **Extinct:** Experimental mechanics with unique visuals.
- **Boss Beasts:** PvE encounter units; oversized mechanics, not standard PvP balance.

## 9) Do Not Overbuild (MVP Guardrails)

- Keep MVP scope tight: one arena style, one mode, six polished animals.
- Do **not** target 100 animals early.
- Prioritize combat clarity, role readability, and feel over feature count.
- Expand only after the first six animals feel balanced and fun.
