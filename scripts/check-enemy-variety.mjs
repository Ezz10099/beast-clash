import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

import { createHeadlessGame } from './headless-game.mjs';
import { RELEASE_FILES } from './release-config.mjs';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const css = await readFile(new URL('enemy-variety.css', root), 'utf8');
const code = await readFile(new URL('enemy-variety.js', root), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));

for (const file of ['enemy-variety.css', 'enemy-variety.js']) {
  assert.ok(RELEASE_FILES.includes(file), `${file} must ship in the production bundle`);
}
assert.match(html, /href="enemy-variety\.css"/);
assert.match(html, /id="enemyFx"[^>]*width="320"[^>]*height="480"[^>]*aria-hidden="true"/);
assert.match(html, /src="enemy-variety\.js"/);
assert.ok(html.indexOf('id="game"') < html.indexOf('id="enemyFx"'), 'enemy telegraphs must render above the game canvas');
assert.ok(html.indexOf('src="game.js"') < html.indexOf('src="enemy-variety.js"'), 'enemy variety must initialize after the core runtime');
assert.match(css, /#enemyFx\s*\{[\s\S]*pointer-events:\s*none/);
assert.match(css, /data-screen="playing"/);

for (const contract of [
  /roleForEnemy/,
  /applyFlanker/,
  /applySurger/,
  /applyFanCaster/,
  /assignRelayLinks/,
  /separateChasers/,
  /drawSurger/,
  /drawFanCaster/,
  /drawRelayLinks/,
  /baseUpdate/,
  /baseDraw/,
]) {
  assert.match(code, contract, `enemy variety is missing ${contract}`);
}
for (const forbidden of [/\bfetch\s*\(/, /XMLHttpRequest/, /WebSocket/, /sendBeacon/, /EventSource/, /localStorage/, /SaveSystem/, /persistent\./]) {
  assert.doesNotMatch(code, forbidden, 'enemy variety must remain offline and outside persistence');
}

const pureSandbox = {
  console,
  Object,
  Math,
  Number,
  String,
  Set,
  Map,
  window: {},
  document: { querySelector: () => null },
};
vm.createContext(pureSandbox);
vm.runInContext(code, pureSandbox, { filename: 'enemy-variety.js' });
const pure = pureSandbox.window.PixelMageEnemyVariety;
assert.ok(pure, 'enemy variety must expose deterministic helpers');
assert.equal(pure.roleForEnemy({ id: 2, family: 'chaser' }, 1), 'pursuer');
assert.equal(pure.roleForEnemy({ id: 2, family: 'chaser' }, 5), 'flanker');
assert.equal(pure.roleForEnemy({ id: 3, family: 'chaser' }, 9), 'surger');
assert.equal(pure.roleForEnemy({ id: 4, family: 'caster' }, 6), 'fan');
assert.equal(pure.roleForEnemy({ id: 5, family: 'caster' }, 6), 'sniper');
assert.equal(pure.roleForEnemy({ id: 6, family: 'chaser', elite: true }, 12), 'core');
assert.deepEqual(Array.from(pure.fanAngles(1)), [0.78, 1, 1.22]);
assert.equal(pure.formationSide(2), -1);
assert.equal(pure.formationSide(3), 1);
assert.deepEqual({ ...pure.cycleInfo(0, 0, 250) }, { cycle: 0, phase: 0 });

const game = await createHeadlessGame();
const { evaluate } = game;
assert.equal(evaluate('typeof window.PixelMageEnemyVariety.step'), 'function');
assert.equal(evaluate('typeof window.PixelMageEnemyVariety.draw'), 'function');
assert.equal(evaluate('window.PixelMageEnemyVarietyInstalled'), true);

// Wave 1 remains the simple onboarding lane.
evaluate(`
  RunSystem.startNew(1001);
  state.enemies = [];
  state.nextEnemyId = 2;
  const earlyA = EnemySystem.makeEnemy(150, 150, { family: "chaser", count: 1 });
  state.nextEnemyId = 4;
  const earlyB = EnemySystem.makeEnemy(150, 150, { family: "chaser", count: 1 });
  state.enemies.push(earlyA, earlyB);
  window.PixelMageEnemyVariety.step();
`);
assert.equal(evaluate('state.enemies[0]._varietyRole'), 'pursuer');
assert.equal(evaluate('Math.hypot(state.enemies[0].x - state.enemies[1].x, state.enemies[0].y - state.enemies[1].y)'), 0, 'Wave 1 must not add formation pressure');

// Act II adds flanking and caster–Mote cooperation without new enemy families.
evaluate(`
  state.wave = 6;
  state.mode = "playing";
  state.menuOpen = false;
  state.player.x = 160;
  state.player.y = 380;
  state.enemies = [];
  state.enemyProjectiles = [];
  state.nextEnemyId = 6002;
  const flanker = EnemySystem.makeEnemy(110, 220, { family: "chaser", count: 1 });
  state.nextEnemyId = 6004;
  const fanCaster = EnemySystem.makeEnemy(118, 210, { family: "caster", count: 1 });
  state.enemies.push(flanker, fanCaster);
  window.PixelMageEnemyVariety.step();
`);
assert.equal(evaluate('state.enemies[0]._varietyRole'), 'flanker');
assert.equal(evaluate('state.enemies[1]._varietyRole'), 'fan');
assert.equal(evaluate('state.enemies[0]._varietyRelaySource'), evaluate('state.enemies[1].id'), 'nearby Casters should visibly relay to one Mote');
assert.equal(evaluate('state.enemies[1]._varietyRelayTarget'), evaluate('state.enemies[0].id'));

const fanStart = evaluate(`
  (function () {
    const caster = state.enemies[1];
    for (let time = 0; time < 600; time += 1) {
      if (window.PixelMageEnemyVariety.cycleInfo(time, caster.id, 300).phase === 0) return time;
    }
    return -1;
  })()
`);
assert.ok(fanStart >= 0);
evaluate(`
  state.time = ${fanStart};
  state.enemies[1].attackState = "reposition";
  state.enemies[1].attackTimer = 10;
  window.PixelMageEnemyVariety.step();
`);
assert.equal(evaluate('state.enemies[1]._varietyPhase'), 'fanTell');
assert.equal(evaluate('state.enemyProjectiles.length'), 0, 'fan fire must have a visible tell before projectiles exist');
evaluate(`
  state.time = ${fanStart + 44};
  window.PixelMageEnemyVariety.step();
`);
assert.equal(evaluate('state.enemyProjectiles.length'), 3, 'fan Caster should replace one shot with a readable three-lane pattern');
assert.equal(evaluate('state.enemies[1].attackState'), 'reposition');
assert.ok(evaluate('state.enemies[1].attackTimer') >= 80, 'fan fire must include a recovery gap');

// Act III introduces a telegraphed surge that Frost can still slow.
evaluate(`
  state.wave = 9;
  state.enemies = [];
  state.nextEnemyId = 9003;
  const surger = EnemySystem.makeEnemy(90, 170, { family: "chaser", count: 1 });
  state.enemies.push(surger);
`);
const surgeStart = evaluate(`
  (function () {
    const enemy = state.enemies[0];
    for (let time = 0; time < 500; time += 1) {
      if (window.PixelMageEnemyVariety.cycleInfo(time, enemy.id, 250).phase === 0) return time;
    }
    return -1;
  })()
`);
assert.ok(surgeStart >= 0);
evaluate(`
  state.time = ${surgeStart};
  window.PixelMageEnemyVariety.step();
`);
assert.equal(evaluate('state.enemies[0]._varietyRole'), 'surger');
assert.equal(evaluate('state.enemies[0]._varietyPhase'), 'surgeTell');
assert.ok(evaluate('state.enemies[0].speed < state.enemies[0]._varietyBaseSpeed'), 'surger must visibly slow during its windup');
const surgeX = evaluate('state.enemies[0].x');
evaluate(`
  state.time = ${surgeStart + 38};
  window.PixelMageEnemyVariety.step();
`);
assert.equal(evaluate('state.enemies[0]._varietyPhase'), 'surge');
assert.ok(Math.abs(evaluate('state.enemies[0].x') - surgeX) > 1, 'surger must commit to the captured lane after the tell');

evaluate('window.PixelMageEnemyVariety.draw()');
assert.equal(
  evaluate('JSON.stringify(Array.from(new Set(RUN_DEFINITION.flatMap((wave) => wave.events.map((event) => event.family).filter(Boolean)))).sort())'),
  '["caster","chaser"]',
  'enemy variety must use the current roster instead of adding a family',
);
assert.equal(packageJson.scripts['enemy:check'], 'node --check enemy-variety.js && node scripts/check-enemy-variety.mjs');
assert.match(packageJson.scripts.check, /npm run enemy:check/, 'normal checks must include enemy variety verification');

process.stdout.write('Enemy behavior, formation, telegraph, and interaction checks passed.\n');
