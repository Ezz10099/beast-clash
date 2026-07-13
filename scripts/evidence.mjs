import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createHeadlessGame } from './headless-game.mjs';

const root = new URL('../', import.meta.url);
const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));
const outputDirectory = resolve(fileURLToPath(new URL('../artifacts/evidence/', import.meta.url)));
const seedsPerBuild = 25;

const builds = [];
for (const form of ['bolt', 'orbit']) {
  for (const essence of ['ember', 'frost']) {
    for (const law of ['split', 'echo']) builds.push({ form, essence, law });
  }
}

const seeds = Array.from({ length: seedsPerBuild }, (_, index) => (
  (0x9e3779b9 + Math.imul(index + 1, 0x6d2b79f5)) >>> 0
));

const { evaluate, sandbox } = await createHeadlessGame();
sandbox.__PIXEL_MAGE_EVIDENCE__ = { builds, seeds };

const raw = JSON.parse(evaluate(`
  JSON.stringify((function () {
    settings.sound = false;
    settings.haptics = false;

    const config = __PIXEL_MAGE_EVIDENCE__;
    const MAX_RUN_FRAMES = 42000;
    const DECISION_GAP = 8;

    function resetRandom(seed, buildIndex) {
      let value = (seed ^ Math.imul(buildIndex + 1, 0x45d9f3b)) >>> 0;
      Math.random = function () {
        value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
        return value / 4294967296;
      };
    }

    function distanceToSegment(px, py, ax, ay, bx, by) {
      const dx = bx - ax;
      const dy = by - ay;
      const lengthSquared = dx * dx + dy * dy;
      if (lengthSquared === 0) return Math.hypot(px - ax, py - ay);
      const t = clamp(((px - ax) * dx + (py - ay) * dy) / lengthSquared, 0, 1);
      return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
    }

    function candidateScore(x, y, build, frame, seed, target) {
      const player = state.player;
      let score = Math.hypot(x - player.x, y - player.y) * 0.04;
      const patrolPhase = frame / 165 + (seed % 997) / 997 * Math.PI * 2;
      const patrolX = W / 2 + Math.cos(patrolPhase) * 112;
      const patrolY = (H + 50) / 2 + Math.sin(patrolPhase * 0.83) * 150;
      score += Math.hypot(x - patrolX, y - patrolY) * 0.11;

      for (const enemy of state.enemies) {
        if (enemy.hp <= 0) continue;
        const distance = Math.max(1, Math.hypot(x - enemy.x, y - enemy.y));
        const selected = target && enemy.id === target.id;
        let separation = enemy.boss ? 76 : enemy.elite ? 68 : enemy.family === 'chaser' ? 54 : 42;
        if (build.form === 'orbit' && selected) separation = enemy.boss ? 58 : enemy.elite ? 50 : 40;
        const weight = enemy.boss ? 14 : enemy.elite ? 10 : enemy.family === 'chaser' ? 6 : 3;
        if (distance < separation) score += (separation - distance) ** 2 * weight;
        score += (enemy.boss ? 1800 : enemy.elite ? 1100 : 420) / (distance + 8);

        if (enemy.attackState === 'telegraph' || enemy.attackState === 'dashTell') {
          const lineDistance = distanceToSegment(x, y, enemy.x, enemy.y, enemy.targetX, enemy.targetY);
          if (lineDistance < 38) score += (38 - lineDistance) ** 2 * 9;
        } else if (enemy.attackState === 'dash') {
          const projectedX = enemy.x + enemy.dashVx * 18;
          const projectedY = enemy.y + enemy.dashVy * 18;
          const lineDistance = distanceToSegment(x, y, enemy.x, enemy.y, projectedX, projectedY);
          if (lineDistance < 42) score += (42 - lineDistance) ** 2 * 12;
        }
      }

      for (const shot of state.enemyProjectiles) {
        const travelFrames = Math.min(28, Math.hypot(x - player.x, y - player.y) / Math.max(0.1, player.speed));
        const projectedX = shot.x + shot.vx * travelFrames;
        const projectedY = shot.y + shot.vy * travelFrames;
        const distance = Math.hypot(x - projectedX, y - projectedY);
        if (distance < 46) score += (46 - distance) ** 2 * 11;
        const pathDistance = distanceToSegment(x, y, shot.x, shot.y, shot.x + shot.vx * 36, shot.y + shot.vy * 36);
        if (pathDistance < 25) score += (25 - pathDistance) ** 2 * 7;
      }

      if (target) {
        const targetDistance = Math.hypot(x - target.x, y - target.y);
        if (build.form === 'orbit') {
          const ideal = target.boss ? 66 : target.elite ? 58 : 50;
          score += Math.abs(targetDistance - ideal) * 0.75;
        } else if (targetDistance < 108) {
          score += (108 - targetDistance) ** 2 * 0.22;
        }
      }

      return score;
    }

    function chooseDestination(build, frame, seed) {
      const target = SpellSystem.selectTarget();
      const candidates = [];
      for (const x of [30, 72, 116, 160, 204, 248, 290]) {
        for (const y of [86, 136, 190, 244, 298, 352, 402, 440]) candidates.push({ x, y });
      }
      for (let index = 0; index < 12; index += 1) {
        const angle = Math.PI * 2 * index / 12;
        candidates.push({
          x: clamp(state.player.x + Math.cos(angle) * 62, 20, W - 20),
          y: clamp(state.player.y + Math.sin(angle) * 62, 76, H - 34),
        });
      }
      if (target && build.form === 'orbit') {
        const orbitRadius = target.boss ? 66 : target.elite ? 58 : 50;
        for (let index = 0; index < 12; index += 1) {
          const angle = Math.PI * 2 * index / 12;
          candidates.push({
            x: clamp(target.x + Math.cos(angle) * orbitRadius, 20, W - 20),
            y: clamp(target.y + Math.sin(angle) * orbitRadius, 76, H - 34),
          });
        }
      }

      let best = candidates[0];
      let bestScore = Infinity;
      for (const candidate of candidates) {
        const score = candidateScore(candidate.x, candidate.y, build, frame, seed, target);
        if (score < bestScore) {
          best = candidate;
          bestScore = score;
        }
      }
      pointerControl.active = true;
      pointerControl.x = best.x;
      pointerControl.y = best.y;
    }

    function finiteRuntime() {
      if (!state.player) return false;
      const values = [
        state.time,
        state.wave,
        state.waveFrame,
        state.runElapsed,
        state.score,
        state.player.x,
        state.player.y,
        state.player.hp,
        state.player.maxHp,
        state.player.speed,
        state.player.power,
        state.player.haste,
      ];
      for (const enemy of state.enemies) values.push(enemy.x, enemy.y, enemy.hp, enemy.speed);
      for (const projectile of state.projectiles) values.push(projectile.x, projectile.y, projectile.life, projectile.damage);
      for (const shot of state.enemyProjectiles) values.push(shot.x, shot.y, shot.life, shot.vx, shot.vy);
      return values.every(Number.isFinite);
    }

    function chooseUpgrade(policy, decisionIndex, seenSpells) {
      const choices = upgradeChoices.children;
      const hold = choices.find(function (button) { return button.dataset.axis === 'hold'; });
      const rewrites = choices.filter(function (button) { return ['form', 'essence', 'law'].includes(button.dataset.axis); });
      if (policy === 'rewrite') return rewrites[decisionIndex % rewrites.length];
      if (policy === 'explore') {
        return rewrites.find(function (button) { return !seenSpells.has(button.dataset.result); }) || hold;
      }
      if (policy === 'mixed' && decisionIndex % 2 === 0) {
        return rewrites.find(function (button) { return !seenSpells.has(button.dataset.result); }) || hold;
      }
      return hold;
    }

    function simulate(build, seed, buildIndex, policy) {
      resetRandom(seed, buildIndex);
      RunSystem.startNew(seed);
      state.spell = { ...build };
      const choicePolicy = policy || 'hold';
      const seenSpells = new Set([spellKey(state.spell)]);
      const choicesMade = { hold: 0, rewrite: 0 };
      let decisionIndex = 0;
      let frames = 0;
      let damageHits = 0;
      let previousHp = state.player.hp;
      let minHp = state.player.hp;
      let idleFrames = 0;
      let idleStreak = 0;
      let maxIdleStreak = 0;
      let postScheduleIdleStreak = 0;
      let maxPostScheduleIdleStreak = 0;
      let invalidFrames = 0;
      let capViolations = 0;
      let bossSpawnAt = null;
      let bossWaitFrames = null;
      let waveStartedAt = 0;
      const waveDurations = [];
      const maxima = { enemies: 0, projectiles: 0, enemyProjectiles: 0, pendingCasts: 0, sparks: 0 };

      while (state.mode !== 'win' && state.mode !== 'lose' && frames < MAX_RUN_FRAMES) {
        if (state.mode === 'upgrade') {
          const choice = chooseUpgrade(choicePolicy, decisionIndex, seenSpells);
          if (!choice) {
            invalidFrames += 1;
            break;
          }
          choicesMade[choice.dataset.axis === 'hold' ? 'hold' : 'rewrite'] += 1;
          choice.handlers.click();
          seenSpells.add(spellKey(state.spell));
          decisionIndex += 1;
          waveStartedAt = state.runElapsed;
          previousHp = state.player.hp;
          frames += 1;
          continue;
        }

        if (frames % DECISION_GAP === 0) chooseDestination(state.spell, frames, seed);
        const waveBefore = state.wave;
        update();

        if (state.player.hp < previousHp) damageHits += 1;
        previousHp = state.player.hp;
        minHp = Math.min(minHp, state.player.hp);

        if (state.mode === 'playing' && state.enemies.length === 0) {
          idleFrames += 1;
          idleStreak += 1;
          maxIdleStreak = Math.max(maxIdleStreak, idleStreak);
        } else {
          idleStreak = 0;
        }

        if (
          state.mode === 'playing' &&
          state.enemies.length === 0 &&
          state.spawnIndex >= currentWaveDefinition().events.length
        ) {
          postScheduleIdleStreak += 1;
          maxPostScheduleIdleStreak = Math.max(maxPostScheduleIdleStreak, postScheduleIdleStreak);
        } else {
          postScheduleIdleStreak = 0;
        }

        if (bossSpawnAt === null && state.enemies.some(function (enemy) { return enemy.boss; })) {
          bossSpawnAt = state.runElapsed;
          bossWaitFrames = state.runElapsed - waveStartedAt;
        }

        maxima.enemies = Math.max(maxima.enemies, state.enemies.length);
        maxima.projectiles = Math.max(maxima.projectiles, state.projectiles.length);
        maxima.enemyProjectiles = Math.max(maxima.enemyProjectiles, state.enemyProjectiles.length);
        maxima.pendingCasts = Math.max(maxima.pendingCasts, state.pendingCasts.length);
        maxima.sparks = Math.max(maxima.sparks, state.sparks.length);

        if (!finiteRuntime()) invalidFrames += 1;
        if (
          state.projectiles.length > MAX_PROJECTILES ||
          state.enemyProjectiles.length > MAX_ENEMY_PROJECTILES ||
          state.pendingCasts.length > MAX_PENDING_CASTS ||
          state.sparks.length > MAX_SPARKS
        ) capViolations += 1;

        if (state.mode !== 'playing' && waveBefore === state.wave) {
          waveDurations[waveBefore - 1] = state.runElapsed - waveStartedAt;
        }
        frames += 1;
      }

      return {
        build: build.form + '|' + build.essence + '|' + build.law,
        policy: choicePolicy,
        seed,
        mode: state.mode,
        finalWave: state.wave,
        frames,
        elapsedFrames: state.runElapsed,
        score: state.score,
        damageHits,
        minHp,
        idleFrames,
        maxIdleStreak,
        maxPostScheduleIdleStreak,
        bossSpawnAt,
        bossWaitFrames,
        waveDurations,
        maxima,
        invalidFrames,
        capViolations,
        choicesMade,
        uniqueSpells: seenSpells.size,
        finalPower: state.player.power,
        finalHaste: state.player.haste,
        finalMaxHp: state.player.maxHp,
        finalSpeed: state.player.speed,
        finalSpellLevel: state.spellLevel,
        timedOut: frames >= MAX_RUN_FRAMES && state.mode !== 'win' && state.mode !== 'lose',
      };
    }

    function fingerprint(run) {
      return JSON.stringify({
        mode: run.mode,
        finalWave: run.finalWave,
        elapsedFrames: run.elapsedFrames,
        score: run.score,
        damageHits: run.damageHits,
        idleFrames: run.idleFrames,
        bossSpawnAt: run.bossSpawnAt,
        waveDurations: run.waveDurations,
      });
    }

    const choiceContracts = config.builds.map(function (build) {
      RunSystem.startNew(17171);
      state.spell = { ...build };
      state.mode = 'upgrade';
      UISystem.showRewrite(false);
      const name = spellName(build);
      const role = spellRole(build);
      const readout = spellReadout(build);
      const rewriteChoices = upgradeChoices.children.slice(0, 3);
      const threatPreviewComplete = nextWaveTitle.textContent.includes('NEXT · WAVE 2 · Crossfire') &&
        nextWaveDetail.textContent.includes('Motes ×6') && nextWaveDetail.textContent.includes('Casters ×2') &&
        nextWaveIcons.children.length === 2 && nextWavePreview.attributes['aria-label'].includes('Crossfire');
      const rewriteChoicesComplete = rewriteChoices.length === 3 && rewriteChoices.every(function (button) {
        const axis = button.dataset.axis;
        const nextSpell = {
          form: axis === 'form' ? (build.form === 'bolt' ? 'orbit' : 'bolt') : build.form,
          essence: axis === 'essence' ? (build.essence === 'ember' ? 'frost' : 'ember') : build.essence,
          law: axis === 'law' ? (build.law === 'split' ? 'echo' : 'split') : build.law,
        };
        const icon = button.children[0];
        const copy = button.children[1];
        const badge = button.children[2];
        const title = copy && copy.children[0] ? copy.children[0].textContent : '';
        const detail = copy && copy.children[1] ? copy.children[1].textContent : '';
        return ['form', 'essence', 'law'].includes(button.dataset.axis) &&
          ['new', 'known'].includes(button.dataset.discovery) &&
          button.children.length === 3 && icon.className === 'choice-spell-icon' && icon.children.length === 3 &&
          icon.dataset.form === nextSpell.form && icon.dataset.essence === nextSpell.essence && icon.dataset.law === nextSpell.law &&
          title.startsWith(axis.toUpperCase() + ' · ') && detail.length > 0 && detail.length <= 20 &&
          /^(NEW|KNOWN)$/.test(badge.textContent) && button.dataset.result === spellKey(nextSpell) &&
          button.attributes['aria-label'].includes('Result: ' + spellName(nextSpell)) &&
          button.attributes['aria-label'].includes('also grows to level 2');
      });
      const holdChoice = upgradeChoices.children.find(function (button) { return button.dataset.axis === 'hold'; });
      const holdChoiceComplete = holdChoice && holdChoice.dataset.discovery === 'hold' &&
        holdChoice.dataset.result === spellKey(build) && holdChoice.children[0].dataset.form === build.form &&
        holdChoice.children[0].dataset.essence === build.essence && holdChoice.children[0].dataset.law === build.law &&
        holdChoice.children[2].textContent === 'HOLD' && holdChoice.attributes['aria-label'].includes('still grows to level 2');
      const changedForm = build.form === 'bolt' ? 'orbit' : 'bolt';
      const formChoice = rewriteChoices.find(function (button) { return button.dataset.axis === 'form'; });
      formChoice.handlers.click();
      UISystem.updateHud();
      const transformationComplete = state.mode === 'playing' && state.wave === 2 && state.spell.form === changedForm &&
        state.spellLevel === 2 && state.rewriteNoticeTimer > 0 && state.rewriteNotice.axis === 'form' &&
        controlHint.textContent.includes('FORM → ' + SPELL_PARTS.forms[changedForm].title);
      return {
        build: build.form + '|' + build.essence + '|' + build.law,
        name,
        role,
        readout,
        threatPreviewComplete,
        transformationComplete,
        complete: name.split(' · ').length === 3 && role.split(' · ').length === 3 && rewriteChoicesComplete && holdChoiceComplete &&
          threatPreviewComplete && transformationComplete &&
          readout.includes('FORM ') && readout.includes('ESSENCE ') && readout.includes('LAW '),
      };
    });

    const runs = [];
    for (let buildIndex = 0; buildIndex < config.builds.length; buildIndex += 1) {
      for (const seed of config.seeds) runs.push(simulate(config.builds[buildIndex], seed, buildIndex, 'hold'));
    }

    const policyRuns = [];
    const startingBuild = { form: 'bolt', essence: 'ember', law: 'split' };
    for (const policy of ['hold', 'mixed', 'explore', 'rewrite']) {
      for (const seed of config.seeds) policyRuns.push(simulate(startingBuild, seed, 0, policy));
    }

    const determinism = [];
    for (let buildIndex = 0; buildIndex < config.builds.length; buildIndex += 1) {
      const original = runs[buildIndex * config.seeds.length];
      const replay = simulate(config.builds[buildIndex], config.seeds[0], buildIndex, 'hold');
      determinism.push({ build: original.build, matches: fingerprint(original) === fingerprint(replay) });
    }

    const authoredArrivalGaps = RUN_DEFINITION.flatMap(function (wave) {
      let previous = 0;
      return wave.events.map(function (event) {
        const gap = event.at - previous;
        previous = event.at;
        return gap;
      });
    });

    return {
      runs,
      policyRuns,
      determinism,
      choiceContracts,
      pacingContract: {
        maxAuthoredArrivalGapFrames: Math.max(...authoredArrivalGaps),
        bossArrivalLimitFrames: 9 * FPS,
      },
    };
  })())
`));

function median(values) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function percentile(values, percent) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.ceil((percent / 100) * sorted.length) - 1];
}

function round(value, digits = 2) {
  if (value === null || value === undefined || !Number.isFinite(value)) return null;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function summarizeRuns(runs) {
  const wins = runs.filter((run) => run.mode === 'win');
  return {
    runs: runs.length,
    wins: wins.length,
    winRate: round(wins.length / runs.length, 3),
    medianClearSeconds: round(median(wins.map((run) => run.elapsedFrames)) / 60),
    p95ClearSeconds: round(percentile(wins.map((run) => run.elapsedFrames), 95) / 60),
    medianDamageHits: round(median(runs.map((run) => run.damageHits)), 1),
    p95IdleShare: round(percentile(runs.map((run) => run.idleFrames / Math.max(1, run.elapsedFrames)), 95), 3),
    maxIdleSeconds: round(Math.max(...runs.map((run) => run.maxIdleStreak)) / 60),
  };
}

const byBuild = Object.fromEntries(builds.map((build) => {
  const key = `${build.form}|${build.essence}|${build.law}`;
  return [key, summarizeRuns(raw.runs.filter((run) => run.build === key))];
}));
const byForm = Object.fromEntries(['bolt', 'orbit'].map((form) => [
  form,
  summarizeRuns(raw.runs.filter((run) => run.build.startsWith(`${form}|`))),
]));
const overall = summarizeRuns(raw.runs);
const byPolicy = Object.fromEntries(['hold', 'mixed', 'explore', 'rewrite'].map((policy) => {
  const runs = raw.policyRuns.filter((run) => run.policy === policy);
  return [policy, {
    ...summarizeRuns(runs),
    medianUniqueSpells: round(median(runs.map((run) => run.uniqueSpells)), 1),
    medianRewrites: round(median(runs.map((run) => run.choicesMade.rewrite)), 1),
    medianFinalSpellLevel: round(median(runs.map((run) => run.finalSpellLevel)), 1),
  }];
}));

const buildClearMedians = Object.values(byBuild).map((summary) => summary.medianClearSeconds).filter(Number.isFinite);
const fastestBuild = Math.min(...buildClearMedians);
const slowestBuild = Math.max(...buildClearMedians);
const clearSpread = buildClearMedians.length === builds.length ? slowestBuild / fastestBuild - 1 : Infinity;
const minimumBuildWinRate = Math.min(...Object.values(byBuild).map((summary) => summary.winRate));
const maximumFormGap = Math.abs(byForm.bolt.medianClearSeconds - byForm.orbit.medianClearSeconds) /
  Math.min(byForm.bolt.medianClearSeconds, byForm.orbit.medianClearSeconds);
const policyClearMedians = Object.values(byPolicy).map((summary) => summary.medianClearSeconds).filter(Number.isFinite);
const policyClearSpread = Math.max(...policyClearMedians) / Math.min(...policyClearMedians) - 1;
const minimumPolicyWinRate = Math.min(...Object.values(byPolicy).map((summary) => summary.winRate));
const minimumFinalSpellLevel = Math.min(...Object.values(byPolicy).map((summary) => summary.medianFinalSpellLevel));

const allRuns = [...raw.runs, ...raw.policyRuns];
const counts = {
  timeouts: allRuns.filter((run) => run.timedOut).length,
  invalidRuns: allRuns.filter((run) => run.invalidFrames > 0).length,
  capViolationRuns: allRuns.filter((run) => run.capViolations > 0).length,
  deterministicReplays: raw.determinism.filter((entry) => entry.matches).length,
  choiceContracts: raw.choiceContracts.filter((entry) => entry.complete).length,
};
const pacing = {
  longestEmptySeconds: round(Math.max(...raw.runs.map((run) => run.maxIdleStreak)) / 60),
  authoredArrivalGapSeconds: round(raw.pacingContract.maxAuthoredArrivalGapFrames / 60),
  longestPostScheduleIdleSeconds: round(Math.max(...raw.runs.map((run) => run.maxPostScheduleIdleStreak)) / 60),
  longestBossWaitSeconds: round(Math.max(...raw.runs.map((run) => run.bossWaitFrames || 0)) / 60),
  bossArrivalLimitSeconds: round(raw.pacingContract.bossArrivalLimitFrames / 60),
};

const gates = [
  {
    id: 'matrix',
    title: 'Representative matrix',
    status: raw.runs.length === builds.length * seedsPerBuild ? 'pass' : 'fail',
    evidence: `${raw.runs.length}/${builds.length * seedsPerBuild} full bot runs completed`,
  },
  {
    id: 'runtime',
    title: 'Runtime integrity',
    status: counts.timeouts === 0 && counts.invalidRuns === 0 && counts.capViolationRuns === 0 ? 'pass' : 'fail',
    evidence: `${counts.timeouts} timeouts · ${counts.invalidRuns} invalid-state runs · ${counts.capViolationRuns} cap-violation runs`,
  },
  {
    id: 'determinism',
    title: 'Deterministic replay',
    status: counts.deterministicReplays === builds.length ? 'pass' : 'fail',
    evidence: `${counts.deterministicReplays}/${builds.length} build replays matched`,
  },
  {
    id: 'survival',
    title: 'Bot survivability',
    status: minimumBuildWinRate >= 0.8 ? 'pass' : minimumBuildWinRate >= 0.6 ? 'warn' : 'fail',
    evidence: `${round(overall.winRate * 100, 1)}% overall · ${round(minimumBuildWinRate * 100, 1)}% weakest build`,
  },
  {
    id: 'dominance',
    title: 'Dominant-build screen',
    status: clearSpread <= 0.2 && maximumFormGap <= 0.15 ? 'pass' : clearSpread <= 0.35 && maximumFormGap <= 0.25 ? 'warn' : 'fail',
    evidence: `${round(clearSpread * 100, 1)}% build median spread · ${round(maximumFormGap * 100, 1)}% Form gap`,
  },
  {
    id: 'choice-incentives',
    title: 'Rewrite incentive screen',
    status: raw.policyRuns.length === 4 * seedsPerBuild && minimumPolicyWinRate >= 0.8 &&
      policyClearSpread <= 0.2 && minimumFinalSpellLevel === 12
      ? 'pass'
      : minimumPolicyWinRate >= 0.6 && policyClearSpread <= 0.35 ? 'warn' : 'fail',
    evidence: `${raw.policyRuns.length} policy runs · ${round(policyClearSpread * 100, 1)}% clear spread · ` +
      `LV ${minimumFinalSpellLevel} minimum policy median`,
  },
  {
    id: 'pacing',
    title: 'Active pacing proxy',
    status: pacing.longestEmptySeconds <= pacing.authoredArrivalGapSeconds &&
      pacing.longestPostScheduleIdleSeconds === 0 && pacing.longestBossWaitSeconds <= pacing.bossArrivalLimitSeconds
      ? 'pass'
      : pacing.longestEmptySeconds <= pacing.authoredArrivalGapSeconds + 2 &&
          pacing.longestPostScheduleIdleSeconds <= 0.5 && pacing.longestBossWaitSeconds <= pacing.bossArrivalLimitSeconds + 1
        ? 'warn' : 'fail',
    evidence: `${pacing.longestEmptySeconds}s empty / ${pacing.authoredArrivalGapSeconds}s authored cap · ` +
      `${pacing.longestPostScheduleIdleSeconds}s post-schedule · ${pacing.longestBossWaitSeconds}s boss wait`,
  },
  {
    id: 'choice-contract',
    title: 'Choice feedback loop',
    status: counts.choiceContracts === builds.length ? 'pass' : 'fail',
    evidence: `${counts.choiceContracts}/${builds.length} builds expose a compact result, next-threat context, and post-tap transformation feedback`,
  },
];

const status = gates.some((gate) => gate.status === 'fail')
  ? 'red'
  : gates.some((gate) => gate.status === 'warn') ? 'yellow' : 'green';

const generatedAt = new Date().toISOString();
const report = {
  schemaVersion: 2,
  generatedAt,
  gameVersion: packageJson.version,
  status,
  contract: {
    builds: builds.length,
    seedsPerBuild,
    fullRuns: raw.runs.length,
    policyRuns: raw.policyRuns.length,
    replayRuns: raw.determinism.length,
    botPolicy: 'deterministic danger-grid movement across hold, mixed, discovery-first, and rewrite-only choice policies',
  },
  gates,
  summary: { overall, byForm, byBuild, byPolicy, pacing },
  automatedClaims: [
    'runtime termination, finite state, and hard collection caps',
    'seeded replay determinism',
    'relative build outcomes under one fixed movement policy',
    'survival and clear-time outcomes across four real rewrite/hold policies',
    'empty-arena pacing and clear-time proxies',
    'compact resulting-spell visual, next-threat context, and post-tap transformation-feedback schema',
  ],
  humanOnlyClaims: [
    'fun, boredom, delight, and desire to replay',
    'whether a fresh player truly understands each choice',
    'touch feel, readability, and perceived fairness on a phone',
    'commercial value and acceptable total entertainment length',
  ],
  raw,
};

const tableRows = Object.entries(byBuild).map(([build, summary]) => (
  `| ${build.replaceAll('|', ' · ')} | ${summary.wins}/${summary.runs} | ${summary.medianClearSeconds ?? '—'} | ${summary.medianDamageHits ?? '—'} | ${summary.maxIdleSeconds} |`
));
const policyRows = Object.entries(byPolicy).map(([policy, summary]) => (
  `| ${policy} | ${summary.wins}/${summary.runs} | ${summary.medianClearSeconds ?? '—'} | ${summary.medianDamageHits ?? '—'} | ${summary.medianRewrites} | ${summary.medianUniqueSpells} | ${summary.medianFinalSpellLevel} |`
));
const gateRows = gates.map((gate) => `| ${gate.status.toUpperCase()} | ${gate.title} | ${gate.evidence} |`);
const markdown = `# Pixel Mage Automated Evidence\n\n` +
  `- Result: **${status.toUpperCase()}**\n` +
  `- Version: \`${packageJson.version}\`\n` +
  `- Generated: ${generatedAt}\n` +
  `- Matrix: ${raw.runs.length} build runs + ${raw.policyRuns.length} choice-policy runs + ${raw.determinism.length} deterministic replays\n\n` +
  `## Gates\n\n| Result | Gate | Evidence |\n|---|---|---|\n${gateRows.join('\n')}\n\n` +
  `## Build Outcomes\n\n| Build | Wins | Median clear (s) | Median hits taken | Longest empty stretch (s) |\n|---|---:|---:|---:|---:|\n${tableRows.join('\n')}\n\n` +
  `## Choice-Policy Outcomes\n\n| Policy | Wins | Median clear (s) | Median hits | Rewrites | Unique spells | Final level |\n|---|---:|---:|---:|---:|---:|---:|\n${policyRows.join('\n')}\n\n` +
  `## Interpretation Boundary\n\nAutomation can catch crashes, invalid state, regressions, pacing gaps, and strategies that quietly punish rewriting. It cannot prove fun or human understanding. Those remain short phone-test questions at explicit commercial gates.\n`;

await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeFile(resolve(outputDirectory, 'evidence-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8'),
  writeFile(resolve(outputDirectory, 'evidence-report.md'), markdown, 'utf8'),
]);

process.stdout.write(
  `Pixel Mage evidence ${status.toUpperCase()}: ${raw.runs.length} full runs, ${round(overall.winRate * 100, 1)}% wins, ` +
  `${round(clearSpread * 100, 1)}% build spread, ${raw.policyRuns.length} policy runs, ` +
  `${round(policyClearSpread * 100, 1)}% policy spread.\n`,
);
process.stdout.write(`Reports: artifacts/evidence/evidence-report.{json,md}\n`);

if (status === 'red') process.exitCode = 1;
