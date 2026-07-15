import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

const [agents, workflow, activeSession, startHere, arabicGlossary, decisions] = await Promise.all([
  readFile(new URL('AGENTS.md', root), 'utf8'),
  readFile(new URL('docs/CHATGPT_WORKFLOW.md', root), 'utf8'),
  readFile(new URL('docs/ACTIVE_SESSION.md', root), 'utf8'),
  readFile(new URL('docs/START_HERE.md', root), 'utf8'),
  readFile(new URL('docs/ARABIC_GLOSSARY.md', root), 'utf8'),
  readFile(new URL('docs/DECISIONS.md', root), 'utf8'),
]);

for (const requiredReference of [
  'docs/CHATGPT_WORKFLOW.md',
  'docs/ACTIVE_SESSION.md',
  'docs/ARABIC_GLOSSARY.md',
  'mandatory per-response gate',
  'Work state:',
  'Current Work Packet',
  'visible tap path',
]) {
  assert.match(
    agents,
    new RegExp(requiredReference.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
    `AGENTS.md must preserve the persistent workflow reference: ${requiredReference}`,
  );
}

for (const requiredSection of [
  '## Session Bootstrap',
  '## Mandatory Per-Response Gate',
  '## Visible Drift Signal',
  '## Material Decision Packet',
  '## Implementation Loop',
  '## Development-First External Review Timing',
  '## Owner Phone Workflow Gate',
  '## Active-State Update Triggers',
  '## Interruption and Context-Recovery Rule',
  '## Session Closure',
]) {
  assert.match(
    workflow,
    new RegExp(requiredSection.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `docs/CHATGPT_WORKFLOW.md is missing ${requiredSection}`,
  );
}

for (const requiredOwnerWorkflowRule of [
  'visible, touch-sized route',
  'Do not require the owner to type into the JavaScript Console',
  'Do not require manual query-string editing',
  'Name the exact file to open and the exact buttons to tap',
]) {
  assert.match(
    workflow,
    new RegExp(requiredOwnerWorkflowRule.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
    `docs/CHATGPT_WORKFLOW.md is missing owner workflow rule: ${requiredOwnerWorkflowRule}`,
  );
}

for (const requiredReviewTimingRule of [
  'Continue major research-guided development batches',
  'Do not ask the owner to run the Fresh-Player Cell Runner merely because one feature batch completed',
  'broader, coherent pre-release build',
  'The owner decides when the game is substantial enough',
]) {
  assert.match(
    workflow,
    new RegExp(requiredReviewTimingRule.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
    `docs/CHATGPT_WORKFLOW.md is missing development-first review rule: ${requiredReviewTimingRule}`,
  );
}

assert.match(decisions, /## D-020 — Develop Broadly Before External Player Reviews/);
assert.match(decisions, /Do not repeatedly stop development for the Fresh-Player Cell Runner/i);

for (const requiredField of [
  '**Current milestone:**',
  '**Current implementation:**',
  '**Latest accepted phone behavior:**',
  '**Latest automated evidence:**',
  '**Strongest current fun/engagement limitation:**',
  '**Current approval boundary:**',
  '**Current workflow goal:**',
  '**Exact next product action:**',
  '## Response Watchlist',
  '## Current Work Packet',
  '## Session Update Log',
]) {
  assert.match(
    activeSession,
    new RegExp(requiredField.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `docs/ACTIVE_SESSION.md is missing ${requiredField}`,
  );
}

assert.doesNotMatch(
  activeSession,
  /\b(?:TBD|TODO|UNKNOWN)\b/i,
  'Mandatory active-session state must not contain unresolved placeholder values',
);

for (const requiredReference of [
  'docs/CHATGPT_WORKFLOW.md',
  'docs/ACTIVE_SESSION.md',
  'docs/ARABIC_GLOSSARY.md',
]) {
  assert.match(
    startHere,
    new RegExp(requiredReference.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `docs/START_HERE.md must reference ${requiredReference}`,
  );
}

for (const requiredTerm of [
  '| Trial | التحدّي |',
  '| Rewrite | إعادة الصياغة |',
  '| Essence | الجوهر |',
  '| Law | القانون |',
  '| Echo | صدى |',
]) {
  assert.ok(arabicGlossary.includes(requiredTerm), `Arabic glossary is missing: ${requiredTerm}`);
}

console.log('Pixel Mage workflow persistence checks passed.');
