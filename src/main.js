import { BootScene } from './scenes/BootScene.js';
import { BattleScene } from './scenes/BattleScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#121018',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 540,
  },
  scene: [BootScene, BattleScene],
};

new Phaser.Game(config);
