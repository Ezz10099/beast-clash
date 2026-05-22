import { GameState } from '../state/GameState.js';

export class TeamPreviewScene extends Phaser.Scene {
  constructor() {
    super('TeamPreviewScene');
  }

  create() {
    const cx = 195;

    this.add.rectangle(cx, 422, 390, 844, 0x08060d);
    this.add.ellipse(cx, 170, 390, 280, 0x24153f, 0.32);
    this.add.rectangle(cx, 422, 350, 760, 0x131022).setStrokeStyle(2, 0x5e477f);

    this.add.text(cx, 66, 'Choose Your Beasts', {
      fontFamily: 'Arial', fontSize: '34px', color: '#f1d27a', stroke: '#000000', strokeThickness: 6,
    }).setOrigin(0.5);

    this.createResourceBar(cx);

    this.createPanel(195, 340, 330, 320, 'PLAYER TEAM', [
      ['🛡', 'Gorilla', 'Bruiser · Ground Slam'],
      ['⚔', 'Tiger', 'Assassin · Savage Pounce'],
      ['☠', 'Snake', 'Poison · Toxic Cloud'],
    ], 0x1d2f2a, 0x86d79f);

    this.createPanel(195, 610, 330, 195, 'ENEMY TEAM', [
      ['⛨', 'Rhino', 'Frontline Tank'],
      ['✦', 'Crocodile', 'Rend Brawler'],
      ['➤', 'Eagle', 'Aerial Striker'],
    ], 0x322226, 0xe29e9e);

    const startBtn = this.createButton(cx, 770, 280, 66, 'START FIGHT');
    startBtn.on('pointerdown', () => this.scene.start('BattleScene'));
  }

  createResourceBar(cx) {
    this.add.rectangle(cx, 121, 336, 58, 0x110d1a).setStrokeStyle(2, 0x8f6f3b);
    this.add.text(cx, 108, `Gold ${GameState.gold}   Meat ${GameState.meat}   XP ${GameState.beastXp}`, {
      fontFamily: 'Arial', fontSize: '16px', color: '#e5d7ff', stroke: '#000000', strokeThickness: 3,
    }).setOrigin(0.5);
    this.add.text(cx, 132, `Battles Won: ${GameState.battlesWon}`, {
      fontFamily: 'Arial', fontSize: '15px', color: '#ffffff', stroke: '#000000', strokeThickness: 3,
    }).setOrigin(0.5);
  }

  createPanel(x, y, w, h, title, rows, fill, accent) {
    this.add.rectangle(x, y, w, h, fill).setStrokeStyle(2, 0x7254a4);
    this.add.rectangle(x, y - (h / 2) + 25, w - 18, 34, 0x120f1c).setStrokeStyle(1, 0x9f7b42);
    this.add.text(x, y - (h / 2) + 25, title, {
      fontFamily: 'Arial', fontSize: '22px', color: '#f1d27a', stroke: '#000000', strokeThickness: 4,
    }).setOrigin(0.5);

    rows.forEach((row, i) => {
      const ry = y - (h / 2) + 70 + i * 70;
      this.add.rectangle(x, ry, w - 24, 58, 0x0d0a16, 0.56).setStrokeStyle(1, accent, 0.75);
      this.add.text(x - (w / 2) + 22, ry, row[0], { fontFamily: 'Arial', fontSize: '20px', color: '#f1d27a' }).setOrigin(0, 0.5);
      this.add.text(x - (w / 2) + 56, ry - 10, row[1], {
        fontFamily: 'Arial', fontSize: '20px', color: '#ffffff', stroke: '#000000', strokeThickness: 4,
      });
      this.add.text(x - (w / 2) + 56, ry + 14, row[2], { fontFamily: 'Arial', fontSize: '14px', color: '#b7add1' });
    });
  }

  createButton(x, y, w, h, label) {
    const glow = this.add.rectangle(x, y, w + 10, h + 10, 0xd5ad64, 0.2);
    const btn = this.add.rectangle(x, y, w, h, 0x2f5e29).setStrokeStyle(3, 0xc7f080).setInteractive({ useHandCursor: true });
    const txt = this.add.text(x, y, label, {
      fontFamily: 'Arial', fontSize: '28px', color: '#ffffff', stroke: '#000000', strokeThickness: 5,
    }).setOrigin(0.5);
    this.tweens.add({ targets: glow, alpha: 0.48, duration: 1100, yoyo: true, repeat: -1 });
    txt.setInteractive({ useHandCursor: true }).on('pointerdown', () => btn.emit('pointerdown'));
    return btn;
  }
}
