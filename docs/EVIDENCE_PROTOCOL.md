# Pixel Mage — Evidence Protocol

## Purpose

This protocol prevents product decisions from depending on chat memory, one person's stamina, or an automated score presented as human opinion. Codex owns the continuous evidence lane. The owner coordinates short human cells only when a major commercial gate is explicitly ready.

No analytics SDK, account, network permission, or player-data collection is part of this system. Bot runs execute locally and in GitHub Actions.

## Three Evidence Lanes

1. **Automated runtime evidence** — deterministic bot runs, state validation, balance proxies, pacing proxies, save migration, stress caps, bundle checks, and Android checks.
2. **Targeted review mining** — before a material mechanic or commercial decision, Codex searches current public reviews and primary product sources for the closest comparable behavior, records links and dates in `docs/DESIGN_RESEARCH.md`, and states what is inference rather than fact.
3. **Human cells** — fresh players answer a few behavior questions at major commercial gates. These cells judge fun, comprehension, touch feel, boredom, replay desire, and value; automation cannot.

## Commands

- `npm run check` is the fast deterministic development suite.
- `npm run evidence` is the representative evidence gate. It writes `artifacts/evidence/evidence-report.json` and `.md`.
- GitHub Actions runs both, uploads the evidence reports as `pixel-mage-evidence`, then builds the debug APK.

Generated reports are build artifacts and are not committed. Stable conclusions belong in `docs/EVIDENCE_LEDGER.md`.

## Representative Evidence Contract

The full gate first runs all 8 representative spell combinations across the same 25 seeds: 200 complete, real-damage bot runs. Each fixed-build bot uses Hold between waves and deterministic danger-aware movement appropriate to its current Form. One repeat per build verifies replay determinism.

It then runs 100 additional real-damage trials from the same starting spell: 25 seeds each for always-Hold, mixed Hold/rewrite, discovery-first, and rewrite-only policies. Movement adapts to the current spell. This second matrix exists because fixed-build runs cannot detect whether the game quietly punishes players for engaging with rewriting.

| Gate | Green | Yellow | Red |
|---|---|---|---|
| Matrix | All configured runs recorded | — | Missing run |
| Runtime integrity | 0 timeouts, invalid states, or cap violations | — | Any violation |
| Determinism | 8/8 replays match | — | Any mismatch |
| Bot survivability | Every build wins at least 80% | 60–79.9% weakest build | Below 60% |
| Dominance proxy | Build median spread ≤20% and Form gap ≤15% | Spread ≤35% and Form gap ≤25% | Worse |
| Rewrite incentive | Every policy wins at least 80%, median clear spread ≤20%, and all finish at level 12 | Every policy wins at least 60% and spread ≤35% | Worse |
| Pacing proxy | Empty stretch stays inside authored arrival gap, no post-schedule wait, boss arrives within 9 seconds | At most 2 seconds over the authored gap, ≤0.5-second post-schedule wait, or ≤1-second boss overrun | Worse |
| Choice feedback loop | 8/8 builds expose a compact resulting-spell visual, next-wave threat context, and post-tap transformation confirmation | — | Missing, verbose, or inconsistent loop |

A red result fails CI. Yellow preserves the report and permits diagnosis, but cannot support a commercial gate recommendation by itself. Threshold changes require a reason in the evidence ledger; do not move them merely to turn a regression green.

## Interpretation Boundary

Automation can support claims about termination, finite state, caps, deterministic outcomes, relative outcomes across the configured builds and choice policies, authored empty intervals, and whether required visual/context/confirmation states exist.

Automation cannot establish that a human understood the text, enjoyed the run, felt a choice was fair, wanted to replay, or received enough entertainment for the price. Those claims require human evidence and must remain labeled pending until collected.

## Human-Cell Trigger

Do not repeatedly ask the owner or friends for micro-tests. Request one short, consolidated, asynchronous cell only when:

1. the player-facing batch is complete;
2. `npm run check` and `npm run evidence` have no red gate;
3. the exact fresh-player questions and stop conditions are written down; and
4. the result can cause a real go/no-go, scope, store, monetization, or release decision.

The owner is not expected to have testers available on command. Codex must continue to handle all safe automated work before asking.

## Session Rule

Every meaningful gameplay or commercial session must read this protocol, preserve the latest stable conclusion in the ledger, and update the roadmap and handoff. A future agent may improve the harness, but may not silently skip it or substitute bot results for people.
