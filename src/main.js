import { BootScene } from './scenes/BootScene.js';
import { BattleScene } from './scenes/BattleScene.js';
import { TeamPreviewScene } from './scenes/TeamPreviewScene.js';
import { RewardsScene } from './scenes/RewardsScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0c0911',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 390,
    height: 844,
  },
  scene: [BootScene, TeamPreviewScene, BattleScene, RewardsScene],
};

new Phaser.Game(config);
