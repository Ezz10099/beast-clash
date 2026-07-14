import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

class FakeElement {
  constructor(id = '', tagName = 'div') {
    this.id = id;
    this.tagName = tagName.toUpperCase();
    this.nodeType = 1;
    this.type = '';
    this.value = '';
    this.checked = false;
    this.hidden = false;
    this.textContent = '';
    this.children = [];
    this.childNodes = this.children;
    this.dataset = {};
    this.attributes = {};
    this.handlers = {};
    this.style = {};
    this.className = '';
    this.href = '';
    this.download = '';
    this.dir = '';
  }

  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children.splice(0, this.children.length, ...children); }
  addEventListener(type, handler) { this.handlers[type] = handler; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  removeAttribute(name) { delete this.attributes[name]; }
  select() {}
  click() { if (this.handlers.click) return this.handlers.click(); }
  remove() {}

  querySelectorAll(selector) {
    const results = [];
    const visit = (item) => {
      for (const child of item.children || []) {
        if (selector === 'textarea' && child.tagName === 'TEXTAREA') results.push(child);
        visit(child);
      }
    };
    visit(this);
    return results;
  }
}

function makeElement(id, tagName = 'div', type = '') {
  const element = new FakeElement(id, tagName);
  element.type = type;
  return element;
}

export async function createHeadlessCellRunner(options = {}) {
  const code = options.code || await readFile(new URL('../cell-runner.js', import.meta.url), 'utf8');
  const storage = new Map(options.storageEntries || []);
  const elements = new Map();

  const selectIds = ['languagePath', 'familiarity', 'attemptResult', 'gateResult', 'ownerDecision'];
  const checkboxIds = [
    'participantFreshConfirmed', 'startedWithoutHelp', 'movedWithoutHelp', 'firstRuneReacted',
    'secondRuneReacted', 'rewriteWithoutHelp', 'noticedCombatChange', 'openedSpellbookVoluntarily',
    'startedAgainVoluntarily', 'gateControls', 'gateAxes', 'gateChange', 'gateEnjoyment', 'gateReplay', 'gateTechnical',
  ];
  const textIds = [
    'buildCommit', 'device', 'freshToken', 'gameBase', 'testUrl', 'waveReached', 'retryResult',
    'postResultAction', 'choicesByWave', 'spellChanges', 'firstConfusion', 'firstBoredom', 'bossReaction',
    'translationIssues', 'technicalIssues', 'predictionMatches', 'predictionMisses', 'resultRecord',
  ];
  const miscIds = [
    'statusMessage', 'openGameLink', 'neutralInstruction', 'retryInstruction', 'questionList', 'timerDisplay',
    'timerToggleButton', 'generateTokenButton', 'copyUrlButton', 'beginObservationButton', 'timerResetButton',
    'finishObservationButton', 'finishInterviewButton', 'generateRecordButton', 'copyRecordButton',
    'downloadRecordButton', 'resetRunnerButton',
  ];

  for (const id of selectIds) elements.set(id, makeElement(id, 'select'));
  for (const id of checkboxIds) elements.set(id, makeElement(id, 'input', 'checkbox'));
  for (const id of textIds) {
    const textarea = ['choicesByWave', 'spellChanges', 'firstConfusion', 'firstBoredom', 'bossReaction',
      'translationIssues', 'technicalIssues', 'predictionMatches', 'predictionMisses', 'resultRecord'].includes(id);
    elements.set(id, makeElement(id, textarea ? 'textarea' : 'input'));
  }
  for (const id of miscIds) elements.set(id, makeElement(id, id.includes('Button') ? 'button' : id === 'openGameLink' ? 'a' : 'div'));

  elements.get('languagePath').value = 'en';
  elements.get('gameBase').value = 'index.html';
  elements.get('ownerDecision').value = 'Pending';

  const stageSections = ['setup', 'observation', 'interview', 'gate', 'result'].map((stage) => {
    const section = makeElement(`${stage}Section`, 'section');
    section.dataset.stage = stage;
    section.hidden = stage !== 'setup';
    elements.set(section.id, section);
    return section;
  });
  const indicators = ['setup', 'observation', 'interview', 'gate', 'result'].map((stage) => {
    const indicator = makeElement('', 'span');
    indicator.dataset.stepIndicator = stage;
    return indicator;
  });

  const documentElement = makeElement('documentElement', 'html');
  const body = makeElement('body', 'body');
  const document = {
    documentElement,
    body,
    getElementById: (id) => elements.get(id) || null,
    createElement: (tagName) => makeElement('', tagName, tagName.toLowerCase() === 'input' ? 'text' : ''),
    querySelectorAll: (selector) => selector === '[data-stage]' ? stageSections : selector === '[data-step-indicator]' ? indicators : [],
    execCommand: () => true,
  };

  const window = {
    location: {
      href: options.href || 'https://example.test/tools/cell-runner.html',
      reload() {},
    },
    crypto: { getRandomValues(values) { values[0] = 0x12345678; values[1] = 0x9abcdef0; return values; } },
    isSecureContext: true,
    scrollTo() {},
    setInterval: () => 1,
    clearInterval() {},
    setTimeout(callback) { callback(); return 1; },
    confirm: () => true,
  };

  const navigator = { clipboard: { writeText: async () => {} } };
  const localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key),
  };

  const sandbox = {
    console,
    document,
    window,
    navigator,
    localStorage,
    URL,
    URLSearchParams,
    Blob,
    Uint32Array,
    Date,
    Math,
    JSON,
    Array,
    Map,
    Set,
    String,
    Number,
    Object,
    RegExp,
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'cell-runner.js' });

  return { document, elements, indicators, sandbox, stageSections, storage, window };
}
