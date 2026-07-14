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
- `main` includes corrected Arabic/RTL wording, 84-pixel thumb clearance, a rebuilt portrait composition, and a new read-only arena feedback layer without changing combat, balance, progression, or saves.
- The portrait layout uses one compact header, a dominant unchanged 320×480 arena, and one unified combat dashboard with health and wave meters attached to their labels.
- `arena-fx.js`/`.css` add act-based atmosphere, Ember/Frost edge identity, a short touch trail, wave-entry pulses, and damage/critical-health edge feedback. The overlay is pointer-transparent and reads only displayed HUD text.
- Start, rewrite, Spellbook, and Options panels share one responsive scroll-safe overlay system.
- `docs/ARABIC_GLOSSARY.md` permanently standardizes the Arabic game and interview terminology.
- `cell-runner.html` is an offline repository-only observer tool for the frozen fresh-player cell.
- `test-launcher.html` is the tap-only SPCK entry point. It opens clean Arabic, clean English, and the Cell Runner without Console input, URL editing, or manual token construction.
- The next step is one consolidated owner layout/combat-feedback/Arabic/English/Cell Runner check, then one genuine fresh-player commercial cell and the owner's second explicit go/no-go.

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

## Check the Current Work in SPCK

1. Pull the latest `main`.
2. Open `test-launcher.html` and tap **Preview**.
3. Tap **Open Arabic Game**.
4. Start a Trial and check the arena atmosphere, touch trail, wave pulse, damage-edge feedback, unified dashboard, and Arabic fit.
5. Reach Act II or Act III if practical and confirm the atmosphere changes without hiding enemies, projectiles, or red runes.
6. Reach one rewrite, open the Spellbook, and open Options; confirm the overlay effects disappear behind menus and nothing clips.
7. Press Android **Back**, tap **Open English Game**, and confirm the same presentation remains clean in English.
8. Press Android **Back**, tap **Open Cell Runner**, choose Arabic, and confirm the neutral instruction and eight questions still read naturally.

Do not use SPCK Console, edit the preview URL, or construct a `fresh` token manually. The launcher handles those details.

For a genuine fresh-player cell, open the Cell Runner from the launcher, generate a new unused token, and follow `docs/FRESH_PLAYER_CELL.md` without coaching.

## Verification and Android

- `npm run workflow:check` protects the persistent development process, visible owner workflow, and Arabic glossary references.
- `npm run localization:check` verifies default English, approved Arabic terms, RTL activation, essential translations, canvas text, retired-term rejection, whitespace stability, and fresh-save compatibility.
- `npm run controls:check` verifies the scaled thumb clearance and unchanged mouse input.
- `npm run polish:check` verifies the portrait shell, dominant arena, unified dashboard, attached meters, panel-state transitions, responsive overlays, restart confirmation, and no direct save/game-state access.
- `npm run fx:check` verifies the pointer-transparent 320×480 overlay, English/Arabic HUD parsing, act/essence mapping, touch/wave/damage feedback contracts, reduced-motion support, offline behavior, and release inclusion.
- `npm run cell:check` verifies offline-only runner behavior, unique URLs, reused-token rejection, hidden interview flow, corrected frozen questions, GO enforcement, export, mobile layout, and production-bundle exclusion.
- `npm run launcher:check` verifies visible tap navigation, automatic clean English/Arabic tokens, direct Cell Runner opening, mobile layout, offline behavior, and production-bundle exclusion.
- `npm run check` runs those checks plus gameplay, fully minified release construction, the 100 KB ceiling, artwork, and Android configuration gates.
- `npm run evidence` runs the 200-build matrix, 100 real choice-policy trials, idle/movement controls, deterministic replays, and starting-spell payoff checks.
- `npm run preview` serves the exact generated production `dist/` bundle; repository-only test tools are opened directly through SPCK Preview.
- Capacitor uses package ID `com.ezz10099.pixelmage`.
- Debug APKs are direct-install testing artifacts.
- The future Google Play upload is a securely signed release AAB.

See `docs/ANDROID.md`, `docs/BUILD.md`, and `docs/GOOGLE_PLAY.md`.

## Controls

Mobile:

- Drag anywhere in the arena; the mage follows a target above the thumb.
- Spells cast automatically.
- Pause opens the compact options, resume, and protected restart panel.

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
7. `docs/ARABIC_GLOSSARY.md`
8. the latest scope, decisions, evidence, roadmap, and handoff documents.

Apply the Product Compass and development model to every material decision. Do not scale remaining launch content before the fresh-player cell and second go/no-go.
