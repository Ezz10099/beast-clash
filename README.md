# Pixel Mage

Pixel Mage is a mobile-first, one-thumb action roguelite being developed as the owner's first commercially credible Google Play release.

The repository remains simple enough for the normal workflow: ChatGPT/Codex edits GitHub, the owner pulls in SPCK Editor, and testing happens on an Android phone.

## Goal

Finish, test, package, and publish one polished, time-bounded game on Google Play before returning to another game project.

The goal is not merely to upload a technically valid APK. The launch version must provide a complete, engaging reason to play and replay while remaining realistic for the available coding, art, animation, and mobile-first workflow.

## Current State

- The custom HTML/CSS/JavaScript runtime is stable.
- Drag movement, automatic casting, rewrites, boss behavior, pause, settings, sound, haptics, persistence, win, loss, and replay are implemented.
- Capacitor 8 and the Android project are configured.
- The first cloud debug APK was installed and accepted on July 13, 2026 with no reported bugs.
- The accepted five-wave APK remains the stable native foundation and takes roughly one minute.
- The first Living Spell Trials phone run cleared in 5:49 and exposed onboarding, late-run repetition, and Orbit-balance problems.
- The corrected loop was later reported as entertaining, with roughly 15 minutes of representative experimentation.
- Text-heavy `.4` failed review. Compact `.5`, closed-loop `.6`, equal-growth `.7`, and agency/progression `.8` passed owner SPCK review.
- `.9` added token-isolated clean saves and the frozen protocol in `docs/FRESH_PLAYER_CELL.md`; gameplay remained unchanged.
- `main` now adds a bounded Arabic/RTL test path with `?lang=ar`, compatible with `?fresh=<token>&lang=ar`, without changing gameplay or the default English path.
- `cell-runner.html` is an offline repository-only observer tool that generates isolated links, blocks reused tokens, hides the interview during play, records the frozen cell, and exports Markdown.
- The next step is one owner Arabic meaning/layout check plus one owner Cell Runner usability check, then one genuine fresh-player commercial cell and the owner's second explicit go/no-go.

The installed build is a **validated native vertical slice**, not the approved commercial launch game.

## Commercial Scope Status

**Option B — Living Spell Trials — is the current evidence-supported direction.** The Product Compass is binding; its exact old cap remains revisable when a better evidence-backed route appears.

The representative slice provides:

- one mage and one evolving three-part spell;
- Bolt/Orbit Forms, Ember/Frost Essences, and Split/Echo Laws;
- one 12-wave/three-act run;
- two normal enemy families, guardian charges, and The Redactor boss;
- compact visual rewrites, next-threat previews, and shared spell growth;
- readable red-rune movement pressure;
- a functional Spellbook with selectable proven starting spells;
- local records, checkpoint/resume, and isolated fresh-player saves.

Full launch content, final assets, monetization, and store production remain blocked pending the fresh-player result and second go/no-go.

`Pixel Mage` remains a working title until a later owner-approved store-name decision.

## Run in SPCK Editor

1. Clone or pull `https://github.com/Ezz10099/beast-clash.git`.
2. Open `index.html` for the game or `cell-runner.html` for the observer tool.
3. Start SPCK preview/local server.

Normal English game path: open the game preview normally.

Owner Arabic meaning/layout check:

`?fresh=owner-ar-check&lang=ar`

Owner Cell Runner check:

- open `cell-runner.html`;
- choose Arabic and confirm the generated URL includes both `fresh` and `lang=ar`;
- use dummy answers to walk through setup, observation, interview, gate, and export;
- reset it afterward.

For a genuine fresh-player cell, generate a new unused token in the runner and follow `docs/FRESH_PLAYER_CELL.md` without coaching.

## Verification and Android

- `npm run workflow:check` protects the persistent development process.
- `npm run localization:check` verifies default English, Arabic/RTL activation, essential translations, canvas text, whitespace stability, and fresh-save compatibility.
- `npm run cell:check` verifies offline-only runner behavior, unique URL generation, reused-token rejection, hidden interview flow, exact questions, GO enforcement, export, mobile layout, and production-bundle exclusion.
- `npm run check` runs those checks plus gameplay, release-bundle, artwork, and Android configuration gates.
- `npm run evidence` runs the 200-build matrix, 100 real choice-policy trials, idle/movement controls, deterministic replays, and starting-spell payoff checks.
- `npm run preview` serves the exact generated production `dist/` bundle; the Cell Runner is intentionally opened directly from the repository preview.
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
2. `docs/OWNER_MANDATE.md`
3. `docs/START_HERE.md`
4. `docs/DEVELOPMENT_MODEL.md`
5. `docs/CHATGPT_WORKFLOW.md`
6. `docs/ACTIVE_SESSION.md`
7. the latest scope, decisions, evidence, roadmap, and handoff documents.

Apply the Product Compass and development model to every material decision. Do not scale remaining launch content before the fresh-player cell and second go/no-go.
