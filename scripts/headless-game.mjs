import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

function makeElement(id = '') {
  return {
    id,
    width: 0,
    height: 0,
    hidden: false,
    disabled: false,
    className: '',
    textContent: '',
    children: [],
    handlers: {},
    attributes: {},
    dataset: {},
    style: {},
    classList: { toggle() {} },
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = [...children]; },
    addEventListener(type, handler) { this.handlers[type] = handler; },
    setAttribute(name, value) { this.attributes[name] = String(value); },
    querySelector() { return null; },
    querySelectorAll() { return []; },
  };
}

class FakeAudioParam {
  setValueAtTime() {}
  exponentialRampToValueAtTime() {}
}

class FakeAudioNode {
  constructor() {
    this.frequency = new FakeAudioParam();
    this.gain = new FakeAudioParam();
  }

  connect() {}
  start() {}
  stop() {}
}

class FakeAudioContext {
  constructor() {
    this.state = 'running';
    this.currentTime = 1;
    this.destination = {};
  }

  createOscillator() { return new FakeAudioNode(); }
  createGain() { return new FakeAudioNode(); }
  resume() { return Promise.resolve(); }
}

export async function createHeadlessGame(options = {}) {
  const gameCode = options.gameCode || await readFile(new URL('../game.js', import.meta.url), 'utf8');
  const enemyVarietyCode = options.enemyVarietyCode === false
    ? ''
    : options.enemyVarietyCode || await readFile(new URL('../enemy-variety.js', import.meta.url), 'utf8');
  const spellDepthCode = options.spellDepthCode === false
    ? ''
    : options.spellDepthCode || await readFile(new URL('../spell-depth.js', import.meta.url), 'utf8');
  const storage = new Map(options.storageEntries || []);
  const windowHandlers = new Map();
  const documentHandlers = new Map();
  const vibrations = [];

  const drawingContext = new Proxy({}, {
    get(target, property) {
      if (!(property in target)) target[property] = () => {};
      return target[property];
    },
    set(target, property, value) {
      target[property] = value;
      return true;
    },
  });

  const canvas = makeElement('game');
  canvas.width = options.width || 320;
  canvas.height = options.height || 480;
  canvas.getContext = () => drawingContext;
  canvas.getBoundingClientRect = () => ({
    left: 0,
    top: 0,
    width: canvas.width,
    height: canvas.height,
  });
  canvas.setPointerCapture = () => {};
  canvas.hasPointerCapture = () => false;
  canvas.releasePointerCapture = () => {};

  const enemyFx = makeElement('enemyFx');
  enemyFx.width = canvas.width;
  enemyFx.height = canvas.height;
  enemyFx.getContext = () => drawingContext;
  enemyFx.getBoundingClientRect = canvas.getBoundingClientRect;

  const spellFx = makeElement('spellFx');
  spellFx.width = canvas.width;
  spellFx.height = canvas.height;
  spellFx.getContext = () => drawingContext;
  spellFx.getBoundingClientRect = canvas.getBoundingClientRect;

  const gameCard = makeElement('gameCard');
  gameCard.dataset.screen = 'playing';

  const startPanel = makeElement('startPanel');
  const spellbookPanel = makeElement('spellbookPanel');
  spellbookPanel.hidden = true;
  const resumeRunButton = makeElement('resumeRunButton');
  resumeRunButton.hidden = true;
  const upgradePanel = makeElement('upgradePanel');
  upgradePanel.hidden = true;
  const menuPanel = makeElement('menuPanel');
  menuPanel.hidden = true;
  const elements = new Map([
    ['#game', canvas],
    ['#enemyFx', enemyFx],
    ['#spellFx', spellFx],
    ['.game-card', gameCard],
    ['#healthText', makeElement('healthText')],
    ['#waveText', makeElement('waveText')],
    ['#scoreText', makeElement('scoreText')],
    ['#spellText', makeElement('spellText')],
    ['#spellIdentityText', makeElement('spellIdentityText')],
    ['#spellComboText', makeElement('spellComboText')],
    ['#spellDepthMeter', makeElement('spellDepthMeter')],
    ['#spellDepthMeterFill', makeElement('spellDepthMeterFill')],
    ['#spellDepthMeterLabel', makeElement('spellDepthMeterLabel')],
    ['#menuButton', makeElement('menuButton')],
    ['#startPanel', startPanel],
    ['#startStatus', makeElement('startStatus')],
    ['#spellbookText', makeElement('spellbookText')],
    ['#spellbookButton', makeElement('spellbookButton')],
    ['#openingSpellIcon', makeElement('openingSpellIcon')],
    ['#openingSpellName', makeElement('openingSpellName')],
    ['#openingSpellRole', makeElement('openingSpellRole')],
    ['#openingSpellAction', makeElement('openingSpellAction')],
    ['#spellbookPanel', spellbookPanel],
    ['#spellbookStatus', makeElement('spellbookStatus')],
    ['#spellbookChoices', makeElement('spellbookChoices')],
    ['#spellbookBackButton', makeElement('spellbookBackButton')],
    ['#resumeRunButton', resumeRunButton],
    ['#startRunButton', makeElement('startRunButton')],
    ['#upgradePanel', upgradePanel],
    ['#upgradeEyebrow', makeElement('upgradeEyebrow')],
    ['#upgradeTitle', makeElement('upgradeTitle')],
    ['#upgradeHelp', makeElement('upgradeHelp')],
    ['#nextWavePreview', makeElement('nextWavePreview')],
    ['#nextWaveTitle', makeElement('nextWaveTitle')],
    ['#nextWaveDetail', makeElement('nextWaveDetail')],
    ['#nextWaveIcons', makeElement('nextWaveIcons')],
    ['#upgradeChoices', makeElement('upgradeChoices')],
    ['#menuPanel', menuPanel],
    ['#menuEyebrow', makeElement('menuEyebrow')],
    ['#menuTitle', makeElement('menuTitle')],
    ['#menuStatus', makeElement('menuStatus')],
    ['#resumeButton', makeElement('resumeButton')],
    ['#soundButton', makeElement('soundButton')],
    ['#hapticsButton', makeElement('hapticsButton')],
    ['#newRunButton', makeElement('newRunButton')],
    ['#controlHint', makeElement('controlHint')],
  ]);

  const sandbox = {
    console,
    document: {
      hidden: false,
      querySelector: (selector) => elements.get(selector) || null,
      querySelectorAll: () => [],
      createElement: () => makeElement(),
      addEventListener: (type, handler) => documentHandlers.set(type, handler),
    },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, String(value)),
    },
    navigator: { vibrate: (pattern) => vibrations.push(pattern) },
    requestAnimationFrame: () => 0,
    URLSearchParams,
    window: {
      AudioContext: FakeAudioContext,
      addEventListener: (type, handler) => windowHandlers.set(type, handler),
      location: { search: options.search || '' },
    },
  };

  vm.createContext(sandbox);
  vm.runInContext(gameCode, sandbox, { filename: 'game.js' });
  if (enemyVarietyCode) vm.runInContext(enemyVarietyCode, sandbox, { filename: 'enemy-variety.js' });
  if (spellDepthCode) vm.runInContext(spellDepthCode, sandbox, { filename: 'spell-depth.js' });

  return {
    canvas,
    documentHandlers,
    elements,
    enemyFx,
    spellFx,
    evaluate: (source) => vm.runInContext(source, sandbox),
    gameCard,
    menuPanel,
    resumeRunButton,
    sandbox,
    startPanel,
    storage,
    upgradePanel,
    vibrations,
    windowHandlers,
  };
}
