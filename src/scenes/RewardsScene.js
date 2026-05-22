import { GameState } from '../state/GameState.js';

export class RewardsScene extends Phaser.Scene {
  constructor() {
    super('RewardsScene');
  }

  create() {
    const cx = 195;
    const rewards = GameState.pendingRewards || { gold: 0, meat: 0, beastXp: 0 };

    this.add.rectangle(cx, 422, 390, 844, 0x08060d);
    this.add.ellipse(cx, 180, 430, 320, 0x2a1545, 0.35);
    this.add.rectangle(cx, 422, 340, 700, 0x141023).setStrokeStyle(2, 0x5a3f83);

    this.createGlowTitle(cx, 132, 'VICTORY');

    this.add.rectangle(cx, 400, 312, 310, 0x181128).setStrokeStyle(2, 0x8f6f3b);
    this.add.text(cx, 278, 'Rewards', {
      fontFamily: 'Arial', fontSize: '30px', color: '#ffffff', stroke: '#000000', strokeThickness: 5,
    }).setOrigin(0.5);

    this.createRewardRow(cx, 338, '✦ Gold', rewards.gold, '#f1d27a');
    this.createRewardRow(cx, 397, '✦ Meat', rewards.meat, '#c8ffa0');
    this.createRewardRow(cx, 456, '✦ Beast XP', rewards.beastXp, '#9ad1ff');

    this.add.text(cx, 560, `Total Gold: ${GameState.gold}\nTotal Meat: ${GameState.meat}\nTotal Beast XP: ${GameState.beastXp}\nBattles Won: ${GameState.battlesWon}`, {
      fontFamily: 'Arial', fontSize: '20px', align: 'center', color: '#ffffff', lineSpacing: 8, stroke: '#000000', strokeThickness: 4,
    }).setOrigin(0.5);

    const continueBtn = this.createButton(cx, 730, 250, 70, 'Continue');

    const goNext = () => {
      GameState.pendingRewards = null;
      this.scene.start('TeamPreviewScene');
    };

    continueBtn.on('pointerdown', goNext);
  }

  createGlowTitle(x, y, label) {
    const glow = this.add.text(x, y, label, {
      fontFamily: 'Arial', fontSize: '62px', color: '#ffe9b8', stroke: '#3a1f0f', strokeThickness: 12,
    }).setOrigin(0.5).setAlpha(0.3);
    const title = this.add.text(x, y, label, {
      fontFamily: 'Arial', fontSize: '62px', color: '#f1d27a', stroke: '#000000', strokeThickness: 8,
    }).setOrigin(0.5);
    this.tweens.add({ targets: [glow, title], alpha: { from: 0.7, to: 1 }, duration: 1400, yoyo: true, repeat: -1 });
  }

  createRewardRow(cx, y, label, value, color) {
    const card = this.add.rectangle(cx, y, 270, 46, 0x0f0c18).setStrokeStyle(1, 0x6d4b9a);
    this.add.text(cx - 118, y, `+ ${label}`, { fontFamily: 'Arial', fontSize: '24px', color }).setOrigin(0, 0.5);
    const amount = this.add.text(cx + 118, y, `${value}`, { fontFamily: 'Arial', fontSize: '26px', color, stroke: '#000000', strokeThickness: 4 }).setOrigin(1, 0.5);
    this.tweens.add({ targets: [card, amount], scaleX: 1.02, scaleY: 1.02, duration: 650, yoyo: true, repeat: -1, delay: y * 2 });
  }

  createButton(x, y, w, h, label) {
    const glow = this.add.rectangle(x, y, w + 10, h + 10, 0xd5ad64, 0.2);
    const btn = this.add.rectangle(x, y, w, h, 0x365f20).setStrokeStyle(3, 0xa8ef6f).setInteractive({ useHandCursor: true });
    const txt = this.add.text(x, y, label, {
      fontFamily: 'Arial', fontSize: '30px', color: '#ffffff', stroke: '#000000', strokeThickness: 5,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.tweens.add({ targets: glow, alpha: 0.48, duration: 1000, yoyo: true, repeat: -1 });
    txt.on('pointerdown', () => btn.emit('pointerdown'));
    return btn;
  }
}
