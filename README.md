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
- The complete current five-wave run takes roughly one minute.

That installed build is a **validated native vertical slice**, not the approved commercial launch game.

## Commercial Scope Status

The final focused research round is complete. The commercial gameplay scope still requires explicit owner approval.

Three bounded directions are compared in `docs/SCOPE_OPTIONS.md`. The recommendation is **Living Spell Trials**:

- one mage and one evolving spell;
- three readable spell words that can be rewritten between timed waves;
- a Spellbook for horizontal discovery rather than currency grind;
- a 12-wave representative run that must be phone-timed before full content production;
- limited reusable arenas, enemy behaviors, and bosses instead of a large animated roster.

The recommended counts and 7–9-minute run target are test hypotheses, not locked promises. No gameplay expansion begins until the owner chooses or edits an option.

`Pixel Mage` is also a working title. Existing Google Play games use closely related names, so the final display/store name must be approved before store assets are produced. The package ID remains unchanged unless the owner explicitly decides otherwise.

## Run in SPCK Editor

1. Clone or pull `https://github.com/Ezz10099/beast-clash.git`.
2. Open `index.html`.
3. Start SPCK preview/local server.

## Verification and Android

- `npm run check` runs ten complete automated flows and verifies the offline release bundle and Android configuration.
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
6. `docs/ROADMAP.md`
7. `docs/SESSION_HANDOFF.md`

Do not implement a speculative scope expansion. Research first, obtain explicit approval for the capped commercial scope, then update the authority documents before gameplay expansion.
