(function () {
  "use strict";

  const search = window.location && typeof window.location.search === "string" ? window.location.search : "";
  const language = new URLSearchParams(search).get("lang") === "ar" ? "ar" : "en";
  const active = language === "ar";

  const PART = Object.freeze({
    Bolt: "صاعقة", Orbit: "مدار", Ember: "نار", Frost: "جليد", Split: "انقسام", Echo: "تكرار",
    BOLT: "صاعقة", ORBIT: "مدار", EMBER: "نار", FROST: "جليد", SPLIT: "انقسام", ECHO: "تكرار",
  });

  const EXACT = Object.freeze({
    "Living Spell Trial": "اختبار التعويذة الحية",
    "Representative Trial": "اختبار تجريبي",
    "Move. Watch. Rewrite.": "تحرّك. راقب. غيّر التعويذة.",
    "Drag away from red runes. Your spell casts itself.": "اسحب بعيدًا عن العلامات الحمراء. التعويذة تُطلَق تلقائيًا.",
    "hunts · burns · casts 3": "تلاحق الهدف · تحرق · تطلق 3",
    "Starting spell · open Spellbook": "تعويذة البداية · افتح كتاب التعاويذ",
    "Rewrite or hold. Every choice grows the living spell.": "غيّر جزءًا أو احتفظ بها. كل اختيار يقوّي التعويذة.",
    "Resume Trial": "متابعة الاختبار",
    "Start New Trial": "بدء اختبار جديد",
    "Living Spellbook": "كتاب التعاويذ الحية",
    "Choose your first spell": "اختر تعويذة البداية",
    "The starter and proven spells can begin a Trial.": "ابدأ بالتعويذة الأساسية أو أي تعويذة مكتشفة.",
    "Back": "رجوع",
    "Wave Cleared": "اكتملت الموجة",
    "Choose one": "اختر واحدًا",
    "Options": "الخيارات",
    "Game Settings": "إعدادات اللعبة",
    "Settings save automatically.": "تُحفَظ الإعدادات تلقائيًا.",
    "Sound: On": "الصوت: تشغيل",
    "Sound: Off": "الصوت: إيقاف",
    "Haptics: On": "الاهتزاز: تشغيل",
    "Haptics: Off": "الاهتزاز: إيقاف",
    "Close": "إغلاق",
    "Start New Run": "بدء محاولة جديدة",
    "Drag in the arena to move · Spells cast automatically": "اسحب داخل الساحة للتحرك · التعويذة تُطلَق تلقائيًا",
    "Prove rewrites to unlock starting spells": "اكتشف تعاويذ جديدة لتستخدمها في البداية",
    "Choose the starter or a proven spell. Locked spells are found by rewriting.": "اختر التعويذة الأساسية أو المكتشفة. اكتشف المقفلة بتغيير أجزاء التعويذة.",
    "Unproven Spell": "تعويذة غير مكتشفة",
    "SELECTED": "محددة", "READY": "جاهزة", "FIND IN A TRIAL": "اكتشفها في الاختبار",
    "Act I cleared · Choose one": "اكتمل الفصل الأول · اختر واحدًا",
    "Act II cleared · Choose one": "اكتمل الفصل الثاني · اختر واحدًا",
    "HOLD · Current Spell": "احتفظ · التعويذة الحالية",
    "same shape · still grows": "نفس الشكل · تستمر في القوة",
    "Keeps every spell word while the living spell gains its next level.": "يحافظ على أجزاء التعويذة ويمنحها المستوى التالي.",
    "HOLD": "احتفاظ", "NEW": "جديدة", "KNOWN": "مكتشفة",
    "Auto-Paused": "توقف تلقائي", "Trial Paused": "الاختبار متوقف",
    "Your Checkpoint Is Safe": "نقطة الحفظ آمنة", "Take a Breath": "خذ استراحة",
    "Action stopped when the game lost focus. This wave restarts from its boundary if the app closes.": "توقفت الحركة عندما خرجت من اللعبة. إذا أُغلقت، ستبدأ هذه الموجة من بدايتها.",
    "Enemies, projectiles, and the wave clock are frozen.": "توقّف الأعداء والمقذوفات ووقت الموجة.",
    "Restart Trial": "إعادة الاختبار", "Trial Options": "خيارات الاختبار",
    "Rewrite Waiting": "اختيار التغيير ينتظر", "Back to Rewrite": "العودة للاختيار",
    "This wave boundary is saved. Return to choose one change.": "تم حفظ نهاية الموجة. ارجع واختر تغييرًا واحدًا.",
    "The Trial is paused. Resume here, or press Back again to exit.": "الاختبار متوقف. تابعه من هنا أو اضغط رجوع مرة أخرى للخروج.",
    "Sound and haptic choices save automatically.": "تُحفَظ إعدادات الصوت والاهتزاز تلقائيًا.",
    "Play Again": "العب مجددًا", "Resume": "متابعة", "Pause": "إيقاف مؤقت",
    "TRIAL COMPLETE": "اكتمل الاختبار", "Tap to choose your next spell": "اضغط لاختيار تعويذة المحاولة التالية",
    "THE SPELL UNRAVELS": "انهارت التعويذة",
    "RED RUNE = MOVE BEFORE IT CLOSES": "علامة حمراء = ابتعد قبل أن تنغلق",
    "BLUE AIM LINE = MOVE BEFORE THE SHOT": "خط أزرق = تحرّك قبل انطلاق المقذوف",
    "THE MARK SHOWS BOLT'S CURRENT TARGET": "العلامة تُظهر هدف الصاعقة الحالي",
    "GOLD RING AND LINE WARN OF A CHARGE": "الدائرة والخط الذهبيان يحذّران من اندفاع",
    "FORM CHANGES WHERE YOUR SPELL FIGHTS": "الشكل يغيّر مكان قتال التعويذة",
    "ESSENCE CHANGES WHAT EVERY HIT DOES": "العنصر يغيّر تأثير كل إصابة",
    "LAW CHANGES HOW EACH CAST MULTIPLIES": "طريقة الإطلاق تغيّر كيفية تكرار التعويذة",
    "BAIT THE CHARGE · STRIKE DURING RECOVERY": "استدرج الاندفاع · هاجم أثناء التعافي",
    "MOTES RUSH FROM EVERY EDGE": "الكائنات تندفع من كل الأطراف",
    "CASTERS ENTER FROM BOTH SIDES": "الرماة يدخلون من الجانبين",
    "TWO CHARGERS · BREAK EACH TELEGRAPH": "حارسان مندفعان · راقب تحذير كل واحد",
    "DODGE THE RING · BAIT THE CHARGE": "تجنب الحلقة · استدرج الاندفاع",
    "hunts the mark": "تلاحق الهدف", "guards nearby": "تحمي المنطقة القريبة",
    "burns + splashes": "تحرق وتؤذي القريبين", "slows": "تُبطئ",
    "casts 3 now": "تطلق 3 فورًا", "repeats later": "تتكرر لاحقًا",
    "same shape · spell grows": "نفس الشكل · التعويذة تقوى",
  });

  const TITLES = Object.freeze({
    "FIRST SCRIPT": "البداية", CROSSFIRE: "نيران متقاطعة", "BROKEN LINES": "خطوط مكسورة",
    "FIRST GUARDIAN": "الحارس الأول", "SECOND ACT": "الفصل الثاني", "TWIN PRESSURE": "ضغط مزدوج",
    "CROWDED PAGE": "ساحة مزدحمة", "SECOND GUARDIAN": "الحارس الثاني", "MOTE STAMPEDE": "هجوم الكائنات",
    "GLYPH CROSSFIRE": "رماة متقاطعون", "TWIN WARDS": "حارسان", "THE REDACTOR": "المحرّر الأحمر",
  });

  function core(value) {
    if (!active || !value) return value;
    if (EXACT[value]) return EXACT[value];
    const title = TITLES[value.toUpperCase()];
    if (title) return title;

    let m = /^(Bolt|Orbit) · (Ember|Frost) · (Split|Echo)$/.exec(value);
    if (m) return PART[m[1]] + " · " + PART[m[2]] + " · " + PART[m[3]];

    m = /^FORM (Bolt|Orbit) · ESSENCE (Ember|Frost) · LAW (Split|Echo)(?: · LV (\d+))?$/.exec(value);
    if (m) return "الشكل " + PART[m[1]] + " · العنصر " + PART[m[2]] + " · طريقة الإطلاق " + PART[m[3]] + (m[4] ? " · المستوى " + m[4] : "");

    m = /^CURRENT · (.+) · LV (\d+) → (\d+)$/.exec(value);
    if (m) return "الحالي · " + core(m[1]) + " · المستوى " + m[2] + " إلى " + m[3];

    m = /^(FORM|ESSENCE|LAW) [·→] (Bolt|Orbit|Ember|Frost|Split|Echo)$/.exec(value);
    if (m) return (m[1] === "FORM" ? "الشكل" : m[1] === "ESSENCE" ? "العنصر" : "طريقة الإطلاق") + " · " + PART[m[2]];

    m = /^SPELL HELD · LV (\d+)$/.exec(value);
    if (m) return "تم الاحتفاظ بالتعويذة · المستوى " + m[1];

    m = /^(.+) · LV (\d+)$/.exec(value);
    if (m) return core(m[1]) + " · المستوى " + m[2];

    m = /^Spellbook (\d+)\/8 · Proven spells can start future Trials$/.exec(value);
    if (m) return "كتاب التعاويذ " + m[1] + "/8 · ابدأ لاحقًا بالتعاويذ المكتشفة";

    m = /^Spellbook (\d+)\/8 proven$/.exec(value);
    if (m) return "كتاب التعاويذ: " + m[1] + "/8 مكتشفة";

    m = /^Tap to choose from (\d+) starting spells$/.exec(value);
    if (m) return "اضغط للاختيار من " + m[1] + " تعاويذ بداية";

    m = /^(.+) will begin the next Trial\.$/.exec(value);
    if (m) return "سيبدأ الاختبار التالي بتعويذة " + core(m[1]) + ".";

    m = /^Resume Rewrite after Wave (\d+)$/.exec(value);
    if (m) return "متابعة الاختيار بعد الموجة " + m[1];
    m = /^Resume Wave (\d+)$/.exec(value);
    if (m) return "متابعة الموجة " + m[1];
    m = /^Checkpoint: (.+) · (.+)$/.exec(value);
    if (m) return "نقطة الحفظ: " + core(m[1]) + " · " + m[2];
    m = /^12 waves · Rewrite or hold · Every choice grows the spell$/.exec(value);
    if (m) return "12 موجة · غيّر جزءًا أو احتفظ بها · كل اختيار يقوّي التعويذة";
    m = /^New Spell Proven · (\d+)\/8$/.exec(value);
    if (m) return "تعويذة جديدة مكتشفة · " + m[1] + "/8";
    m = /^Spell LV (\d+) → (\d+)$/.exec(value);
    if (m) return "مستوى التعويذة " + m[1] + " إلى " + m[2];

    m = /^NEXT · (BOSS|GUARDIAN|WAVE (\d+)) · (.+)$/.exec(value);
    if (m) return "التالي · " + (m[1] === "BOSS" ? "الزعيم" : m[1] === "GUARDIAN" ? "الحارس" : "الموجة " + m[2]) + " · " + core(m[3]);
    m = /^ACT (I|II|III) · (BOSS|GUARDIAN|WAVE (\d+))$/.exec(value);
    if (m) return "الفصل " + (m[1] === "I" ? 1 : m[1] === "II" ? 2 : 3) + " · " + (m[2] === "BOSS" ? "الزعيم" : m[2] === "GUARDIAN" ? "الحارس" : "الموجة " + m[3]);

    m = /^(Motes|Casters|Guardians|Boss) ×(\d+)(?: · (.*))?$/.exec(value);
    if (m) {
      const name = m[1] === "Motes" ? "كائنات" : m[1] === "Casters" ? "رماة" : m[1] === "Guardians" ? "حراس" : "زعيم";
      return name + " ×" + m[2] + (m[3] ? " · " + core(m[3]) : "");
    }

    m = /^HP (\d+)\/(\d+)$/.exec(value);
    if (m) return "الحياة " + m[1] + "/" + m[2];
    m = /^(\d+) Waves$/.exec(value);
    if (m) return m[1] + " موجة";
    m = /^Best (\d+)$/.exec(value);
    if (m) return "الأفضل " + m[1];
    m = /^Score (\d+)$/.exec(value);
    if (m) return "النقاط " + m[1];
    m = /^Complete (.+)$/.exec(value);
    if (m) return "اكتمل " + m[1];
    m = /^Wave (\d+)\/(\d+)$/.exec(value);
    if (m) return "الموجة " + m[1] + "/" + m[2];
    m = /^Wave (\d+) Clear$/.exec(value);
    if (m) return "اكتملت الموجة " + m[1];
    m = /^A(\d+) W(\d+) · (\d+) foes$/.exec(value);
    if (m) return "الفصل " + m[1] + " · الموجة " + m[2] + " · " + m[3] + " أعداء";
    m = /^A(\d+) W(\d+) · incoming$/.exec(value);
    if (m) return "الفصل " + m[1] + " · الموجة " + m[2] + " · قادمون";
    m = /^Time (.+) · Score (\d+)$/.exec(value);
    if (m) return "الوقت " + m[1] + " · النقاط " + m[2];
    m = /^Reached Wave (\d+) of (\d+)$/.exec(value);
    if (m) return "وصلت إلى الموجة " + m[1] + " من " + m[2];

    const replace = [
      ["hunts the mark", "تلاحق الهدف"], ["guards nearby", "تحمي المنطقة القريبة"],
      ["burns + splashes", "تحرق وتؤذي القريبين"], ["casts 3 now", "تطلق 3 فورًا"],
      ["repeats later", "تتكرر لاحقًا"], ["slows", "تُبطئ"],
      ["FORM", "الشكل"], ["ESSENCE", "العنصر"], ["LAW", "طريقة الإطلاق"], ["LV", "المستوى"],
    ];
    let result = value;
    for (const pair of replace) result = result.split(pair[0]).join(pair[1]);
    for (const key of Object.keys(PART)) result = result.replace(new RegExp("\\b" + key + "\\b", "g"), PART[key]);
    return result;
  }

  function translateText(value) {
    if (!active || typeof value !== "string") return value;
    const lead = (value.match(/^\s*/) || [""])[0];
    const trail = (value.match(/\s*$/) || [""])[0];
    const end = value.length - trail.length;
    if (lead.length >= end) return value;
    return lead + core(value.slice(lead.length, end)) + trail;
  }

  window.PixelMageLocale = Object.freeze({ active, language, translateText });
  if (!active) return;

  function attribute(element, name) {
    if (!element || typeof element.getAttribute !== "function") return;
    const value = element.getAttribute(name);
    if (value) {
      const translated = translateText(value);
      if (translated !== value) element.setAttribute(name, translated);
    }
  }

  function node(item) {
    if (!item) return;
    if (item.nodeType === 3) {
      const value = item.nodeValue || "";
      const translated = translateText(value);
      if (translated !== value) item.nodeValue = translated;
      return;
    }
    if (item.nodeType !== 1 && item.nodeType !== 9) return;
    if (item.nodeType === 1) {
      attribute(item, "aria-label");
      attribute(item, "title");
    }
    for (const child of item.childNodes ? Array.from(item.childNodes) : []) node(child);
  }

  if (document.documentElement) {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }
  if (document.body) {
    document.body.classList.add("language-ar");
    document.body.dataset.language = "ar";
  }
  node(document.documentElement || document.body);

  if (typeof MutationObserver === "function" && document.body) {
    new MutationObserver(function (mutations) {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") node(mutation.target);
        else if (mutation.type === "attributes") attribute(mutation.target, mutation.attributeName);
        else for (const added of mutation.addedNodes || []) node(added);
      }
    }).observe(document.body, {
      subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["aria-label", "title"],
    });
  }

  const prototype = window.CanvasRenderingContext2D && window.CanvasRenderingContext2D.prototype;
  if (prototype && !prototype.__pixelMageArabicText) {
    const fillText = prototype.fillText;
    Object.defineProperty(prototype, "__pixelMageArabicText", { value: true });
    prototype.fillText = function (text) {
      const args = Array.from(arguments);
      args[0] = translateText(String(text));
      const direction = this.direction;
      this.direction = "rtl";
      try { return fillText.apply(this, args); }
      finally { this.direction = direction; }
    };
  }
})();
