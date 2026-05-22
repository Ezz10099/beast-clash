export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    const cx = 195;

    this.add.rectangle(cx, 422, 390, 844, 0x0c0911);
    this.add.rectangle(cx, 422, 340, 690, 0x15101d).setStrokeStyle(2, 0x5a3f83);

    this.add.text(cx, 135, 'BEAST\nCLASH', {
      fontFamily: 'Arial',
      fontSize: '54px',
      align: 'center',
      color: '#f1d27a',
      stroke: '#000000',
      strokeThickness: 8,
      lineSpacing: -6,
    }).setOrigin(0.5);

    this.add.text(cx, 235, 'Animal auto-battle prototype', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#d9c7ff',
    }).setOrigin(0.5);

    this.add.text(cx, 330, '3v3 test battle', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 5,
    }).setOrigin(0.5);

    const start = this.add.text(cx, 430, 'START BATTLE', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#5a2b8f',
      padding: { x: 28, y: 18 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    start.on('pointerdown', () => {
      this.scene.start('TeamPreviewScene');
    });

    this.add.text(cx, 660, 'MVP build\nCode-driven animation\nPlaceholder animals', {
      fontFamily: 'Arial',
      fontSize: '16px',
      align: 'center',
      color: '#8f86a8',
      lineSpacing: 8,
    }).setOrigin(0.5);
  }
}
