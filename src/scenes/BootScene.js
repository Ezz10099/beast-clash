export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    this.add.text(480, 120, 'BEAST CLASH', {
      fontFamily: 'Arial',
      fontSize: '56px',
      color: '#f1d27a',
      stroke: '#000000',
      strokeThickness: 8,
    }).setOrigin(0.5);

    this.add.text(480, 185, 'Animal auto-battle prototype', {
      fontFamily: 'Arial',
      fontSize: '22px',
      color: '#d9c7ff',
    }).setOrigin(0.5);

    const start = this.add.text(480, 310, 'Start Test Battle', {
      fontFamily: 'Arial',
      fontSize: '30px',
      color: '#ffffff',
      backgroundColor: '#4b247a',
      padding: { x: 28, y: 16 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    start.on('pointerdown', () => {
      this.scene.start('BattleScene');
    });

    this.add.text(480, 470, 'MVP: 3v3 side-view battle • code-driven animations • placeholder sprites', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#8f86a8',
    }).setOrigin(0.5);
  }
}
