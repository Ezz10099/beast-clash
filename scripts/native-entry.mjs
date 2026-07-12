import { App } from '@capacitor/app';
import '../game.js';

App.addListener('appStateChange', ({ isActive }) => {
  if (!isActive) window.PixelMageNative?.pauseForInterruption();
});

App.addListener('backButton', async () => {
  const handled = window.PixelMageNative?.handleBackButton() ?? false;
  if (!handled) await App.exitApp();
});
