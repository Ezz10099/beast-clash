import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

import { createHeadlessGame } from './headless-game.mjs';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const css = await readFile(new URL('localization.css', root), 'utf8');
const localizationCode = await readFile(new URL('localization.js', root), 'utf8');

const localizationScriptIndex = html.indexOf('src="localization.js"');
const gameScriptIndex = html.indexOf('src="game.js"');
assert.ok(localizationScriptIndex >= 0, 'index.html must load localization.js');
assert.ok(gameScriptIndex > localizationScriptIndex, 'localization.js must load before game.js');
assert.match(html, /href="localization\.css"/, 'index.html must load Arabic RTL styles');
assert.match(css, /html\[lang="ar"\]/, 'Arabic styles must be query-activated through the document language');
assert.match(css, /direction:\s*rtl/, 'Arabic mode must use RTL presentation');
assert.doesNotMatch(localizationCode, /localStorage|SaveSystem|persistent\.|state\./, 'localization must not touch saves or gameplay state');

function makeElement(text = '') {
  const textNode = { nodeType: 3, nodeValue: text };
  return {
    nodeType: 1,
    childNodes: text ? [textNode] : [],
    attributes: {},
    classList: {
      values: [],
      add(value) { this.values.push(value); },
    },
    dataset: {},
    getAttribute(name) { return this.attributes[name] || null; },
    setAttribute(name, value) { this.attributes[name] = String(value); },
    textNode,
  };
}

function runLocalization(search) {
  const body = makeElement('Drag away from red runes. Your spell casts itself.');
  const documentElement = makeElement();
  documentElement.childNodes = [body];
  documentElement.lang = 'en';
  documentElement.dir = '';

  class FakeMutationObserver {
    constructor(callback) { this.callback = callback; }
    observe() {}
  }

  class FakeContext {
    constructor() {
      this.direction = 'inherit';
      this.calls = [];
    }

    fillText(text, x, y) {
      this.calls.push([text, x, y, this.direction]);
    }
  }

  const window = {
    location: { search },
    CanvasRenderingContext2D: FakeContext,
  };
  const sandbox = {
    console,
    document: { documentElement, body },
    MutationObserver: FakeMutationObserver,
    URLSearchParams,
    window,
  };

  vm.createContext(sandbox);
  vm.runInContext(localizationCode, sandbox, { filename: 'localization.js' });
  return { body, documentElement, FakeContext, window };
}

const english = runLocalization('?fresh=gate-a');
assert.equal(english.window.PixelMageLocale.active, false);
assert.equal(english.window.PixelMageLocale.language, 'en');
assert.equal(english.window.PixelMageLocale.translateText('Bolt · Ember · Split'), 'Bolt · Ember · Split');
assert.equal(english.body.textNode.nodeValue, 'Drag away from red runes. Your spell casts itself.');
assert.equal(english.documentElement.lang, 'en');

const arabic = runLocalization('?fresh=gate-ar&lang=ar');
const translate = arabic.window.PixelMageLocale.translateText;
assert.equal(arabic.window.PixelMageLocale.active, true);
assert.equal(arabic.window.PixelMageLocale.language, 'ar');
assert.equal(arabic.documentElement.lang, 'ar');
assert.equal(arabic.documentElement.dir, 'rtl');
assert.equal(arabic.body.dataset.language, 'ar');
assert.match(arabic.body.textNode.nodeValue, /الرموز الحمراء/);
assert.equal(translate('   '), '   ', 'whitespace-only DOM nodes must remain stable');
assert.equal(translate('Bolt · Ember · Split'), 'صاعقة · جمرة · انقسام');
assert.equal(
  translate('FORM Bolt · ESSENCE Frost · LAW Echo · LV 4'),
  'الشكل صاعقة · الجوهر صقيع · القانون صدى · المستوى 4',
);
assert.match(
  translate('BOLT hunts the mark · EMBER burns + splashes · SPLIT casts 3 now'),
  /صاعقة.*تلاحق الهدف المحدد.*جمرة.*تحرق الهدف.*انقسام.*تطلق ثلاث نسخ/,
);
assert.equal(translate('Motes ×6 · Casters ×2'), 'شظايا ×6 · سحرة رموز ×2');
assert.equal(translate('ACT III · BOSS'), 'الفصل 3 · الزعيم');
assert.equal(translate('NEXT · WAVE 2 · Crossfire'), 'التالي · الموجة 2 · نيران متقاطعة');
assert.equal(translate('HP 4/5'), 'الصحة 4/5');
assert.equal(translate('A2 W7 · 5 foes'), 'الفصل 2 · الموجة 7 · 5 أعداء');
assert.equal(translate('TRIAL COMPLETE'), 'اكتمل التحدّي');
assert.equal(translate('DODGE THE RING · BAIT THE CHARGE'), 'تجنّب الحلقة · استدرج الاندفاع');
assert.equal(translate('Rewrite Waiting'), 'إعادة الصياغة بانتظارك');
assert.equal(translate('ESSENCE CHANGES WHAT EVERY HIT DOES'), 'الجوهر يحدّد تأثير كل إصابة');
assert.equal(translate('LAW CHANGES HOW EACH CAST MULTIPLIES'), 'القانون يحدّد كيف تتضاعف كل إطلاقة');
assert.equal(translate('THE REDACTOR'), 'المُنقِّح');
assert.doesNotMatch(translate('FORM Bolt · ESSENCE Frost · LAW Echo'), /طريقة الإطلاق|العنصر|تكرار|جليد/);

const context = new arabic.FakeContext();
context.fillText('TRIAL COMPLETE', 10, 20);
assert.equal(context.calls[0][0], 'اكتمل التحدّي');
assert.equal(context.calls[0][3], 'rtl');
assert.equal(context.direction, 'inherit', 'canvas direction must be restored after translated drawing');

const combinedFreshCell = await createHeadlessGame({ search: '?fresh=gate-ar&lang=ar' });
assert.equal(combinedFreshCell.evaluate('FRESH_CELL_TOKEN'), 'gate-ar');
assert.equal(combinedFreshCell.evaluate('SAVE_KEY'), 'pixel_mage_fresh_cell_gate-ar_v3');
assert.equal(combinedFreshCell.evaluate('persistent.profile.bestScore'), 0);
assert.equal(combinedFreshCell.evaluate('persistent.profile.discovered.length'), 0);
combinedFreshCell.elements.get('#startRunButton').handlers.click();
assert.equal(
  JSON.parse(combinedFreshCell.storage.get('pixel_mage_fresh_cell_gate-ar_v3')).checkpoint.wave,
  1,
  'Arabic query parameter must not weaken fresh-save isolation',
);

process.stdout.write('Arabic localization checks passed.\n');
