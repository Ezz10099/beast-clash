import { ANIMALS } from '../data/animals.js';
import { BattleLogic } from '../systems/BattleLogic.js';
import { GameState, VICTORY_REWARDS } from '../state/GameState.js';
import { AnimalShapeRenderer } from '../renderers/AnimalShapeRenderer.js';

export class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
    this.fighters = [];
    this.turnQueue = [];
    this.isBattleOver = false;
    this.ultimateButtons = [];

    this.playerUltimateIds = ['gorilla', 'tiger', 'snake'];
    this.maxEnergy = 100;
    this.attackEnergyGain = 28;
    this.damageEnergyFactor = 0.3;
  }

  create() {
    this.fighters = [];
    this.turnQueue = [];
    this.isBattleOver = false;
    this.ultimateButtons = [];

    this.createBackground();
    this.createTeams();
    this.createHud();
    this.createUltimateButtons();
    this.refreshAllVisuals();
    this.time.delayedCall(700, () => this.startBattleLoop());
  }

  createBackground() {
    this.add.rectangle(195, 422, 390, 844, 0x08060d);
    this.add.ellipse(195, 170, 430, 290, 0x24143d, 0.33);
    this.add.ellipse(195, 560, 480, 640, 0x1a1030, 0.25);

    this.add.rectangle(195, 92, 350, 96, 0x17111f)
      .setStrokeStyle(2, 0x5a3f83);

    this.add.text(195, 58, 'BEAST CLASH', {
      fontFamily: 'Arial',
      fontSize: '30px',
      color: '#f1d27a',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5);

    this.add.text(195, 98, 'Ancient Jungle Arena', {
      fontFamily: 'Arial',
      fontSize: '17px',
      color: '#d9c7ff',
    }).setOrigin(0.5);

    this.add.rectangle(195, 430, 358, 530, 0x141021)
      .setStrokeStyle(3, 0x6d4b9a);

    this.add.ellipse(195, 524, 324, 150, 0x0b0812).setStrokeStyle(2, 0x8f6f3d, 0.7);
    const arenaLine = this.add.rectangle(195, 520, 306, 2, 0xc9a766, 0.65);
    this.tweens.add({ targets: arenaLine, alpha: 0.2, yoyo: true, repeat: -1, duration: 1500 });

    this.add.rectangle(195, 665, 358, 88, 0x100b17)
      .setStrokeStyle(2, 0x3d2b5c);

    this.add.rectangle(195, 785, 358, 106, 0x100b17)
      .setStrokeStyle(2, 0x3d2b5c);
  }

  createTeams() {
    const leftTeam = ['gorilla', 'tiger', 'snake'];
    const rightTeam = ['rhino', 'crocodile', 'eagle'];
    const ySlots = [245, 410, 575];

    leftTeam.forEach((id, index) => {
      const fighter = BattleLogic.createFighter(ANIMALS[id], 'player', index);
      fighter.energy = 0;
      this.createFighterVisual(fighter, 95, ySlots[index], false);
      this.fighters.push(fighter);
    });

    rightTeam.forEach((id, index) => {
      const fighter = BattleLogic.createFighter(ANIMALS[id], 'enemy', index);
      fighter.energy = 0;
      this.createFighterVisual(fighter, 295, ySlots[index], true);
      this.fighters.push(fighter);
    });
  }

  createFighterVisual(fighter, x, y, flip) {
    const scale = this.getAnimalScale(fighter.id);
    const parts = AnimalShapeRenderer.create(this, fighter, flip, scale);

    const container = this.add.container(x, y, parts);
    container.setData('baseX', x);
    container.setData('baseY', y);
    fighter.sprite = container;

    fighter.nameText = this.add.text(x, y - 66, fighter.name, {
      fontFamily: 'Arial',
      fontSize: '15px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.rectangle(x, y - 47, 108, 16, 0x0a0910).setStrokeStyle(1, 0x8f6f3c).setOrigin(0.5);
    this.add.rectangle(x, y - 47, 100, 8, 0x32070b).setOrigin(0.5);
    fighter.hpBar = this.add.rectangle(x - 50, y - 47, 100, 8, 0x35d04f).setOrigin(0, 0.5);

    fighter.statusText = this.add.text(x, y + 62, '', {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: '#d9c7ff',
      stroke: '#000000',
      strokeThickness: 3,
      align: 'center',
      wordWrap: { width: 115 },
    }).setOrigin(0.5);

    this.tweens.add({
      targets: container,
      y: y - 5,
      duration: 850 + Math.random() * 250,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  getAnimalScale(id) {
    const scales = {
      gorilla: 1.08,
      tiger: 1.00,
      snake: 0.95,
      rhino: 1.08,
      crocodile: 1.00,
      eagle: 0.95,
    };
    return scales[id] || 1;
  }


  createHud() {
    this.roundText = this.add.text(195, 145, 'AUTO BATTLE', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#f1d27a',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.rectangle(195, 665, 346, 82, 0x120d1b).setStrokeStyle(2, 0x6d4b9a);
    this.logText = this.add.text(195, 665, 'Battle starting...', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 5,
      align: 'center',
      wordWrap: { width: 330 },
    }).setOrigin(0.5);
  }

  createUltimateButtons() {
    const playerFighters = this.fighters.filter(f => f.team === 'player' && this.playerUltimateIds.includes(f.id));
    const xPositions = [70, 195, 320];

    playerFighters.forEach((fighter, index) => {
      const x = xPositions[index] || (70 + (index * 125));
      const y = 785;
      const glow = this.add.rectangle(x, y, 118, 94, 0xc9a766, 0.14);
      const bg = this.add.rectangle(x, y, 110, 86, 0x2b1a3f).setStrokeStyle(2, 0x6d4b9a);
      const label = this.add.text(x, y - 20, this.getUltimateName(fighter.id), {
        fontFamily: 'Arial', fontSize: '11px', color: '#ffffff', align: 'center', wordWrap: { width: 100 },
      }).setOrigin(0.5);
      const energyText = this.add.text(x, y + 18, '0%', {
        fontFamily: 'Arial', fontSize: '20px', color: '#9aa3ff', stroke: '#000000', strokeThickness: 4,
      }).setOrigin(0.5);

      const button = this.add.container(x, y, [glow, bg, label, energyText]).setSize(118, 94).setInteractive({ useHandCursor: true });
      button.on('pointerdown', () => this.useUltimate(fighter.id));

      this.ultimateButtons.push({ fighterId: fighter.id, container: button, bg, glow, energyText, label });
    });

    this.updateUltimateButtons();
  }

  updateUltimateButtons() {
    for (const button of this.ultimateButtons) {
      const fighter = this.fighters.find(f => f.id === button.fighterId && f.team === 'player');
      if (!fighter) continue;

      const energy = Phaser.Math.Clamp(Math.round(fighter.energy || 0), 0, this.maxEnergy);
      const ready = energy >= this.maxEnergy;
      const canUse = ready && fighter.alive && !this.isBattleOver;

      if (!fighter.alive) {
        button.glow.setAlpha(0.05);
        button.bg.setFillStyle(0x1b1b1b);
        button.bg.setStrokeStyle(2, 0x444444);
        button.energyText.setText('KO');
        button.energyText.setColor('#777777');
      } else if (canUse) {
        button.glow.setAlpha(0.42);
        button.bg.setFillStyle(0x365f20);
        button.bg.setStrokeStyle(3, 0xa8ef6f);
        button.energyText.setText('READY');
        button.energyText.setColor('#d8ffad');
      } else {
        button.glow.setAlpha(0.12);
        button.bg.setFillStyle(0x2b1a3f);
        button.bg.setStrokeStyle(2, 0x6d4b9a);
        button.energyText.setText(`${energy}%`);
        button.energyText.setColor('#9aa3ff');
      }
    }
  }

  addEnergy(fighter, amount) {
    if (!fighter || fighter.team !== 'player' || !this.playerUltimateIds.includes(fighter.id) || !fighter.alive || this.isBattleOver) {
      return;
    }

    fighter.energy = Phaser.Math.Clamp((fighter.energy || 0) + amount, 0, this.maxEnergy);
    this.updateUltimateButtons();
  }

  useUltimate(fighterId) {
    if (this.isBattleOver) return;

    const fighter = this.fighters.find(f => f.id === fighterId && f.team === 'player');
    if (!fighter || !fighter.alive || (fighter.energy || 0) < this.maxEnergy) return;

    const enemies = this.fighters.filter(f => f.team === 'enemy' && f.alive);
    if (enemies.length === 0) return;

    this.showLog(`${fighter.name} uses ${this.getUltimateName(fighter.id)}!`);

    if (fighter.id === 'gorilla') {
      this.cameras.main.shake(260, 0.015);
      enemies.forEach(enemy => {
        BattleLogic.applyDamage(enemy, 32);
        enemy.statuses.push({ type: 'stun', turns: 1, damage: 0 });
        this.showFloatingText(enemy, 'GROUND SLAM', '#ffcf6c', -26);
      });
    } else if (fighter.id === 'tiger') {
      const target = enemies.sort((a, b) => a.hp - b.hp)[0];
      if (target) {
        BattleLogic.applyDamage(target, 50);
        target.statuses.push({ type: 'bleed', turns: 3, damage: 7 });
        this.showFloatingText(target, 'SAVAGE POUNCE', '#ffa8a8', -26);
        this.playHitEffect(target, 50, 'bleed');
      }
    } else if (fighter.id === 'snake') {
      this.cameras.main.flash(200, 120, 255, 120);
      enemies.forEach(enemy => {
        BattleLogic.applyDamage(enemy, 18);
        enemy.statuses.push({ type: 'poison', turns: 3, damage: 7 });
        this.showFloatingText(enemy, 'TOXIC CLOUD', '#8fff99', -26);
      });
    }

    fighter.energy = 0;
    this.refreshAllVisuals();
    this.updateUltimateButtons();

    if (!BattleLogic.teamAlive(this.fighters, 'enemy')) {
      this.endBattle('Player wins');
    }
  }

  getUltimateName(fighterId) {
    const names = {
      gorilla: 'Ground Slam',
      tiger: 'Savage Pounce',
      snake: 'Toxic Cloud',
    };
    return names[fighterId] || 'Ultimate';
  }

  startBattleLoop() {
    if (this.isBattleOver) return;
    this.turnQueue = BattleLogic.getTurnOrder(this.fighters);
    this.runNextTurn();
  }

  runNextTurn() {
    if (this.isBattleOver) return;
    if (!BattleLogic.teamAlive(this.fighters, 'player')) return this.endBattle('Enemy wins');
    if (!BattleLogic.teamAlive(this.fighters, 'enemy')) return this.endBattle('Player wins');

    if (this.turnQueue.length === 0) this.turnQueue = BattleLogic.getTurnOrder(this.fighters);

    const attacker = this.turnQueue.shift();
    if (!attacker || !attacker.alive) {
      this.time.delayedCall(250, () => this.runNextTurn());
      return;
    }

    const statusEvents = BattleLogic.processStartOfTurn(attacker);
    this.refreshAllVisuals();

    if (statusEvents.length > 0) {
      const e = statusEvents[0];
      this.showFloatingText(e.target, `-${e.damage} ${e.type}`, '#b56cff');
    }

    if (!attacker.alive) {
      this.showLog(`${attacker.name} falls from damage over time.`);
      this.time.delayedCall(700, () => this.runNextTurn());
      return;
    }

    if (BattleLogic.isStunned(attacker)) {
      BattleLogic.clearOneStun(attacker);
      this.showLog(`${attacker.name} is stunned and misses the turn.`);
      this.refreshAllVisuals();
      this.time.delayedCall(850, () => this.runNextTurn());
      return;
    }

    const target = BattleLogic.chooseTarget(attacker, this.fighters);
    if (!target) return;
    this.performAttack(attacker, target);
  }

  performAttack(attacker, target) {
    if (this.isBattleOver) return;
    const baseX = attacker.sprite.getData('baseX');
    const targetX = target.sprite.getData('baseX');
    const attackX = baseX + (targetX > baseX ? 72 : -72);

    this.showLog(`${attacker.name}: ${attacker.basicMove}`);

    this.tweens.add({
      targets: attacker.sprite,
      x: attackX,
      duration: 220,
      ease: 'Power2',
      onComplete: () => {
        const damage = Phaser.Math.Between(attacker.attack - 4, attacker.attack + 5);
        BattleLogic.applyDamage(target, damage);
        this.addEnergy(attacker, this.attackEnergyGain);
        this.addEnergy(target, Math.ceil(damage * this.damageEnergyFactor));
        const appliedStatus = BattleLogic.tryApplyStatus(attacker, target);

        this.playHitEffect(target, damage, appliedStatus);
        this.refreshAllVisuals();

        this.tweens.add({
          targets: attacker.sprite,
          x: baseX,
          duration: 260,
          ease: 'Power2',
          onComplete: () => this.time.delayedCall(450, () => this.runNextTurn()),
        });
      },
    });
  }

  playHitEffect(target, damage, appliedStatus) {
    this.cameras.main.shake(90, 0.006);
    this.showFloatingText(target, `-${damage}`, '#ffeb8a');

    const x = target.sprite.getData('baseX');
    const y = target.sprite.getData('baseY');

    const slash = this.add.text(x, y - 5, '✦', {
      fontFamily: 'Arial',
      fontSize: '54px',
      color: '#ffffff',
      stroke: '#5b1b1b',
      strokeThickness: 5,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: slash,
      scale: 1.7,
      alpha: 0,
      duration: 320,
      onComplete: () => slash.destroy(),
    });

    this.tweens.add({
      targets: target.sprite,
      x: x + Phaser.Math.Between(-8, 8),
      duration: 55,
      yoyo: true,
      repeat: 3,
    });

    if (appliedStatus) this.showFloatingText(target, appliedStatus.toUpperCase(), '#d9c7ff', -35);
  }

  showFloatingText(fighter, text, color = '#ffffff', yOffset = 0) {
    const x = fighter.sprite.getData('baseX');
    const y = fighter.sprite.getData('baseY') - 72 + yOffset;

    const floating = this.add.text(x, y, text, {
      fontFamily: 'Arial',
      fontSize: '22px',
      color,
      stroke: '#000000',
      strokeThickness: 5,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: floating,
      y: y - 42,
      alpha: 0,
      duration: 750,
      ease: 'Power1',
      onComplete: () => floating.destroy(),
    });
  }

  refreshAllVisuals() {
    for (const fighter of this.fighters) {
      const ratio = Phaser.Math.Clamp(fighter.hp / fighter.maxHp, 0, 1);
      fighter.hpBar.width = 100 * ratio;

      if (!fighter.alive) {
        fighter.sprite.setAlpha(0.35);
        fighter.sprite.setRotation(0.2);
      }

      fighter.statusText.setText(fighter.statuses.map(s => s.type).join(' • '));
    }

    this.updateUltimateButtons();
  }

  showLog(message) {
    this.logText.setText(message);
  }

  endBattle(message) {
    if (this.isBattleOver) return;
    this.isBattleOver = true;

    this.showLog(message);
    this.updateUltimateButtons();

    this.add.rectangle(195, 340, 310, 125, 0x100b17, 0.92)
      .setStrokeStyle(3, 0x6d4b9a);

    this.add.text(195, 315, message.toUpperCase(), {
      fontFamily: 'Arial',
      fontSize: '34px',
      color: '#f1d27a',
      stroke: '#000000',
      strokeThickness: 7,
    }).setOrigin(0.5);

    const isPlayerWin = message === 'Player wins';
    const restartLabel = isPlayerWin ? 'Continue' : 'Tap to retry';
    const restart = this.add.text(195, 372, restartLabel, {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#5a2b8f',
      padding: { x: 18, y: 12 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    if (isPlayerWin) {
      this.time.delayedCall(900, () => this.onPlayerVictory());
      restart.on('pointerdown', () => this.onPlayerVictory());
      return;
    }

    restart.on('pointerdown', () => this.scene.restart());
  }

  onPlayerVictory() {
    if (!this.isBattleOver || this.scene.isActive('RewardsScene')) return;

    GameState.gold += VICTORY_REWARDS.gold;
    GameState.meat += VICTORY_REWARDS.meat;
    GameState.beastXp += VICTORY_REWARDS.beastXp;
    GameState.battlesWon += 1;
    GameState.pendingRewards = { ...VICTORY_REWARDS };

    this.scene.start('RewardsScene');
  }
}
