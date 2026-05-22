# Beast Clash — Animal System

## Purpose
Define a reusable, production-friendly framework for designing new animals without breaking combat readability or MVP scope.

## 1) Animal Spec Schema (Design + Implementation Aligned)

Use this schema for each animal entry:

- **Name**
- **Role** (primary, secondary)
- **Tier** (Common / Apex / Rare Biome / Extinct / Boss)
- **Biome Affinity** (one primary)
- **Traits** (2–4)
- **Stat Bias** (HP, ATK, DEF, SPD, Range profile)
- **Basic Attack**
  - Target rule (nearest, lowest HP, backline, etc.)
  - Damage type (physical, venom, bleed, impact)
  - Cadence and range
- **Ultimate**
  - Trigger/cooldown
  - Effect and duration
  - Counterplay
- **Passive**
  - Always-on rule
  - Scaling behavior
- **Strengths**
- **Weaknesses**
- **VFX/SFX clarity notes**

## 2) Role-to-Stat Baselines (High-Level)

- **Tank:** High HP/DEF, low-medium ATK, low mobility.
- **Assassin:** High burst ATK/SPD, low HP, target access tools.
- **Bruiser:** Medium-high HP/ATK, medium DEF, sustained uptime.
- **Poison/Control:** Medium HP, low burst, high utility value.
- **Charger:** Medium-high HP, engage burst, position disruption.
- **Aerial Striker:** Medium HP, high target reach, fragile if grounded.
- **Support:** Low-medium HP/ATK, high team utility.
- **Swarm/Pack:** Individually weak, multiplicative team pressure.

## 3) Trait Translation Rules (Real Animal -> Mechanic)

- Venom -> DoT / anti-heal / slow.
- Thick hide -> Damage reduction / stagger resistance.
- Ambush predator -> First-hit crit / stealth-entry bonus.
- Pack hunter -> Ally-nearby buffs.
- Flight/glide -> Temporary untargetability or lane bypass.
- Horn charge -> Displacement + stun on collision.

Rule: each animal should use 1–2 core trait translations, not 5+ effects.

## 4) Ability Budget (Anti-Bloat)

Per animal in MVP:
- 1 basic attack pattern
- 1 ultimate
- 1 passive
- Max 1 status-heavy mechanic (poison/stun/bleed/etc.)

Avoid overloaded kits until roster fundamentals are stable.

## 5) Counterplay Rules

Every animal must have at least one exploitable weakness:
- Range gap
- Cooldown vulnerability
- Low tenacity
- Poor multi-target handling
- Biome dependence

No unstoppable kits in early balance.

## 6) Progression Lanes for Animals

### Common Animals
- Early unlocks, tutorial-friendly mechanics.
- Main purpose: teach roles and counters.

### Apex Animals
- Midgame power picks with sharper identity.
- Higher mastery, stronger tradeoffs.

### Rare Biome Animals
- Conditional power spikes in favored biome.
- Drives biome strategy and roster diversity.

### Extinct Animals
- Exotic mechanics and visual novelty.
- Introduced after core balance is stable.

### Boss Beasts
- PvE encounter anchors.
- Multi-phase or scripted mechanics, separate from standard PvP tuning.

## 7) First 6 Animal Validation Checklist

For Gorilla, Tiger, Crocodile, Eagle, Viper, Rhino:
- Role is obvious in first 10 seconds.
- Basic attack is visually distinct.
- Ultimate has clear anticipation and impact.
- Passive influences outcome over full match.
- At least one clear counter exists.
- Works in portrait readability constraints.

## 8) Do Not Overbuild

- Ship six polished animals before expanding roster.
- Do not implement deep sub-systems per animal early.
- Reuse shared status systems instead of bespoke logic per beast.
