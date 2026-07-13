# Pixel Mage — Start Here

This is the permanent entry point for every future ChatGPT or Codex session. Chat memory is helpful; the repository is the source of truth.

## Fixed Project Context

- Product: Pixel Mage
- Repository: `Ezz10099/beast-clash`
- Working branch: `main`
- Goal: a commercially credible, engaging, time-bounded Google Play release
- Primary validation device: POCO X2-class Android phone in 20:9 portrait
- Layout requirement: responsive across portrait screens, with safe-area support
- Workflow: ChatGPT/Codex edits GitHub; the owner pulls in SPCK and tests on the phone
- Focus rule: Pixel Mage remains the only active game until Google Play testing or formal cancellation

## Product Compass

The final goal is to **finish and publish a worthwhile Android game**, not to keep polishing a prototype forever. Pixel Mage should be immediately understandable, entertaining moment to moment, visibly transformed by meaningful spell choices, paced toward satisfying guardians and bosses, and replayable without permanent-power grinding. It needs a recognizable identity, enough honest value for a commercial release, responsive one-thumb portrait play, stable offline behavior, and a finishable path through this GitHub–SPCK workflow to Google Play.

Player promise: **One thumb. One living spell. Rewrite its Form, Essence, and Law into genuinely different play styles while escalating Trials test the result.** Every rewrite should create a visible tradeoff, every run should build toward a climax, and discovery should open new ways to play rather than a rote checklist.

The content cap is a production fence, not the whole design. For every material improvement, Codex must trace the player's logic—what the player sees, expects, chooses, observes, and wants next—then generate and compare solutions using source inspection, automated evidence, targeted comparable research, and bounded prototypes. Owner feedback remains decisive human evidence, but must not be treated as the only source of ideas.

## Authority Order

Read these files in order:

1. `AGENTS.md`
2. `docs/START_HERE.md`
3. `docs/RELEASE_SCOPE.md`
4. `docs/DECISIONS.md`
5. `docs/EVIDENCE_PROTOCOL.md` and `docs/EVIDENCE_LEDGER.md`
6. `docs/DESIGN_RESEARCH.md`
7. `docs/SCOPE_OPTIONS.md`
8. `docs/ROADMAP.md`
9. `docs/SESSION_HANDOFF.md`
10. `docs/GOOGLE_PLAY.md`
11. `docs/BUILD.md` and `docs/ANDROID.md`

If documents conflict, reconcile them before coding. A new explicit owner decision may override an older document, but every affected document must be updated immediately.

## Current High-Level State

- The gameplay foundation, controls, release UX, persistence, code-drawn polish, sound, haptics, and deterministic web bundle passed SPCK phone testing.
- The browser release candidate is frozen on `web-rc-0.1.0`.
- Capacitor and the Android project are configured.
- The first cloud debug APK was installed and accepted on July 13, 2026 with no reported bugs.
- The accepted five-wave APK lasts roughly one minute and remains the stable native foundation.
- That build is a validated native vertical slice, not the approved commercial launch game.
- The old tiny release contract has been superseded as a commercial target.
- The final focused research round is complete and three capped directions are recorded in `docs/SCOPE_OPTIONS.md`.
- Option B — Living Spell Trials — and its capped launch direction were owner-approved on July 13, 2026.
- The first complete Living Spell Trials phone run cleared in 5:49. The owner wanted to experiment and enjoyed the boss, with no reported layout or runtime blocker, but the gate failed because onboarding remained unclear, the late pre-boss stretch became boring, and Orbit felt much weaker than Bolt.
- Correction build `0.2.0-representative.2` made the owner “really happy” and was reported as entertaining, with roughly 15 minutes of available representative experimentation. Choice outcomes may still be unclear to some players.
- Evidence build `0.2.0-representative.3` added the required 200-run real-damage matrix, deterministic replays, balance/pacing/choice-schema reports, and a CI artifact.
- Text-heavy choice build `0.2.0-representative.4` passed automation but failed the owner's immediate visual review.
- Compact visual build `0.2.0-representative.5` replaced the text wall with miniature resulting-spell shapes, two short text lines, smaller cards, and a tiny discovery badge; the owner approved it in SPCK.
- Player-logic build `0.2.0-representative.6` closes more of the choice loop: a visual starting spell, next-wave threat context before choosing, immediate transformation confirmation, persistent three-part combat feedback, clearer status/Law effects, and an explicit Spellbook proof rule.
- Full launch content and final assets remain blocked on the `.6` phone result, unresolved progression/replay issues, a later fresh-player cell, and the second explicit go/no-go.
- Pixel Mage remains the working title; a final display/store name decision is required before store-art production.
- Signing, AAB production, store materials, policy declarations, monetization, Play testing, and publication remain pending.

The exact latest state belongs in `docs/SESSION_HANDOFF.md`.

## Current Commercial Gate

Run one owner SPCK pass on `0.2.0-representative.6`: start fresh, make several rewrites, and judge whether the loop now reads naturally from **incoming threat → choice → visible transformation → combat result**. Do not recruit friends yet. After remaining fundamental player-logic issues are resolved, open one consolidated fresh-player cell and then the second explicit go/no-go. Do not scale content before that gate closes.

## Mandatory Session Protocol

At the start:

1. Read the authority files.
2. Check the latest `main`.
3. Report the current milestone, latest accepted phone test, and one meaningful session goal.
4. Distinguish locked decisions from research candidates.

During work:

1. Work in substantial related batches.
2. Preserve the SPCK and responsive portrait workflow.
3. Stay inside the current approval boundary.
4. Run `npm run check` before publishing code.
5. Run `npm run evidence` before gameplay gates or commercial recommendations.
6. Ask for one consolidated asynchronous human cell only at a major commercial gate.

Before ending:

1. Push intended stable changes to `main`.
2. Update the handoff and roadmap.
3. Update decisions only for durable decisions.
4. Update design research when evidence changes the recommendation.
5. Never call untested behavior or provisional scope accepted.

## Decision Authority

ChatGPT/Codex leads routine technical, research, architecture, testing, and workflow choices. The owner remains creative director and approves major or irreversible decisions.

## Asset Safety

For every external or generated release asset, preserve its source, prompt or license, creation date, and commercial-use evidence.

## New-Session Prompt

> Continue Pixel Mage in `Ezz10099/beast-clash` on `main`. Read `AGENTS.md` and `docs/START_HERE.md`, then follow their authority links, including the evidence protocol and ledger. Option B — Living Spell Trials — is locked. Report the current milestone and one substantial session goal, complete one approved verified batch, run the required evidence, push it to `main`, and update the handoff and roadmap. Do not scale beyond the representative slice until its commercial gate passes.
