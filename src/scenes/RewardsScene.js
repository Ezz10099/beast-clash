import { GameState } from '../state/GameState.js';

export class RewardsScene extends Phaser.Scene {
  constructor() {
    super('RewardsScene');
  }

  create() {
    const cx = 195;
    const rewards = GameState.pendingRewards || { gold: 0, meat: 0, beastXp: 0 };

    this.add.rectangle(cx, 422, 390, 844, 0x0c0911);
    this.add.rectangle(cx, 422, 340, 700, 0x15101d).setStrokeStyle(2, 0x5a3f83);

    this.add.text(cx, 140, 'VICTORY', {
      fontFamily: 'Arial',
      fontSize: '62px',
      color: '#f1d27a',
      stroke: '#000000',
      strokeThickness: 8,
    }).setOrigin(0.5);

    this.add.rectangle(cx, 390, 300, 290, 0x1a1426).setStrokeStyle(2, 0x6d4b9a);
    this.add.text(cx, 280, 'Rewards', {
      fontFamily: 'Arial',
      fontSize: '30px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 5,
    }).setOrigin(0.5);

    this.add.text(cx - 120, 340, `+ Gold`, { fontFamily: 'Arial', fontSize: '26px', color: '#f1d27a' });
    this.add.text(cx + 120, 340, `${rewards.gold}`, { fontFamily: 'Arial', fontSize: '26px', color: '#f1d27a' }).setOrigin(1, 0);

    this.add.text(cx - 120, 395, `+ Meat`, { fontFamily: 'Arial', fontSize: '26px', color: '#c8ffa0' });
    this.add.text(cx + 120, 395, `${rewards.meat}`, { fontFamily: 'Arial', fontSize: '26px', color: '#c8ffa0' }).setOrigin(1, 0);

    this.add.text(cx - 120, 450, `+ Beast XP`, { fontFamily: 'Arial', fontSize: '26px', color: '#9ad1ff' });
    this.add.text(cx + 120, 450, `${rewards.beastXp}`, { fontFamily: 'Arial', fontSize: '26px', color: '#9ad1ff' }).setOrigin(1, 0);

    this.add.text(cx, 545, `Total Gold: ${GameState.gold}\nTotal Meat: ${GameState.meat}\nTotal Beast XP: ${GameState.beastXp}\nBattles Won: ${GameState.battlesWon}`, {
      fontFamily: 'Arial',
      fontSize: '20px',
      align: 'center',
      color: '#ffffff',
      lineSpacing: 8,
    }).setOrigin(0.5);

    const continueBtn = this.add.rectangle(cx, 730, 250, 70, 0x365f20).setStrokeStyle(3, 0xa8ef6f).setInteractive({ useHandCursor: true });
    const continueLabel = this.add.text(cx, 730, 'Continue', {
      fontFamily: 'Arial',
      fontSize: '30px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 5,
    }).setOrigin(0.5);

    const goNext = () => {
      GameState.pendingRewards = null;
      this.scene.start('TeamPreviewScene');
    };

    continueBtn.on('pointerdown', goNext);
    continueLabel.setInteractive({ useHandCursor: true }).on('pointerdown', goNext);
  }
}
