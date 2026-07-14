# Pixel Mage — Persistent ChatGPT Development Workflow

## Purpose

This file makes the Product Compass operational throughout a work session. Reading the goal once is not sufficient. Every work-related response and every material implementation decision must remain connected to the current player problem, evidence boundary, approval boundary, and exact next step.

This workflow cannot override `docs/OWNER_MANDATE.md`, `docs/START_HERE.md`, or `docs/DEVELOPMENT_MODEL.md`. It converts them into a repeatable execution process.

## Persistence Layers

The process uses four independent safeguards:

1. **Permanent authority** — `AGENTS.md`, the Owner Mandate, Product Compass, Development Model, decisions, evidence, and release documents preserve durable truth.
2. **Mutable active state** — `docs/ACTIVE_SESSION.md` holds the small set of facts that must remain active during the current work session.
3. **Per-response gate** — every work-related response is checked against the active state before it is sent.
4. **Automated integrity check** — `npm run workflow:check` verifies that the workflow files and mandatory fields remain present and connected to `AGENTS.md`.

No single layer is trusted alone.

## Session Bootstrap

Before the first meaningful work response in a session:

1. Read the authority files in the order defined by `docs/START_HERE.md`.
2. Read `docs/ACTIVE_SESSION.md` after the durable authority files.
3. Check latest `main` and reconcile any conflict between the active state and newer repository evidence.
4. Update `docs/ACTIVE_SESSION.md` when its milestone, build, strongest limitation, approval boundary, evidence, work goal, or exact next step is stale.
5. Report briefly:
   - current milestone and latest accepted build/evidence;
   - strongest current limitation on fun, engagement, build excitement, or replay desire;
   - the meaningful goal of the session.

Do not begin implementation while the active state is missing, contradictory, or stale enough to change the decision.

## Mandatory Per-Response Gate

Before every work-related response, silently answer:

1. **Final goal:** Does this response help finish a worthwhile, understandable, engaging, replayable Pixel Mage rather than merely complete the immediate task?
2. **Player effect:** What does it improve or protect—clarity, moment-to-moment play, meaningful choice, escalation, payoff, curiosity, mastery, or replay desire?
3. **Strongest limitation:** Is this addressing the strongest current limitation recorded in `docs/ACTIVE_SESSION.md`, or is there a clear reason another task must come first?
4. **Continuity and scope:** Does it preserve Pixel Mage continuity, the accepted phone workflow, finishability, and the current approval boundary?
5. **Evidence truth:** Are verified facts, automated evidence, public-human evidence, owner/fresh-player evidence, predictions, and uncertainty clearly separated?
6. **Decision quality:** For a material decision, were real alternatives and tradeoffs considered rather than implementing the first idea?
7. **Persistence:** Did this response create a durable change that must update the active state, handoff, roadmap, decisions, research, or evidence ledger?

If any answer exposes a contradiction, correct the response or update the active state before proceeding.

## Visible Drift Signal

For every material recommendation, coding batch, test request, commercial judgment, or session-direction change, include one compact visible line in the response:

> **Work state:** milestone | strongest limitation | approval boundary | current response goal

Routine clarifications may omit the line, but they still pass the silent gate. This line lets the owner detect drift immediately without reading internal reasoning.

## Material Decision Packet

Before coding a material gameplay, UX, progression, or commercial change, record the following in the `Current Work Packet` section of `docs/ACTIVE_SESSION.md`:

- player-facing problem;
- intended player experience;
- strongest known cause;
- at least two credible alternatives, including no change or a smaller change when relevant;
- selected approach and why it best serves the complete Product Compass;
- predicted visible benefit;
- most likely failure mode;
- evidence required to distinguish success from failure;
- files/systems expected to change;
- approval boundary.

Small mechanical fixes may use a compressed packet, but may not ignore player, phone, stability, offline, or finishability constraints.

## Implementation Loop

For each coherent batch:

1. Reconstruct the relevant player journey.
2. Diagnose the goal-level problem rather than treating the latest request as an automatic implementation specification.
3. Generate and compare alternatives.
4. Record predictions before coding.
5. Implement one bounded related batch.
6. Run `npm run workflow:check` and `npm run check` before a stable code commit.
7. Run `npm run evidence` before a gameplay gate or commercial recommendation.
8. Compare results with predictions and update the project understanding.
9. Ask for a phone or human cell only when subjective evidence can change a real decision and the documented gate is ready.

## Active-State Update Triggers

Update `docs/ACTIVE_SESSION.md` immediately when any of these changes:

- current milestone or build;
- strongest fun/engagement limitation;
- session work goal;
- selected hypothesis or solution;
- approval boundary;
- latest accepted phone or human evidence;
- automated evidence status;
- blocker;
- exact next step.

Do not wait until session closure when a changed fact could affect later responses in the same session.

## Interruption and Context-Recovery Rule

After a long interruption, context compression, contradictory message, or uncertainty about the active state:

1. stop relying on conversational memory;
2. reread `docs/ACTIVE_SESSION.md` and the directly relevant authority file;
3. reconcile against latest `main`;
4. continue only from the recovered state.

Never reconstruct a missing approval, test result, or decision from guesswork.

## Session Closure

Before ending a meaningful session:

1. Ensure stable intended changes are on `main`.
2. Update `docs/ACTIVE_SESSION.md` with the exact live state and next action.
3. Update `docs/SESSION_HANDOFF.md` and `docs/ROADMAP.md`.
4. Update `docs/DECISIONS.md` only for durable decisions.
5. Update research or the evidence ledger when the evidence changed design judgment.
6. State what was verified, what remains provisional, and what the next session must do first.
7. Confirm that the next step is the strongest finishable response to the current fun/engagement limitation—not merely the easiest measurable task.

## Honest Limit

This process strengthens continuity and makes drift visible. It cannot make an AI experience human fun or guarantee that every response is perfect. Human evidence remains required for experienced enjoyment, boredom, fairness, comprehension, replay desire, and value at the appropriate gates.