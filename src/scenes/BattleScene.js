import { ANIMALS } from '../data/animals.js';
import { BattleLogic } from '../systems/BattleLogic.js';

export class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
    this.fighters = [];
    this.turnQueue = [];
  }

  create() {
    this.fighters = [];
    this.turnQueue = [];
    this.createBackground();
    this.createTeams();
    this.createHud();
    this.time.delayedCall(700, () => this.startBattleLoop());
  }

  createBackground() {
    this.add.rectangle(195, 422, 390, 844, 0x0c0911);

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

    this.add.rectangle(195, 445, 358, 560, 0x17111f)
      .setStrokeStyle(3, 0x6d4b9a);

    this.add.rectangle(195, 710, 358, 82, 0x100b17)
      .setStrokeStyle(2, 0x3d2b5c);
  }

  createTeams() {
    const leftTeam = ['gorilla', 'tiger', 'snake'];
    const rightTeam = ['rhino', 'crocodile', 'eagle'];
    const ySlots = [245, 410, 575];

    leftTeam.forEach((id, index) => {
      const fighter = BattleLogic.createFighter(ANIMALS[id], 'player', index);
      this.createFighterVisual(fighter, 95, ySlots[index], false);
      this.fighters.push(fighter);
    });

    rightTeam.forEach((id, index) => {
      const fighter = BattleLogic.createFighter(ANIMALS[id], 'enemy', index);
      this.createFighterVisual(fighter, 295, ySlots[index], true);
      this.fighters.push(fighter);
    });
  }

  createFighterVisual(fighter, x, y, flip) {
    const scale = this.getAnimalScale(fighter.id);
    const body = this.add.ellipse(0, 0, 76 * scale, 48 * scale, fighter.color)
      .setStrokeStyle(3, 0x09070d);

    const headX = flip ? -42 * scale : 42 * scale;
    const head = this.add.circle(headX, -10 * scale, 24 * scale, fighter.color)
      .setStrokeStyle(3, 0x09070d);

    const eyeX = flip ? headX - 7 * scale : headX + 7 * scale;
    const eye = this.add.circle(eyeX, -17 * scale, 4 * scale, 0xffffff);

    const shadow = this.add.ellipse(0, 36 * scale, 84 * scale, 14 * scale, 0x000000, 0.28);
    const parts = [shadow, body, head, eye];
    this.addAnimalFeature(parts, fighter, flip, scale);

    const container = this.add.container(x, y, parts);
    container.setData('baseX', x);
    container.setData('baseY', y);
    fighter.sprite = container;

    fighter.nameText = this.add.text(x, y - 62, fighter.name, {
      fontFamily: 'Arial',
      fontSize: '15px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.rectangle(x, y - 43, 96, 11, 0x32070b).setOrigin(0.5);
    fighter.hpBar = this.add.rectangle(x - 48, y - 43, 96, 11, 0x35d04f).setOrigin(0, 0.5);

    fighter.statusText = this.add.text(x, y + 58, '', {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: '#d9c7ff',
      stroke: '#000000',
      strokeThickness: 3,
      align: 'center',
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
      gorilla: 1.13,
      tiger: 1.02,
      snake: 0.82,
      rhino: 1.18,
      crocodile: 1.02,
      eagle: 0.86,
    };
    return scales[id] || 1;
  }

  addAnimalFeature(parts, fighter, flip, scale) {
    if (fighter.id === 'rhino') {
      const hornX = flip ? -72 * scale : 72 * scale;
      parts.push(this.add.triangle(hornX, -11 * scale, 0, 8, 0, -8, flip ? -28 : 28, 0, 0xd8d0b2));
    }

    if (fighter.id === 'eagle') {
      parts.push(this.add.triangle(0, -5 * scale, -48 * scale, 18 * scale, 0, -18 * scale, 48 * scale, 18 * scale, 0xb8b89f));
    }

    if (fighter.id === 'snake') {
      parts.push(this.add.ellipse(flip ? -22 * scale : 22 * scale, 7 * scale, 92 * scale, 26 * scale, fighter.color));
    }

    if (fighter.id === 'tiger') {
      parts.push(this.add.rectangle(0, -2 * scale, 10 * scale, 48 * scale, 0x2b1609));
      parts.push(this.add.rectangle(22 * scale, -2 * scale, 8 * scale, 38 * scale, 0x2b1609));
    }

    if (fighter.id === 'gorilla') {
      parts.push(this.add.circle(flip ? 35 * scale : -35 * scale, 12 * scale, 18 * scale, 0x5a514d));
    }

    if (fighter.id === 'crocodile') {
      parts.push(this.add.rectangle(flip ? -58 * scale : 58 * scale, 0, 42 * scale, 18 * scale, 0x31552f));
    }
  }

  createHud() {
    this.roundText = this.add.text(195, 145, 'AUTO BATTLE', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#f1d27a',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.logText = this.add.text(195, 710, 'Battle starting...', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 5,
      align: 'center',
      wordWrap: { width: 330 },
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
      fighter.hpBar.width = 96 * ratio;

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

    this.add.rectangle(195, 340, 310, 125, 0x100b17, 0.92)
      .setStrokeStyle(3, 0x6d4b9a);

    this.add.text(195, 315, message.toUpperCase(), {
      fontFamily: 'Arial',
      fontSize: '34px',
      color: '#f1d27a',
      stroke: '#000000',
      strokeThickness: 7,
    }).setOrigin(0.5);

    const restart = this.add.text(195, 372, 'Tap to restart', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#5a2b8f',
      padding: { x: 18, y: 12 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    restart.on('pointerdown', () => this.scene.restart());
  }
}
