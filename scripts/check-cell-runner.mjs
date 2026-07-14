import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { createHeadlessCellRunner } from './headless-cell-runner.mjs';
import { RELEASE_FILES } from './release-config.mjs';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('cell-runner.html', root), 'utf8');
const css = await readFile(new URL('cell-runner.css', root), 'utf8');
const js = await readFile(new URL('cell-runner.js', root), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));

for (const file of ['cell-runner.html', 'cell-runner.css', 'cell-runner.js']) {
  assert.ok(!RELEASE_FILES.includes(file), `${file} must remain outside the production release bundle`);
}

assert.match(html, /viewport-fit=cover/, 'runner must respect phone safe areas');
assert.match(html, /id="interviewSection"[^>]*hidden/, 'interview must be hidden before observation ends');
assert.match(html, /id="gateSection"[^>]*hidden/, 'gate review must be hidden before the interview');
assert.match(html, /id="resultSection"[^>]*hidden/, 'result export must be hidden before gate review');
assert.match(html, /Offline only · local draft storage/, 'privacy boundary must be visible');
assert.match(html, /excluded from the Android release bundle/i, 'release exclusion must be visible');
assert.doesNotMatch(html, /(?:src|href)=["']https?:\/\//i, 'runner must not load remote resources');

for (const id of [
  'languagePath', 'freshToken', 'testUrl', 'neutralInstruction', 'beginObservationButton',
  'timerDisplay', 'finishObservationButton', 'questionList', 'finishInterviewButton',
  'gateResult', 'generateRecordButton', 'resultRecord', 'copyRecordButton', 'resetRunnerButton',
]) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `runner is missing #${id}`);
}

assert.match(css, /safe-area-inset-top/, 'runner must preserve top safe area');
assert.match(css, /safe-area-inset-bottom/, 'runner must preserve bottom safe area');
assert.match(css, /button, \.link-button \{ min-height: 48px; \}/, 'runner controls must remain touch sized');
assert.match(css, /@media \(max-width: 620px\)/, 'runner must have a compact phone layout');

assert.match(js, /pixel_mage_cell_runner_draft_v1/, 'runner must use a dedicated local draft key');
assert.match(js, /pixel_mage_cell_runner_used_tokens_v1/, 'runner must remember used tokens locally');
assert.match(js, /\^\[a-z0-9_-\]\{1,32\}\$/i, 'runner token validation must match the game fresh-token contract');
assert.match(js, /searchParams\.set\("fresh"/, 'runner must construct isolated fresh URLs');
assert.match(js, /searchParams\.set\("lang", "ar"\)/, 'runner must construct the Arabic path explicitly');
assert.match(js, /usedTokens\(\)\.includes\(token\)/, 'runner must reject reused participant tokens');
assert.match(js, /showStage\("observation"\)/, 'setup must advance to observation');
assert.match(js, /showStage\("interview"\)/, 'questions must be revealed only after observation');
assert.match(js, /showStage\("gate"\)/, 'interview must advance to gate review');
assert.match(js, /showStage\("result"\)/, 'gate review must advance to result export');
assert.match(js, /GO candidate requires all six frozen GO checks/, 'runner must not permit a partial GO candidate');
assert.match(js, /No answer/, 'runner must preserve explicit non-answers rather than silently omitting them');
assert.match(js, /text\/markdown/, 'runner must export a Markdown result');

for (const forbidden of [/\bfetch\s*\(/, /XMLHttpRequest/, /WebSocket/, /sendBeacon/, /EventSource/]) {
  assert.doesNotMatch(js, forbidden, 'runner must remain offline and telemetry-free');
}

const requiredProtocolText = [
  'Please play this as if you found it yourself. I will not explain it, but you can stop whenever you want.',
  'العب هذه اللعبة كأنك وجدتها بنفسك. لن أشرحها لك، ويمكنك التوقف متى أردت.',
  'What did you think you were supposed to do?',
  'What do Form, Essence, and Law each change?',
  'Would you choose to start another run now, without a reward for helping us?',
  'ماذا فهمت أن عليك أن تفعل؟',
  'ماذا يغيّر كل واحد من: الشكل، والعنصر، وطريقة الإطلاق؟',
  'هل ستختار بدء محاولة أخرى الآن من دون مكافأة مقابل مساعدتنا؟',
];
for (const text of requiredProtocolText) {
  assert.ok(js.includes(text), `runner is missing frozen protocol text: ${text}`);
}

for (const field of [
  'Build/commit', 'Language path', 'Fresh token', 'Device and orientation', 'Mobile-game familiarity',
  'First attempt result, wave, and time', 'Retry result, if offered', 'Started without help',
  'First two rune reactions', 'Choices by wave', 'Noticed spell changes', 'First confusion/unfair moment',
  'First boredom/disengagement moment', 'Boss/climax reaction', 'Voluntary post-result action',
  'Translation or RTL issues', 'Other technical issues', 'Prediction matches',
  'Prediction misses and likely causes', 'Gate result', 'Owner second go/no-go',
]) {
  assert.ok(js.includes(field), `result export is missing: ${field}`);
}

assert.equal(packageJson.scripts['cell:check'], 'node --check cell-runner.js && node scripts/check-cell-runner.mjs');
assert.match(packageJson.scripts.check, /npm run cell:check/, 'normal checks must include the cell runner contract');

const runner = await createHeadlessCellRunner({ code: js });
const elements = runner.elements;
assert.equal(elements.get('setupSection').hidden, false);
assert.equal(elements.get('observationSection').hidden, true);
assert.equal(elements.get('interviewSection').hidden, true, 'questions must not be visible during setup');
assert.match(elements.get('testUrl').value, /fresh=cell-/, 'startup must generate a fresh token URL');
assert.equal(elements.get('questionList').querySelectorAll('textarea').length, 8, 'the frozen interview must contain eight questions');

const originalToken = elements.get('freshToken').value;
elements.get('languagePath').value = 'ar';
elements.get('languagePath').handlers.change();
assert.match(elements.get('testUrl').value, /fresh=/);
assert.match(elements.get('testUrl').value, /lang=ar/);
assert.match(elements.get('neutralInstruction').textContent, /لن أشرحها/);

elements.get('familiarity').value = 'occasional';
elements.get('device').value = 'POCO X2 · portrait';
elements.get('participantFreshConfirmed').checked = true;
elements.get('beginObservationButton').handlers.click();
assert.equal(elements.get('observationSection').hidden, false);
assert.equal(elements.get('interviewSection').hidden, true, 'interview must remain hidden during silent observation');
assert.match(runner.storage.get('pixel_mage_cell_runner_used_tokens_v1'), new RegExp(originalToken));

elements.get('finishObservationButton').handlers.click();
assert.equal(elements.get('interviewSection').hidden, false);
const answers = elements.get('questionList').querySelectorAll('textarea');
answers.forEach((answer, index) => { answer.value = `answer ${index + 1}`; });
elements.get('finishInterviewButton').handlers.click();
assert.equal(elements.get('gateSection').hidden, false);

elements.get('gateResult').value = 'GO candidate';
elements.get('generateRecordButton').handlers.click();
assert.equal(elements.get('resultSection').hidden, true, 'partial GO evidence must not export as a GO candidate');
assert.match(elements.get('statusMessage').textContent, /requires all six/);
for (const id of ['gateControls', 'gateAxes', 'gateChange', 'gateEnjoyment', 'gateReplay', 'gateTechnical']) {
  elements.get(id).checked = true;
}
elements.get('generateRecordButton').handlers.click();
assert.equal(elements.get('resultSection').hidden, false);
assert.match(elements.get('resultRecord').value, /Language path: Arabic/);
assert.match(elements.get('resultRecord').value, /Answers 1–8/);
assert.match(elements.get('resultRecord').value, /Gate result: GO candidate/);

const reusedStorage = [...runner.storage.entries()].filter(([key]) => key !== 'pixel_mage_cell_runner_draft_v1');
const secondRunner = await createHeadlessCellRunner({ code: js, storageEntries: reusedStorage });
secondRunner.elements.get('freshToken').value = originalToken;
secondRunner.elements.get('freshToken').handlers.input();
secondRunner.elements.get('familiarity').value = 'none';
secondRunner.elements.get('device').value = 'portrait phone';
secondRunner.elements.get('participantFreshConfirmed').checked = true;
secondRunner.elements.get('beginObservationButton').handlers.click();
assert.equal(secondRunner.elements.get('setupSection').hidden, false, 'a reused token must not begin a new cell');
assert.match(secondRunner.elements.get('statusMessage').textContent, /already used/);

process.stdout.write('Fresh-player cell runner checks passed.\n');
