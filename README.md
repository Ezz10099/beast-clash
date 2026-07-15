# Pixel Mage

Pixel Mage is a mobile-first, one-thumb action roguelite being developed as the owner's first commercially credible Google Play release.

## Goal

Finish, test, package, and publish one polished game with a clear reason to play and replay. Technical validity, scope control, evidence, and release safety must support that goal rather than replace player value.

## Current State

- Custom HTML/CSS/JavaScript runtime, Capacitor 8, and Android project are stable.
- Drag movement, automatic casting, rewrites, bosses, pause/settings, sound, haptics, persistence, win/loss, and replay are implemented.
- The accepted native vertical slice remains the stable Android foundation.
- The representative Living Spell Trial contains 12 waves, three acts, eight spell combinations, progressive enemy roles, guardians, and The Redactor.
- Arabic/RTL, 84-pixel thumb clearance, responsive portrait layout, arena feedback, and enemy variety are implemented.
- The spell-identity batch now gives all six spell parts a build-defining payoff:
  - Bolt precision bursts;
  - Orbit ward pulses from blocked shots;
  - Ember defeat chains;
  - Frost freeze and shatter;
  - Split multi-target broadcasting;
  - Echo status resonance.
- All eight combinations have named English/Arabic identities, visible combat summaries, payoff meters, and previews in rewrites and the Spellbook.
- `test-launcher.html` remains the tap-only SPCK entry point.
- Runtime size is diagnostic only; no arbitrary byte cap limits useful development.
- Outside-player reviews are intentionally deferred until the owner judges the game broad and coherent enough to represent the intended commercial experience.

The installed build is a **validated native foundation**, not yet the finished commercial game.

## Development Direction

**Living Spell Trials remains the active direction.** The binding promise is:

> One thumb. One living spell. Rewrite its Form, Essence, and Law into genuinely different play styles while escalating Trials test the result.

Development continues through substantial research-guided batches using source inspection, public game evidence, automated play, owner SPCK feedback, and bounded prototypes. The Fresh-Player Cell Runner remains available for the later external-review phase but must not interrupt every feature batch.

## Current Spell Identities

- **Wildfire Volley** — Bolt · Ember · Split
- **Afterburn Script** — Bolt · Ember · Echo
- **Crystal Hunt** — Bolt · Frost · Split
- **Shatter Script** — Bolt · Frost · Echo
- **Solar Rings** — Orbit · Ember · Split
- **Cinder Aegis** — Orbit · Ember · Echo
- **Glacial Bastion** — Orbit · Frost · Split
- **Winter Ward** — Orbit · Frost · Echo

## Check the Current Work in SPCK

1. Pull latest `main`.
2. Open `test-launcher.html` → **Preview** → **Open Arabic Game**.
3. Test several rewrites and check:
   - named build identity and Arabic wording;
   - precision/ward meter readability;
   - Split Bolts covering different enemies;
   - Ember chain eruptions;
   - Frost freeze/shatter;
   - Echo resonance;
   - no effect obscures the mage, enemies, projectiles, telegraphs, or red runes.
4. Briefly open **Open English Game** to confirm the English path remains correct.

Do not use SPCK Console, manually edit URLs, or construct tokens.

## Verification and Android

- `npm run workflow:check` protects the persistent development process.
- `npm run localization:check`, `controls:check`, `polish:check`, `fx:check`, and `enemy:check` protect existing accepted systems.
- `npm run spell:check` protects spell identities, targeting, payoff logic, per-Trial reset, Arabic/phone presentation, offline behavior, and release inclusion.
- `npm run check` runs the complete technical and release contract.
- `npm run evidence` runs build, policy, movement, pacing, replay, and starting-spell evidence with enemy variety and spell depth loaded.
- Capacitor uses package ID `com.ezz10099.pixelmage`.
- Debug APKs are direct-install test artifacts; Google Play will use a securely signed release AAB.

See `docs/START_HERE.md`, `docs/SPELL_IDENTITY_RESEARCH.md`, `docs/BUILD.md`, `docs/ANDROID.md`, and `docs/GOOGLE_PLAY.md`.
