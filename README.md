# Pixel Mage

Pixel Mage is a mobile-first, one-thumb action roguelite being developed as the owner's first commercially credible Google Play release.

The repository remains simple enough for the owner's normal workflow: ChatGPT/Codex edits GitHub, the owner pulls in SPCK Editor, and testing happens on an Android phone.

## Goal

Finish, test, package, and publish one polished, time-bounded game on Google Play before returning to another game project.

The goal is not merely to upload a technically valid APK. The launch version must provide a complete, engaging reason to play and replay while remaining realistic for the available coding, art, animation, and mobile-first workflow.

## Current State

- The custom HTML/CSS/JavaScript runtime is stable.
- Drag movement, automatic casting, upgrades, boss behavior, pause, settings, sound, haptics, persistence, win, loss, and replay are implemented.
- The deterministic web release candidate is frozen on `web-rc-0.1.0`.
- Capacitor 8 and the Android project are configured.
- The first cloud debug APK was installed and accepted on July 13, 2026 with no reported bugs.
- The accepted five-wave APK remains the stable native foundation and takes roughly one minute.
- The first Living Spell Trials phone run cleared in 5:49 and exposed onboarding, late-run repetition, and Orbit-balance problems.
- The correction was later reported as highly entertaining, with roughly 15 minutes of representative experimentation; fresh-player choice comprehension remains open.
- Evidence build `0.2.0-representative.3` added the green 200-run automated matrix and CI report.
- Text-heavy choice build `.4` failed immediate visual review. Compact visual `.5` passed the owner's SPCK review.
- `0.2.0-representative.6` closed that observable loop and passed SPCK. `.7` removed the rewrite power penalty and passed SPCK. `.8` adds readable movement pressure and lets every proven Spellbook combination become the next Trial's starting spell; the owner passed its consolidated SPCK test.

That installed build is a **validated native vertical slice**, not the approved commercial launch game.

## Commercial Scope Status

**Option B — Living Spell Trials — is the current evidence-supported direction.** The Product Compass is binding; its exact old cap is revisable when a better evidence-backed route appears.

The current working launch direction uses:

- one mage and exactly one evolving spell;
- three readable spell axes—Form, Essence, and Law—with 3 parts each and 27 possible combinations;
- timed three-act runs, three arena themes, nine authored Trials, six normal enemy behavior families, three bosses, and optional post-victory Endless;
- a Spellbook, Trial unlocks, Mastery, and local records instead of permanent-stat currency grind;
- light narrative framing without a dialogue, cutscene, quest, equipment, or large-roster system.

The representative slice provides one arena, one scheduled 12-wave/three-act run, 2×2×2 spell parts, two normal enemy families, guardians, one boss, wave-boundary checkpoint/resume, and stress-tested runtime budgets. The correction build labels every spell axis, gives Bolt and Orbit distinct validated roles, removes fixed post-clear timer padding, and makes the pre-boss act a Mote rush, Glyph crossfire, and twin-guardian sequence. The current loop shows the resulting spell, coming threat, transformation, combat effect, shared spell growth, active dodge pressure, and a usable horizontal Spellbook. Full content and final assets still wait for one fresh-player cell and the owner's second go/no-go.

The 5:49 phone clear disproved the need to chase the earlier 7–9-minute hypothesis: engagement and clarity now decide the duration. `Pixel Mage` also remains a working title until a later owner-approved store-name decision.

## Run in SPCK Editor

1. Clone or pull `https://github.com/Ezz10099/beast-clash.git`.
2. Open `index.html`.
3. Start SPCK preview/local server.

## Verification and Android

- `npm run check` verifies all eight readable spell combinations, Bolt/Orbit role balance, active wave pacing, save migration/checkpointing, runtime stress limits, three seeded 12-wave clears, the offline release bundle, and Android configuration.
- `npm run evidence` runs 200 real-damage build trials plus 100 Hold/mixed/discovery-first/rewrite-only trials, deterministic replays, regression gates, and balance/pacing/choice-feedback reports.
- `npm run preview` serves the exact generated `dist/` bundle.
- Capacitor uses package ID `com.ezz10099.pixelmage`.
- Debug APKs are direct-install testing artifacts.
- The future Google Play upload is a securely signed release AAB.

See `docs/ANDROID.md`, `docs/BUILD.md`, and `docs/GOOGLE_PLAY.md`.

## Controls

Mobile:

- Drag inside the arena to move toward the finger.
- Spells cast automatically.
- Pause opens the compact options, resume, and restart panel.

Laptop:

- WASD or Arrow keys move.
- Spells cast automatically.
- Space or Enter starts.
- P or Escape pauses or resumes.

## Project Authority

Start every new development session with:

1. `AGENTS.md`
2. `docs/START_HERE.md`
3. `docs/DEVELOPMENT_MODEL.md`
4. `docs/RELEASE_SCOPE.md`
5. `docs/DECISIONS.md`
6. `docs/EVIDENCE_PROTOCOL.md` and `docs/EVIDENCE_LEDGER.md`
7. `docs/DESIGN_RESEARCH.md`
8. `docs/SCOPE_OPTIONS.md`
9. `docs/ROADMAP.md`
10. `docs/SESSION_HANDOFF.md`

Apply the locked Product Compass and `docs/DEVELOPMENT_MODEL.md` to every material decision. The Living Spell direction is current but revisable; do not scale remaining launch content before the fresh-player cell and second go/no-go.
