import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHeadlessGame } from './headless-game.mjs';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');

for (const id of [
  'game',
  'healthText',
  'waveText',
  'scoreText',
  'spellText',
  'menuButton',
  'startPanel',
  'startStatus',
  'spellbookText',
  'resumeRunButton',
  'startRunButton',
  'upgradePanel',
  'upgradeEyebrow',
  'upgradeTitle',
  'upgradeHelp',
  'upgradeChoices',
  'menuPanel',
  'menuEyebrow',
  'menuTitle',
  'menuStatus',
  'resumeButton',
  'soundButton',
  'hapticsButton',
  'newRunButton',
  'controlHint',
]) {
  assert.match(html, new RegExp(`id=["']${id}["']`), `index.html is missing #${id}`);
}
assert.match(html, /<strong>FORM<\/strong> — Bolt hunts the mark/);
assert.match(html, /<strong>ESSENCE<\/strong> — Ember burns/);
assert.match(html, /<strong>LAW<\/strong> — Split casts three/);
assert.match(html, /Unseen rewrites are marked NEW/);
assert.match(html, /Drag to move and dodge\. Your spell casts itself/);
assert.doesNotMatch(html, /data-key=/, 'legacy touch buttons should not return');

const {
  canvas,
  elements,
  evaluate,
  menuPanel,
  resumeRunButton,
  startPanel,
  storage,
  upgradePanel,
  vibrations,
  windowHandlers,
} = await createHeadlessGame({
  storageEntries: [
    ['pixel_mage_best_score_v1', '321'],
    ['pixel_mage_settings_v1', JSON.stringify({ sound: true, haptics: true })],
  ],
});

assert.equal(evaluate('state.mode'), 'menu');
assert.equal(startPanel.hidden, false);
assert.equal(resumeRunButton.hidden, true);
assert.equal(evaluate('persistent.version'), 2);
assert.equal(evaluate('persistent.profile.bestScore'), 321, 'legacy best score should migrate');
assert.equal(evaluate('JSON.stringify(persistent.settings)'), '{"sound":true,"haptics":true}');
assert.equal(JSON.parse(storage.get('pixel_mage_save_v2')).version, 2);
assert.match(elements.get('#startStatus').textContent, /three acts, twelve waves/i);
assert.match(elements.get('#spellbookText').textContent, /marked NEW/);

elements.get('#startRunButton').handlers.click();
assert.equal(evaluate('state.mode'), 'playing');
assert.equal(evaluate('state.wave'), 1);
assert.equal(evaluate('state.enemies.length'), 2, 'the first scheduled group should spawn immediately');
assert.equal(evaluate('state.spawnIndex'), 1);
assert.equal(startPanel.hidden, true);
assert.equal(evaluate('persistent.checkpoint.phase'), 'wave');
assert.equal(evaluate('persistent.checkpoint.wave'), 1);

const startingX = evaluate('state.player.x');
canvas.handlers.pointerdown({ clientX: 40, clientY: 240, pointerId: 1, preventDefault() {} });
evaluate('update()');
assert.ok(evaluate('state.player.x') < startingX, 'dragging in the arena should move the mage');
assert.ok(evaluate('state.projectiles.length') > 0, 'the living spell should cast automatically');
assert.ok(evaluate('state.targetId !== null'), 'automatic casting should mark a deterministic threat');
assert.match(elements.get('#controlHint').textContent, /BOLT hunts the marked enemy/);
assert.ok(evaluate('audioContext !== null'), 'the first gesture should unlock synthesized audio');
assert.ok(vibrations.length > 0, 'the first action should provide haptic feedback');
canvas.handlers.pointerup({ pointerId: 1 });
assert.equal(evaluate('pointerControl.active'), false);

const timeBeforePause = evaluate('state.time');
elements.get('#menuButton').handlers.click();
assert.equal(evaluate('state.menuOpen'), true);
assert.equal(menuPanel.hidden, false);
evaluate('update()');
assert.equal(evaluate('state.time'), timeBeforePause, 'pause should freeze every gameplay timer');

elements.get('#soundButton').handlers.click();
assert.equal(evaluate('settings.sound'), false);
assert.equal(JSON.parse(storage.get('pixel_mage_save_v2')).settings.sound, false);
elements.get('#soundButton').handlers.click();
assert.equal(evaluate('settings.sound'), true);
elements.get('#hapticsButton').handlers.click();
assert.equal(evaluate('settings.haptics'), false);
assert.equal(JSON.parse(storage.get('pixel_mage_save_v2')).settings.haptics, false);
elements.get('#hapticsButton').handlers.click();
assert.equal(evaluate('settings.haptics'), true);
elements.get('#resumeButton').handlers.click();
assert.equal(evaluate('state.menuOpen'), false);

windowHandlers.get('blur')();
assert.equal(evaluate('state.menuOpen'), true, 'losing focus during play should auto-pause');
assert.equal(elements.get('#menuEyebrow').textContent, 'Auto-Paused');
elements.get('#resumeButton').handlers.click();
assert.equal(evaluate('state.menuOpen'), false);

assert.equal(evaluate('typeof window.PixelMageNative.handleBackButton'), 'function');
assert.equal(evaluate('window.PixelMageNative.handleBackButton()'), true, 'Back should pause an active run');
assert.equal(evaluate('state.menuOpen'), true);
assert.match(elements.get('#menuStatus').textContent, /Back again to exit/);
assert.equal(evaluate('window.PixelMageNative.handleBackButton()'), false, 'Back from pause should allow native exit');
elements.get('#resumeButton').handlers.click();

evaluate('RunSystem.startNew(424242)');
const firstSpawn = evaluate('JSON.stringify(state.enemies.map((enemy) => [enemy.id, enemy.x, enemy.y]))');
evaluate('RunSystem.startNew(424242)');
assert.equal(
  evaluate('JSON.stringify(state.enemies.map((enemy) => [enemy.id, enemy.x, enemy.y]))'),
  firstSpawn,
  'the same seed should reproduce spawn IDs and positions',
);
evaluate('state.waveFrame = 5 * FPS; SpawnSystem.spawnDue()');
assert.equal(evaluate('state.enemies.length'), 4, 'scheduled groups should arrive during the wave');

assert.equal(evaluate('RUN_DEFINITION.length'), 12);
assert.equal(
  evaluate('JSON.stringify(Array.from(new Set(RUN_DEFINITION.flatMap((wave) => wave.events.map((event) => event.family).filter(Boolean)))).sort())'),
  '["caster","chaser"]',
  'the slice should contain exactly two normal enemy families',
);
assert.equal(evaluate('RUN_DEFINITION.filter((wave) => wave.guardian).length'), 2);
assert.equal(evaluate('RUN_DEFINITION.filter((wave) => wave.boss).length'), 1);
assert.equal(evaluate('RUN_DEFINITION[11].events.filter((event) => event.boss).length'), 1);
assert.equal(evaluate('RUN_DEFINITION[8].events.every((event) => event.family === "chaser")'), true, 'Wave 9 should be a distinct Mote rush');
assert.ok(evaluate('RUN_DEFINITION[9].events.filter((event) => event.family === "caster").length') >= 4, 'Wave 10 should emphasize crossfire');
assert.equal(evaluate('RUN_DEFINITION[10].events.filter((event) => event.elite).length'), 2, 'Wave 11 should be a twin-guardian test');
assert.ok(evaluate('RUN_DEFINITION[11].events.find((event) => event.boss).at <= 9 * FPS'), 'the boss should arrive without a long prelude');

evaluate(`
  state.waveFrame = 1;
  state.spawnIndex = currentWaveDefinition().events.length;
  state.enemies = [];
  state.enemyProjectiles = [];
  RunSystem.update();
`);
assert.ok(evaluate('state.waveFrame < RUN_DEFINITION[0].duration'), 'the wave should clear before its old fixed timer');
assert.equal(evaluate('state.mode'), 'upgrade');
assert.equal(upgradePanel.hidden, false);
assert.equal(elements.get('#upgradeChoices').children.length, 4);
assert.equal(
  JSON.stringify(elements.get('#upgradeChoices').children.map((button) => button.dataset.axis)),
  '["form","essence","law","support"]',
);
assert.equal(evaluate('persistent.checkpoint.phase'), 'upgrade');
assert.equal(evaluate('persistent.profile.discovered.length'), 1);
assert.match(elements.get('#upgradeEyebrow').textContent, /New Spell Proven/);
assert.match(elements.get('#upgradeHelp').textContent, /CURRENT · Bolt · Ember · Split/);
assert.equal(
  JSON.stringify(elements.get('#upgradeChoices').children.slice(0, 3).map((button) => button.dataset.discovery)),
  '["new","new","new"]',
  'rewrite cards should mark unseen full combinations without requiring a recipe',
);

const formChoice = elements.get('#upgradeChoices').children.find((button) => button.dataset.axis === 'form');
assert.match(formChoice.children[1].textContent, /NEW SPELL · Orbit · Ember · Split/);
formChoice.handlers.click();
assert.equal(evaluate('state.mode'), 'playing');
assert.equal(evaluate('state.wave'), 2);
assert.equal(evaluate('state.spell.form'), 'orbit');
evaluate('UISystem.updateHud()');
assert.match(elements.get('#controlHint').textContent, /ORBIT hits nearby crowds and blocks shots/);
assert.equal(evaluate('persistent.checkpoint.wave'), 2);
assert.equal(evaluate('persistent.checkpoint.phase'), 'wave');

const checkpointSpell = evaluate('JSON.stringify(persistent.checkpoint.spell)');
const checkpointHp = evaluate('persistent.checkpoint.player.hp');
evaluate('state.spell.form = "bolt"; state.player.hp = 1; state.score = 999999; RunSystem.resume()');
assert.equal(evaluate('state.mode'), 'playing');
assert.equal(evaluate('state.wave'), 2);
assert.equal(evaluate('JSON.stringify(state.spell)'), checkpointSpell);
assert.equal(evaluate('state.player.hp'), checkpointHp);
assert.notEqual(evaluate('state.score'), 999999);

evaluate(`
  state.waveFrame = currentWaveDefinition().duration;
  state.spawnIndex = currentWaveDefinition().events.length;
  state.enemies = [];
  state.enemyProjectiles = [];
  RunSystem.update();
`);
assert.equal(evaluate('state.mode'), 'upgrade');
assert.equal(evaluate('persistent.checkpoint.phase'), 'upgrade');
evaluate('RunSystem.resume()');
assert.equal(evaluate('state.mode'), 'upgrade', 'an upgrade-boundary checkpoint should resume at the rewrite choice');
assert.equal(elements.get('#upgradeChoices').children.length, 4);

const migratedV1 = JSON.parse(evaluate(`JSON.stringify(SaveSystem.migrate({
  version: 1,
  bestScore: 987,
  settings: { sound: false, haptics: true },
  checkpoint: {
    currentWave: 6,
    phase: "upgrade",
    seed: 44,
    score: 500,
    player: { hp: 4, maxHp: 6, speed: 2.3 },
    spell: { form: "orbit", essence: "frost", law: "echo" }
  }
}, {}))`));
assert.equal(migratedV1.version, 2);
assert.equal(migratedV1.profile.bestScore, 987);
assert.equal(migratedV1.settings.sound, false);
assert.equal(migratedV1.checkpoint.wave, 6);
assert.equal(migratedV1.checkpoint.phase, 'upgrade');
assert.deepEqual(migratedV1.checkpoint.spell, { form: 'orbit', essence: 'frost', law: 'echo' });
assert.equal(evaluate('SaveSystem.migrate({ version: 2, checkpoint: { wave: 99 } }, {}).checkpoint'), null);
assert.equal(
  evaluate('SaveSystem.migrate({ profile: { discovered: ["bolt|ember|split", "bad|entry|here"] } }, {}).profile.discovered.length'),
  1,
  'migration should reject unknown Spellbook combinations',
);

const discoveriesBeforeLoss = evaluate('persistent.profile.discovered.length');
evaluate('RunSystem.startNew(6060); state.spell = { form: "bolt", essence: "frost", law: "echo" }; RunSystem.finish("lose")');
assert.equal(evaluate('persistent.profile.discovered.length'), discoveriesBeforeLoss, 'a spell should be proven by clearing a wave, not merely equipped before defeat');

for (const form of ['bolt', 'orbit']) {
  for (const essence of ['ember', 'frost']) {
    for (const law of ['split', 'echo']) {
      evaluate(`
        RunSystem.startNew(7000);
        state.spell = { form: "${form}", essence: "${essence}", law: "${law}" };
        state.enemies = [EnemySystem.makeEnemy(state.player.x, state.player.y - 90, { family: "chaser", count: 1 })];
        state.player.cooldown = 0;
        SpellSystem.cast();
      `);
      assert.equal(evaluate('state.projectiles[0].kind'), form, `${form}/${essence}/${law} should use its Form`);
      assert.equal(evaluate('state.projectiles[0].essence'), essence);
      if (law === 'split') {
        assert.equal(evaluate('state.projectiles.length'), 3, 'Split should create three copies');
        assert.equal(evaluate('state.pendingCasts.length'), 0);
      } else {
        assert.equal(evaluate('state.projectiles.length'), 1);
        assert.equal(evaluate('state.pendingCasts.length'), 1, 'Echo should schedule a repeat');
        evaluate('state.time += 12; SpellSystem.processPending()');
        assert.equal(evaluate('state.projectiles.length'), 2);
      }
      assert.match(evaluate('spellName(state.spell)'), / · /);
      evaluate('draw()');
    }
  }
}

evaluate(`
  RunSystem.startNew(81);
  state.enemies = [];
  const emberTarget = EnemySystem.makeEnemy(160, 180, { family: "chaser", count: 1 });
  const frostTarget = EnemySystem.makeEnemy(180, 180, { family: "caster", count: 1 });
  state.enemies.push(emberTarget, frostTarget);
  EnemySystem.applySpellHit(emberTarget, 1, "ember");
  EnemySystem.applySpellHit(frostTarget, 1, "frost");
`);
assert.ok(evaluate('state.enemies[0].burnUntil > state.time'), 'Ember should apply a burn');
assert.ok(evaluate('state.enemies[1].slowUntil > state.time'), 'Frost should apply a slow');

const formDamage = JSON.parse(evaluate(`
  JSON.stringify((function () {
    function measure(form, count) {
      RunSystem.startNew(8282);
      state.spell = { form, essence: "frost", law: "echo" };
      state.enemies = [];
      state.projectiles = [];
      state.pendingCasts = [];
      for (let index = 0; index < count; index += 1) {
        const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count;
        const enemy = EnemySystem.makeEnemy(
          state.player.x + Math.cos(angle) * 44,
          state.player.y + Math.sin(angle) * 44,
          { family: "chaser", count: 1 }
        );
        enemy.hp = 400;
        enemy.maxHp = 400;
        state.enemies.push(enemy);
      }
      for (let frame = 0; frame < 240; frame += 1) {
        state.time += 1;
        if (state.player.cooldown > 0) state.player.cooldown -= 1;
        SpellSystem.update();
      }
      return count * 400 - state.enemies.reduce((total, enemy) => total + enemy.hp, 0);
    }
    return {
      boltSingle: measure("bolt", 1),
      orbitSingle: measure("orbit", 1),
      boltCrowd: measure("bolt", 6),
      orbitCrowd: measure("orbit", 6)
    };
  })())
`));
assert.ok(formDamage.boltSingle > formDamage.orbitSingle * 1.4, 'Bolt should retain the clearer single-target advantage');
assert.ok(formDamage.orbitSingle > formDamage.boltSingle * 0.45, 'Orbit single-target damage must remain viable rather than becoming a trap');
assert.ok(formDamage.orbitCrowd > formDamage.boltCrowd * 2.5, 'Orbit should earn its positioning risk with a strong crowd advantage');

evaluate(`
  RunSystem.startNew(8383);
  state.spell = { form: "orbit", essence: "frost", law: "echo" };
  state.enemies = [EnemySystem.makeEnemy(state.player.x + 44, state.player.y, { family: "chaser", count: 1 })];
  state.projectiles = [];
  SpellSystem.spawnCast(state.enemies[0], 1);
  SpellSystem.updateProjectiles();
  const ward = state.projectiles[0];
  EnemySystem.fireProjectile(ward.x, ward.y, 0, 0, "#ffffff", 60);
  SpellSystem.updateProjectiles();
`);
assert.equal(evaluate('state.enemyProjectiles.length'), 0, 'Orbit should visibly protect its close-range role by blocking shots');

evaluate(`
  state.enemyProjectiles = [];
  const caster = EnemySystem.makeEnemy(80, 100, { family: "caster", count: 1 });
  caster.attackState = "aim";
  caster.attackTimer = 0;
  caster.targetX = state.player.x;
  caster.targetY = state.player.y;
  EnemySystem.moveCaster(caster, state.player, 1);
`);
assert.equal(evaluate('state.enemyProjectiles.length'), 1, 'the ranged family should fire an aimed hazard');

evaluate(`
  const elite = EnemySystem.makeEnemy(80, 100, { family: "chaser", count: 1, elite: true });
  elite.attackState = "hunt";
  elite.attackTimer = 0;
  EnemySystem.updateElite(elite, state.player, 1);
  state.__eliteForTest = elite;
`);
assert.equal(evaluate('state.__eliteForTest.attackState'), 'telegraph', 'the elite should have its charge telegraph');

evaluate(`
  const boss = EnemySystem.makeEnemy(160, 90, { boss: true, count: 1 });
  boss.attackState = "volleyTell";
  boss.attackTimer = 0;
  EnemySystem.updateBoss(boss, state.player, 1);
`);
assert.ok(evaluate('state.enemyProjectiles.length >= 10'), 'the boss should release a distinct radial volley');

evaluate(`
  RunSystem.startNew(9191);
  state.spell = { form: "orbit", essence: "ember", law: "split" };
  state.enemies = [];
  for (let index = 0; index < 36; index += 1) {
    state.enemies.push(EnemySystem.makeEnemy(30 + (index % 9) * 32, 90 + Math.floor(index / 9) * 48, { family: index % 2 ? "caster" : "chaser", count: 1 }));
  }
  for (let cast = 0; cast < 180; cast += 1) {
    state.player.cooldown = 0;
    SpellSystem.cast();
    addSparks(160, 240, 9, "#ffffff");
  }
  for (let shot = 0; shot < 160; shot += 1) {
    EnemySystem.fireProjectile(160, 100, 0, 1, "#ffffff", 200);
  }
`);
assert.ok(evaluate('state.projectiles.length <= MAX_PROJECTILES'), 'player projectile count must remain capped');
assert.ok(evaluate('state.enemyProjectiles.length <= MAX_ENEMY_PROJECTILES'), 'enemy projectile count must remain capped');
assert.ok(evaluate('state.sparks.length <= MAX_SPARKS'), 'particle count must remain capped');

evaluate(`
  state.spell.law = "echo";
  state.pendingCasts = [];
  for (let cast = 0; cast < 100; cast += 1) {
    state.player.cooldown = 0;
    SpellSystem.cast();
  }
`);
assert.ok(evaluate('state.pendingCasts.length <= MAX_PENDING_CASTS'), 'pending Echo casts must remain capped');
evaluate('draw()');

const buildResults = JSON.parse(evaluate(`
  JSON.stringify((function () {
    const builds = [
      { form: "bolt", essence: "ember", law: "split" },
      { form: "bolt", essence: "frost", law: "echo" },
      { form: "orbit", essence: "ember", law: "split" }
    ];
    const results = [];
    for (let run = 0; run < builds.length; run += 1) {
      RunSystem.startNew(10001 + run);
      state.spell = { ...builds[run] };
      let frames = 0;
      while (state.mode !== "win" && frames < 90000) {
        if (state.mode === "upgrade") {
          const supportButton = upgradeChoices.children.find((button) => button.dataset.axis === "support");
          supportButton.handlers.click();
          state.spell = { ...builds[run] };
        } else {
          state.player.hp = state.player.maxHp;
          state.player.invincible = 120;
          const threat = SpellSystem.selectTarget();
          if (threat) {
            pointerControl.active = state.spell.form === "orbit";
            let orbitX = threat.x + (threat.id % 2 === 0 ? 30 : -30);
            let orbitY = threat.y;
            if (orbitX < 20 || orbitX > W - 20) {
              orbitX = threat.x;
              orbitY = threat.y + (threat.y < H / 2 ? 30 : -30);
            }
            pointerControl.x = clamp(orbitX, 20, W - 20);
            pointerControl.y = clamp(orbitY, 76, H - 34);
          } else {
            pointerControl.active = false;
          }
          update();
        }
        frames += 1;
      }
      results.push({
        mode: state.mode,
        wave: state.wave,
        frames,
        elapsed: state.runElapsed,
        score: state.score,
        checkpoint: persistent.checkpoint
      });
    }
    return results;
  })())
`));

for (const [index, result] of buildResults.entries()) {
  assert.equal(result.mode, 'win', `seeded build ${index + 1} should complete the full 12-wave run`);
  assert.equal(result.wave, 12);
  assert.ok(result.elapsed >= 3 * 60 * 60, 'the active representative clear should remain substantial');
  assert.ok(result.elapsed < 349 * 60, 'removing forced timer padding should beat the phone-tested 5:49 floor');
  assert.ok(result.score > 0);
  assert.equal(result.checkpoint, null, 'victory should clear the checkpoint');
}
assert.equal(new Set(buildResults.map((result) => result.score)).size, 1, 'seeded full runs should keep deterministic scoring');
assert.ok(buildResults[2].elapsed <= buildResults[0].elapsed * 1.15, 'Orbit should clear the representative run competitively with Bolt');
assert.ok(evaluate('persistent.profile.wins >= 3'));
assert.ok(evaluate('persistent.profile.discovered.length >= 3'));

process.stdout.write(
  'Pixel Mage checks passed: 3 active 12-wave clears, 8 readable spell combinations, form balance, save migration, and stress limits.\n',
);
