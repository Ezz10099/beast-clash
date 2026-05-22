import { GameState } from '../state/GameState.js';

export class TeamPreviewScene extends Phaser.Scene {
  constructor() {
    super('TeamPreviewScene');
  }

  create() {
    const cx = 195;

    this.add.rectangle(cx, 422, 390, 844, 0x0c0911);
    this.add.rectangle(cx, 422, 350, 760, 0x15101d).setStrokeStyle(2, 0x5a3f83);

    this.add.text(cx, 70, 'Choose Your Beasts', {
      fontFamily: 'Arial',
      fontSize: '34px',
      color: '#f1d27a',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5);

    this.add.text(cx, 115, `Gold ${GameState.gold}   Meat ${GameState.meat}   XP ${GameState.beastXp}`, {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#d9c7ff',
    }).setOrigin(0.5);

    this.add.text(cx, 145, `Battles Won: ${GameState.battlesWon}`, {
      fontFamily: 'Arial',
      fontSize: '17px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.createPanel(195, 330, 320, 300, 'Player Team', [
      'Gorilla: Bruiser / Ground Slam',
      'Tiger: Assassin / Savage Pounce',
      'Snake: Poison / Toxic Cloud',
    ], 0x203327);

    this.createPanel(195, 590, 320, 185, 'Enemy Team', [
      'Rhino',
      'Crocodile',
      'Eagle',
    ], 0x332723);

    const startBtn = this.add.rectangle(cx, 755, 260, 70, 0x365f20).setStrokeStyle(3, 0xa8ef6f).setInteractive({ useHandCursor: true });
    const startLabel = this.add.text(cx, 755, 'Start Fight', {
      fontFamily: 'Arial',
      fontSize: '30px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 5,
    }).setOrigin(0.5);

    startBtn.on('pointerdown', () => this.scene.start('BattleScene'));
    startLabel.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('BattleScene'));
  }

  createPanel(x, y, w, h, title, lines, fillColor) {
    this.add.rectangle(x, y, w, h, fillColor).setStrokeStyle(2, 0x6d4b9a);
    this.add.text(x, y - (h / 2) + 28, title, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#f1d27a',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    const content = lines.map(line => `• ${line}`).join('\n');
    this.add.text(x - (w / 2) + 24, y - (h / 2) + 62, content, {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ffffff',
      lineSpacing: 12,
      wordWrap: { width: w - 40 },
    });
  }
}
