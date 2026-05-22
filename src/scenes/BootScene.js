export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    const cx = 195;
    this.createBackground();

    this.createGlowText(cx, 140, 'BEAST\nCLASH', 56);

    this.add.text(cx, 245, 'Dark Fantasy Animal Auto-Battle', {
      fontFamily: 'Arial', fontSize: '18px', color: '#d8c7ff', stroke: '#000000', strokeThickness: 3,
    }).setOrigin(0.5);

    this.createPanel(cx, 332, 286, 76, '3v3 Arena Trial');

    const startBtn = this.createButton(cx, 448, 280, 78, 'START BATTLE');
    startBtn.on('pointerdown', () => this.scene.start('TeamPreviewScene'));

    this.add.text(cx, 666, 'Premium prototype • Portrait 390x844\nTap START to enter the arena', {
      fontFamily: 'Arial', fontSize: '15px', color: '#9587b7', align: 'center', lineSpacing: 6,
    }).setOrigin(0.5);
  }

  createBackground() {
    this.add.rectangle(195, 422, 390, 844, 0x08060d);
    this.add.ellipse(195, 130, 420, 300, 0x27143f, 0.35);
    this.add.ellipse(195, 620, 460, 620, 0x1a1030, 0.24);

    this.add.rectangle(195, 422, 346, 710, 0x141023, 0.95).setStrokeStyle(2, 0x5f4688);
    this.add.rectangle(195, 422, 330, 694, 0x0f0b19, 0.6).setStrokeStyle(1, 0x8965ba, 0.6);

    const line = this.add.rectangle(195, 498, 280, 2, 0xc6a35f, 0.7);
    this.tweens.add({ targets: line, alpha: 0.22, yoyo: true, repeat: -1, duration: 1700 });
  }

  createGlowText(x, y, text, size) {
    const glow = this.add.text(x, y, text, {
      fontFamily: 'Arial', fontSize: `${size}px`, color: '#f6df9f', align: 'center', lineSpacing: -8,
      stroke: '#3a1f0f', strokeThickness: 12,
    }).setOrigin(0.5).setAlpha(0.35);

    const title = this.add.text(x, y, text, {
      fontFamily: 'Arial', fontSize: `${size}px`, color: '#f1d27a', align: 'center', lineSpacing: -8,
      stroke: '#000000', strokeThickness: 7,
    }).setOrigin(0.5);

    this.tweens.add({ targets: [glow, title], alpha: { from: 0.75, to: 1 }, duration: 1600, yoyo: true, repeat: -1 });
  }

  createPanel(x, y, w, h, text) {
    this.add.rectangle(x, y, w, h, 0x1a142b).setStrokeStyle(2, 0x8d6e39);
    this.add.text(x, y, text, {
      fontFamily: 'Arial', fontSize: '24px', color: '#ffffff', stroke: '#000000', strokeThickness: 5,
    }).setOrigin(0.5);
  }

  createButton(x, y, w, h, label) {
    const glow = this.add.rectangle(x, y, w + 10, h + 10, 0xa78742, 0.18);
    const btn = this.add.rectangle(x, y, w, h, 0x3c225f).setStrokeStyle(3, 0xd0ad69).setInteractive({ useHandCursor: true });
    const text = this.add.text(x, y, label, {
      fontFamily: 'Arial', fontSize: '26px', color: '#ffffff', stroke: '#000000', strokeThickness: 5,
    }).setOrigin(0.5);
    this.tweens.add({ targets: glow, alpha: 0.45, duration: 1300, yoyo: true, repeat: -1 });

    text.setInteractive({ useHandCursor: true }).on('pointerdown', () => btn.emit('pointerdown'));
    return btn;
  }
}
