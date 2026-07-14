# Pixel Mage — Fresh-Player Commercial Cell

## Status and Decision

**Arabic-capable game path and offline Cell Runner are implemented on `main`; owner phone checks remain pending before the genuine cell.**

This is one consolidated, non-leading human cell for the representative slice. It asks the strongest remaining Product-Compass question: can a newcomer understand and enjoy the living-spell loop, reach a satisfying climax, and want a genuinely different next run without outside explanation?

The result supports the owner's second explicit go/no-go. It does not prove broad market demand, final content volume, or willingness to pay.

## Preferred Execution Tool

Open `cell-runner.html` in SPCK preview on the **observer's** phone. The participant should see only the game.

The runner:

- generates a valid unique `?fresh=` token and the correct English or Arabic game URL;
- rejects a token already used through that browser;
- shows the neutral instruction before play;
- keeps the eight interview questions hidden until silent observation ends;
- provides an attempt timer and the required behavior/issue fields;
- prevents exporting a `GO candidate` unless all six frozen GO conditions are checked;
- autosaves an unnamed draft locally and exports the complete result as Markdown;
- sends no data and is excluded from `dist/`, the APK, and the future AAB.

The runner is execution tooling, not a source of gameplay evidence. This document remains the authority and the manual fallback if the runner is unavailable.

## Participant and Clean Setup

- Use one person who has not played, watched, or been taught Pixel Mage. Record only broad mobile-game familiarity: none, occasional, or frequent.
- Use the target POCO X2/SPCK preview when practical so device behavior stays controlled. If another portrait Android phone is used, record it rather than coaching around device differences.
- Pull the latest `main` in SPCK.
- Preferred: open `cell-runner.html`, choose the language path, record the device/familiarity, confirm the participant is fresh, and use its generated game link.
- Manual fallback for an English participant: open the game with a unique token such as `?fresh=cell-a`.
- Manual fallback for an Arabic participant: open it with both parameters, such as `?fresh=cell-a&lang=ar`. If the preview URL already contains `?`, append the parameters with `&` instead.
- Use a new token for every participant. The token creates an isolated local save with no owner progress, preserves reload checkpoints, sends no data, and does not alter the owner's normal save.
- Use only one language path for the whole cell. Do not switch languages or translate individual game terms during play.
- English neutral instruction: **“Please play this as if you found it yourself. I will not explain it, but you can stop whenever you want.”**
- Arabic neutral instruction: **«العب هذه اللعبة كأنك وجدتها بنفسك. لن أشرحها لك، ويمكنك التوقف متى أردت.»**
- Do not explain drag, automatic casting, red runes, Form/الشكل, Essence/العنصر, Law/طريقة الإطلاق, rewriting, proving, or the Spellbook. Do not suggest a choice.

## Cell Procedure

1. Observe the first attempt silently until victory, defeat, or voluntary stop.
2. Record whether the player starts, moves, reacts to the first two red runes, and chooses a rewrite without help.
3. Record the first visible confusion, first damage that felt unexplained, first boredom comment or disengaged stretch, and the wave where each occurred.
4. Record every Hold/rewrite choice and whether the player comments on a visible combat change.
5. After the result screen appears, wait ten seconds. Record whether the player voluntarily opens the Spellbook, selects a proven spell, or starts another Trial.
6. If the first attempt ends before Wave 3, offer one uncoached retry only.
   - English: **“You may try once more if you want.”**
   - Arabic: **«يمكنك المحاولة مرة أخرى إن أردت.»**
   A second early failure is a gate result; do not teach around it.
7. End the runner's observation stage only after play has ended. Then ask the questions below exactly as shown and preserve the player's own words.
8. Export the Markdown result and return it to the development session without editing answers into more favorable language.

## Exact Questions — English

1. “What did you think you were supposed to do?”
2. “What do Form, Essence, and Law each change? ‘I don't know’ is fine.”
3. “Describe one choice you made, what you expected, and what changed afterward.”
4. “Which moment was most enjoyable? Which moment was least enjoyable or boring?”
5. “Was anything unclear, hard to notice, or unfair?”
6. “Would you choose to start another run now, without a reward for helping us? Why or why not?”
7. “What would you expect or hope to discover next?”
8. “What would a finished version need before it felt worth downloading and keeping?”

## Exact Questions — Arabic

1. «ماذا فهمت أن عليك أن تفعل؟»
2. «ماذا يغيّر كل واحد من: الشكل، والعنصر، وطريقة الإطلاق؟ لا مشكلة إن كانت الإجابة: لا أعرف.»
3. «صف اختيارًا واحدًا قمت به: ماذا توقعت أن يحدث، وماذا تغيّر بعده؟»
4. «ما اللحظة الأكثر متعة؟ وما اللحظة الأقل متعة أو الأكثر مللًا؟»
5. «هل كان هناك شيء غير واضح، أو صعب الملاحظة، أو غير عادل؟»
6. «هل ستختار بدء محاولة أخرى الآن من دون مكافأة مقابل مساعدتنا؟ لماذا أو لماذا لا؟»
7. «ماذا تتوقع أو تأمل أن تكتشف بعد ذلك؟»
8. «ماذا تحتاج النسخة المكتملة حتى تشعر أنها تستحق التنزيل والاحتفاظ بها؟»

Do not correct an answer during the interview. Clarify the game's rules only after every answer is recorded. The Arabic wording is a meaning-preserving version of the English questions, not an additional explanation.

## Decision Rules

A **GO candidate** requires all of the following:

- the player starts, moves, and handles the rune without coaching;
- after the run, the player can explain all three spell axes in functionally correct words and predict at least one rewrite result;
- at least one rewrite produces a noticed change in combat;
- the run has a named enjoyable moment, no sustained boring stretch, and a readable/fair climax;
- the player expresses specific curiosity about another build and either voluntarily starts again or can name what they want to try;
- no control, layout, save, crash, or performance blocker appears.

A **REVISION candidate** is any localized clarity, feedback, fairness, or pacing failure while the central loop and replay curiosity remain positive. Keep launch scaling blocked, diagnose the observed cause, and make one bounded correction.

A **NO-GO/rethink candidate** is triggered by any of these: coaching is needed to play; the three-word system remains unexplained after a full attempt; the player stops from boredom or frustration; the boss/climax has no distinct payoff; there is no specific replay curiosity; or a technical blocker invalidates the run.

One participant cannot establish general market appeal. A positive cell only permits the owner to approve the next bounded production batch; it does not lock the old content cap.

## Pre-Registered Predictions

- **Comprehension:** drag, automatic casting, and the closing rune should be understood from play. Form/الشكل should be easiest to explain; Frost/جليد and Echo/تكرار are the most likely effects to be missed.
- **Enjoyment:** active dodging, a visibly changing spell, and The Redactor should provide the strongest moments.
- **Boredom:** the highest risk is repetition across the middle acts or repeated rewrite pauses, not forced timer padding.
- **Fairness:** the rune should feel avoidable; overlapping caster, guardian, and rune pressure is the likeliest source of unexplained damage.
- **Replay motivation:** selecting a proven starting spell should create one concrete “try this next” impulse, but the representative slice may still feel too narrow for launch value.
- **Likely first failure:** the first rewrite screen—understanding that one part changes, the complete result is previewed, and every option grows the spell equally.
- **Language-specific risk:** an awkward translation or RTL layout problem may create confusion that is not caused by the central game loop. Record it as a technical/localization issue rather than coaching around it.
- **Execution-specific risk:** a reused token, early interview reveal, incomplete notes, or observer prompting can invalidate the cell. The runner reduces these risks but does not replace observer discipline.

## Result Record

The runner exports these fields; the manual fallback must preserve the same structure.

- Build/commit:
- Language path: English / Arabic
- Fresh token:
- Device and orientation:
- Mobile-game familiarity:
- First attempt result, wave, and time:
- Retry result, if offered:
- Started without help:
- Moved without help:
- First two rune reactions:
- Rewrite chosen without help:
- Choices by wave:
- Noticed spell changes:
- First confusion/unfair moment:
- First boredom/disengagement moment:
- Boss/climax reaction:
- Voluntary post-result action:
- Answers 1–8:
- Translation or RTL issues:
- Other technical issues:
- Prediction matches:
- Prediction misses and likely causes:
- GO criteria checks:
- Gate result: GO candidate / REVISION candidate / NO-GO-rethink candidate
- Owner second go/no-go:
