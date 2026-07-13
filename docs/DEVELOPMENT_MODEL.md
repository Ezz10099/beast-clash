# Pixel Mage — Goal-Driven Development Model

## Purpose and Authority

This file is the project's external development brain. It connects the binding Product Compass in `docs/START_HERE.md` to everyday diagnosis, design, coding, research, verification, and learning. Read it before every material gameplay, UX, progression, or commercial change.

The final goal and player promise are locked. Mechanics, content counts, interfaces, processes, and prior solutions are hypotheses. Every meaningful code decision must inherit the goal through this chain:

**Final goal → intended player experience → feature purpose → alternatives and tradeoffs → code → evidence → updated understanding.**

The owner does not have to invent each improvement or repeatedly remind Codex of earlier reasoning. Codex owns maintaining and applying this model.

## Detailed Final Outcome

Finish and publish Pixel Mage as a genuinely worthwhile Android game that:

- is immediately understandable without outside explanation;
- feels entertaining moment to moment, not merely functional;
- gives meaningful choices that visibly change how the player fights;
- builds toward satisfying power, escalation, and boss climaxes;
- offers enough non-grindy replay value to justify a commercial release;
- has its own recognizable identity rather than feeling like a smaller clone;
- is polished, stable, responsive, offline-capable, and comfortable on portrait phones;
- is realistically finishable through the ChatGPT–GitHub–SPCK workflow;
- reaches Google Play through testing, signed AAB delivery, store materials, policy compliance, publication, and maintainable updates;
- has a credible opportunity to earn money; and
- actually gets finished instead of expanding forever.

Player promise: **One thumb. One living spell. Rewrite its Form, Essence, and Law into genuinely different play styles while escalating Trials test the result.**

## Persistent Project Understanding

Repository memory must preserve four things:

1. the final goal, player promise, intended player, and production constraints;
2. observed player behavior, successful decisions, failed attempts, and why they succeeded or failed;
3. current unknowns and confidence boundaries, rather than guesses presented as facts; and
4. the latest playable state, evidence, commercial gate, and strongest next question.

Chat memory is useful but insufficient. New sessions reload these facts from the authority files. When a correction reveals a reusable lesson, update the relevant decision, evidence ledger, research, roadmap, and handoff in the same batch.

## Goal-to-Code Loop

For every material change, Codex must:

1. **Reconstruct the whole relevant player journey.** Trace what the player sees, expects, chooses, does, observes, understands, and wants next. Inspect upstream and downstream effects rather than isolating the requested screen or mechanic.
2. **Diagnose the goal-level problem.** Treat an owner request or complaint as evidence, not automatically as the literal implementation specification. Identify which part of the detailed final outcome is blocked.
3. **State an experience hypothesis.** Explain how the proposed mechanic should produce a runtime dynamic and why that dynamic could create the intended feeling or motivation.
4. **Generate alternatives.** Use source inspection, prior project evidence, targeted public-human evidence, cross-platform mechanics, design-pattern libraries, experimental games, bounded prototypes, and original synthesis. Include a no-change or smaller-change option when relevant.
5. **Compare against the complete goal.** Consider comprehension, moment-to-moment play, meaningful consequences, escalation, replay, identity, portrait-phone fit, stability, production cost, commercial value, and finishability. Do not optimize one axis while silently harming the rest.
6. **Predict before coding.** Record the expected visible behavior, likely benefit, likely failure mode, and evidence capable of distinguishing them.
7. **Implement one coherent bounded batch.** Code is the delivery mechanism for the chosen player outcome, not the endpoint.
8. **Verify at the correct evidence level.** Test technical truth, synthetic behavior, presentation logic, and subjective claims separately.
9. **Calibrate and persist.** Compare predictions with results, record misses and their causes, and update the project model before moving on.

Small mechanical fixes do not require ceremony, but they still inherit the same player, phone, stability, offline, and finishability constraints.

## Estimating Fun Potential Without On-Demand Testers

Actual enjoyment is a human experience. Fun and engagement **potential** can still be estimated strongly enough to reject weak ideas, improve promising ones, and decide what deserves a prototype.

A new mechanic is often novel as a combination rather than as a human experience. Decompose it as:

**Player action → game response → repeated dynamic → intended feeling or motivation.**

Then gather evidence at three distances:

1. **Exact analogues:** the same or nearly the same mechanic, if it exists.
2. **Component analogues:** its pieces in mobile, PC, console, browser, tabletop, mods, game jams, academic prototypes, or other genres.
3. **Experience analogues:** evidence about the underlying autonomy, competence, discovery, expression, tension, surprise, mastery, escalation, or relief even when the mechanic is different.

Public review mining must include repeated mechanic-specific praise **and** complaints, multiple implementations where possible, audience and platform context, and failures caused by clarity, balance, controls, pacing, progression, or presentation. A popular game does not prove that one mechanic caused its success. Research is complete only when it changes, rejects, strengthens, or narrows a design decision.

Idea discovery may draw from released games on any appropriate platform, experimental and jam games, gameplay-pattern libraries, tabletop systems, mods, postmortems, research prototypes, and original recombination. A PC or tabletop interaction is useful only after a deliberate mobile translation check: one-thumb input, portrait readability, cognitive load, session shape, performance, offline behavior, and production cost.

## Evidence Boundaries

| Evidence source | Can support | Cannot establish alone |
|---|---|---|
| Source inspection and deterministic tests | Actual rules, state transitions, regressions, limits, saves, packaging | What a player notices or enjoys |
| Bots and procedural play styles | Dominance, dead choices, reachability, pacing, strategy diversity, active-vs-idle outcomes, run divergence | Fun, fairness, comprehension, satisfaction, commercial value |
| Fresh-context AI or heuristic review | Missing information, contradictions, likely confusion, general playability risks, alternative hypotheses | Human emotion or representative preference |
| Public reviews, research, and comparable products | Existing human reactions, recurring risks, motivational evidence, market language, implementation conditions | Certainty that a new combination will work in Pixel Mage |
| Owner and fresh-player cells | Experienced fun, boredom, confusion, touch feel, replay desire, perceived value | Universal market behavior from a tiny sample |

Never convert a bot win, schema check, research citation, AI opinion, or popularity count into proof that players will enjoy Pixel Mage.

## Synthetic Evaluation

When a mechanic can be modeled, use several bounded play styles rather than one optimal bot: novice/simple, optimizer, explorer, conservative, aggressive, stubborn/hold, and deliberately inactive when relevant. Measure only defensible behavioral properties, including:

- dominant, meaningless, or systematically punished choices;
- action-to-consequence delay and visibility;
- meaningful state and strategy diversity;
- run-to-run divergence and usable unlock payoff;
- downtime, repetition, escalation, recovery, and climax timing;
- skill expression through differences between simple and stronger policies; and
- runtime, readability, and stress limits on the target form factor.

Fresh-context AI criticism should inspect the actual build or captured states without receiving the designer's intended explanation. It is an additional adversarial lens, not a synthetic human rating.

## Decision Format

Do not invent a precise “fun score.” A mechanic assessment should state:

- the proposed engine of fun and its connection to the Product Compass;
- supporting and opposing public-human evidence;
- synthetic and technical evidence;
- uniqueness, mobile fit, production cost, and likely failure modes;
- remaining uncertainty and the cheapest experiment that can reduce it; and
- one recommendation: reject/park, research further, micro-prototype, build a bounded batch, or open a human/commercial gate.

Only converging evidence justifies expensive production. Novelty increases uncertainty; it does not excuse unsupported optimism or require abandoning the idea.

## Prediction Calibration

Before a rare owner or fresh-player gate, record concise predictions about comprehension, enjoyment, boredom, fairness, replay motivation, and the most likely failure moment. After the result:

1. compare prediction with observed feedback;
2. record what Codex correctly anticipated and missed;
3. identify why the miss occurred;
4. add the reusable warning pattern to the project model; and
5. adjust future research, inspection, prototypes, or evidence—not merely the wording of the test.

Sparse human feedback should teach the project repeatedly instead of being consumed once. Human cells remain reserved for major gates where subjective reality can change a commercial, scope, monetization, or release decision.

## Honest Limit

This model cannot make AI literally experience fun or guarantee how a market will respond. It can substantially reduce dependence on owner creativity and on-demand testers by combining persistent context, human evidence already available in the world, structured creative synthesis, synthetic behavior, adversarial review, and calibrated rare human judgments.

The development target is not certainty. It is the strongest evidence-supported, creatively promising, finishable next decision in service of the locked final goal.
