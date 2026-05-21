import { ANIMALS } from '../data/animals.js';
import { BattleLogic } from '../systems/BattleLogic.js';

export class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
    this.fighters = [];
    this.turnQueue = [];
  }

  create() {
    this.createBackground();
    this.createTeams();
    this.createHud();
    this.time.delayedCall(700, () => this.startBattleLoop());
  }

  createBackground() {
    this.add.rectangle(480, 270, 960, 540, 0x17111f);
    this.add.rectangle(480, 410, 900, 170, 0x241b2e).setStrokeStyle(3, 0x6d4b9a);

    this.add.text(480, 35, 'Ancient Jungle Arena', {
      fontFamily: 'Arial',
      fontSize: '26px',
      color: '#f1d27a',
      stroke: '#000000',
      strokeThickness: 5,
    }).setOrigin(0.5);
  }

  createTeams() {
    const leftTeam = ['gorilla', 'tiger', 'snake'];
    const rightTeam = ['rhino', 'crocodile', 'eagle'];

    leftTeam.forEach((id, index) => {
      const fighter = BattleLogic.createFighter(ANIMALS[id], 'player', index);
      this.createFighterVisual(fighter, 170, 220 + index * 85, false);
      this.fighters.push(fighter);
    });

    rightTeam.forEach((id, index) => {
      const fighter = BattleLogic.createFighter(ANIMALS[id], 'enemy', index);
      this.createFighterVisual(fighter, 790, 220 + index * 85, true);
      this.fighters.push(fighter);
    });
  }

  createFighterVisual(fighter, x, y, flip) {
    const body = this.add.ellipse(x, y, 82, 54, fighter.color).setStrokeStyle(3, 0x111111);
    const headX = flip ? x - 48 : x + 48;
    const head = this.add.circle(headX, y - 10, 26, fighter.color).setStrokeStyle(3, 0x111111);
    const eyeX = flip ? headX - 8 : headX + 8;
    const eye = this.add.circle(eyeX, y - 18, 4, 0xffffff);

    const container = this.add.container(x, y, [body, head, eye]);
    container.setData('baseX', x);
    container.setData('baseY', y);
    fighter.sprite = container;

    fighter.nameText = this.add.text(x, y - 68, fighter.name, {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.rectangle(x, y - 47, 88, 9, 0x330000).setOrigin(0.5);
    fighter.hpBar = this.add.rectangle(x - 44, y - 47, 88, 9, 0x35d04f).setOrigin(0, 0.5);

    fighter.statusText = this.add.text(x, y + 43, '', {
      fontFamily: 'Arial',
      fontSize: '13px',
      color: '#d9c7ff',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: container,
      y: y - 6,
      duration: 850 + Math.random() * 250,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  createHud() {
    this.logText = this.add.text(480, 500, 'Battle starting...', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 5,
    }).setOrigin(0.5);
  }

  startBattleLoop() {
    this.turnQueue = BattleLogic.getTurnOrder(this.fighters);
    this.runNextTurn();
  }

  runNextTurn() {
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
    const baseX = attacker.sprite.getData('baseX');
    const targetX = target.sprite.getData('baseX');
    const attackX = baseX + (targetX > baseX ? 115 : -115);

    this.showLog(`${attacker.name}: ${attacker.basicMove}`);

    this.tweens.add({
      targets: attacker.sprite,
      x: attackX,
      duration: 220,
      ease: 'Power2',
      onComplete: () => {
        const damage = Phaser.Math.Between(attacker.attack - 4, attacker.attack + 5);
        BattleLogic.applyDamage(target, damage);
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
    this.cameras.main.shake(90, 0.004);
    this.showFloatingText(target, `-${damage}`, '#ffeb8a');

    const x = target.sprite.getData('baseX');
    const y = target.sprite.getData('baseY');

    const slash = this.add.text(x, y - 5, '✦', {
      fontFamily: 'Arial',
      fontSize: '48px',
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
    const y = fighter.sprite.getData('baseY') - 65 + yOffset;

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
      fighter.hpBar.width = 88 * ratio;

      if (!fighter.alive) {
        fighter.sprite.setAlpha(0.35);
        fighter.sprite.setRotation(0.2);
      }

      fighter.statusText.setText(fighter.statuses.map(s => s.type).join(' • '));
    }
  }

  showLog(message) {
    this.logText.setText(message);
  }

  endBattle(message) {
    this.showLog(message);
    this.add.text(480, 110, message.toUpperCase(), {
      fontFamily: 'Arial',
      fontSize: '44px',
      color: '#f1d27a',
      stroke: '#000000',
      strokeThickness: 7,
    }).setOrigin(0.5);

    const restart = this.add.text(480, 165, 'Tap to restart', {
      fontFamily: 'Arial',
      fontSize: '22px',
      color: '#ffffff',
      backgroundColor: '#4b247a',
      padding: { x: 18, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    restart.on('pointerdown', () => this.scene.restart());
  }
}
