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
- The first Living Spell Trials phone run cleared in 5:49 and confirmed replay curiosity and an entertaining boss, but failed the gate on onboarding clarity, late-run repetition, and Orbit balance.
- Representative correction build `0.2.0-representative.2` addresses that evidence and awaits one consolidated SPCK retest.

That installed build is a **validated native vertical slice**, not the approved commercial launch game.

## Commercial Scope Status

**Option B — Living Spell Trials — was owner-approved on July 13, 2026.**

The locked launch direction uses:

- one mage and exactly one evolving spell;
- three readable spell axes—Form, Essence, and Law—with 3 parts each and 27 possible combinations;
- timed three-act runs, three arena themes, nine authored Trials, six normal enemy behavior families, three bosses, and optional post-victory Endless;
- a Spellbook, Trial unlocks, Mastery, and local records instead of permanent-stat currency grind;
- light narrative framing without a dialogue, cutscene, quest, equipment, or large-roster system.

The representative slice provides one arena, one scheduled 12-wave/three-act run, 2×2×2 spell parts, two normal enemy families, guardians, one boss, wave-boundary checkpoint/resume, and stress-tested runtime budgets. The correction build labels every spell axis, previews complete rewrite results with `NEW`/`KNOWN` status, gives Bolt and Orbit distinct validated roles, removes fixed post-clear timer padding, and makes the pre-boss act a Mote rush, Glyph crossfire, and twin-guardian sequence. Full content and final assets still wait until this slice passes its phone gate and receives the second go/no-go.

The 5:49 phone clear disproved the need to chase the earlier 7–9-minute hypothesis: engagement and clarity now decide the duration. `Pixel Mage` also remains a working title until a later owner-approved store-name decision.

## Run in SPCK Editor

1. Clone or pull `https://github.com/Ezz10099/beast-clash.git`.
2. Open `index.html`.
3. Start SPCK preview/local server.

## Verification and Android

- `npm run check` verifies all eight readable spell combinations, Bolt/Orbit role balance, active wave pacing, save migration/checkpointing, runtime stress limits, three seeded 12-wave clears, the offline release bundle, and Android configuration.
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
3. `docs/RELEASE_SCOPE.md`
4. `docs/DECISIONS.md`
5. `docs/DESIGN_RESEARCH.md`
6. `docs/SCOPE_OPTIONS.md`
7. `docs/ROADMAP.md`
8. `docs/SESSION_HANDOFF.md`

Implement only the locked Living Spell Trials scope. Phone-test and explicitly accept the representative slice before scaling to the remaining launch content.
