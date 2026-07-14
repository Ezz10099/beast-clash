(function () {
  "use strict";

  const search = window.location && typeof window.location.search === "string"
    ? window.location.search
    : "";
  const language = new URLSearchParams(search).get("lang") === "ar" ? "ar" : "en";
  const active = language === "ar";

  const TERMS = Object.freeze({
    Bolt: "صاعقة",
    Orbit: "مدار",
    Ember: "نار",
    Frost: "جليد",
    Split: "انقسام",
    Echo: "تكرار",
    BOLT: "صاعقة",
    ORBIT: "مدار",
    EMBER: "نار",
    FROST: "جليد",
    SPLIT: "انقسام",
    ECHO: "تكرار",
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
    "The starter and proven spells can begin a Trial.": "يمكن بدء الاختبار بالتعويذة الأساسية أو أي تعويذة مكتشفة.",
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
    "Choose the starter or a proven spell. Locked spells are found by rewriting.": "اختر التعويذة الأساسية أو تعويذة مكتشفة. اكتشف المقفلة بتغيير أجزاء التعويذة.",
    "Unproven Spell": "تعويذة غير مكتشفة",
    "SELECTED": "محددة",
    "READY": "جاهزة",
    "FIND IN A TRIAL": "اكتشفها في الاختبار",
    "Act I cleared · Choose one": "اكتمل الفصل الأول · اختر واحدًا",
    "Act II cleared · Choose one": "اكتمل الفصل الثاني · اختر واحدًا",
    "HOLD · Current Spell": "احتفظ · التعويذة الحالية",
    "same shape · still grows": "نفس الشكل · تستمر في القوة",
    "Keeps every spell word while the living spell gains its next level.": "يحافظ على كل أجزاء التعويذة ويمنحها المستوى التالي.",
    "HOLD": "احتفاظ",
    "NEW": "جديدة",
    "KNOWN": "مكتشفة",
    "Auto-Paused": "توقف تلقائي",
    "Trial Paused": "الاختبار متوقف",
    "Your Checkpoint Is Safe": "نقطة الحفظ آمنة",
    "Take a Breath": "خذ استراحة",
    "Action stopped when the game lost focus. This wave restarts from its boundary if the app closes.": "توقفت الحركة عندما خرجت من اللعبة. إذا أُغلقت، ستبدأ هذه الموجة من بدايتها.",
    "Enemies, projectiles, and the wave clock are frozen.": "توقّف الأعداء والمقذوفات ووقت الموجة.",
    "Restart Trial": "إعادة الاختبار",
    "Trial Options": "خيارات الاختبار",
    "Rewrite Waiting": "اختيار التغيير ينتظر",
    "This wave boundary is saved. Return to choose one change.": "تم حفظ نهاية الموجة. ارجع واختر تغييرًا واحدًا.",
    "Back to Rewrite": "العودة للاختيار",
    "Sound and haptic choices save automatically.": "تُحفَظ إعدادات الصوت والاهتزاز تلقائيًا.",
    "Play Again": "العب مجددًا",
    "The Trial is paused. Resume here, or press Back again to exit.": "الاختبار متوقف. تابعه من هنا أو اضغط رجوع مرة أخرى للخروج.",
    "Resume": "متابعة",
    "Pause": "إيقاف مؤقت",
    "TRIAL COMPLETE": "اكتمل الاختبار",
    "Tap to choose your next spell": "اضغط لاختيار تعويذة المحاولة التالية",
    "THE SPELL UNRAVELS": "انهارت التعويذة",
    "First Script": "البداية",
    "Crossfire": "نيران متقاطعة",
    "Broken Lines": "خطوط مكسورة",
    "First Guardian": "الحارس الأول",
    "Second Act": "الفصل الثاني",
    "Twin Pressure": "ضغط مزدوج",
    "Crowded Page": "ساحة مزدحمة",
    "Second Guardian": "الحارس الثاني",
    "Mote Stampede": "هجوم الكائنات",
    "Glyph Crossfire": "رماة متقاطعون",
    "Twin Wards": "حارسان",
    "The Redactor": "المحرّر الأحمر",
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
    "hunts the mark": "تلاحق الهدف",
    "guards nearby": "تحمي المنطقة القريبة",
    "burns + splashes": "تحرق وتؤذي القريبين",
    "slows": "تُبطئ",
    "casts 3 now": "تطلق 3 فورًا",
    "repeats later": "تتكرر لاحقًا",
    "same shape · spell grows": "نفس الشكل · التعويذة تقوى",
  });

  function translateSpellName(value) {
    const match = /^(Bolt|Orbit) · (Ember|Frost) · (Split|Echo)$/.exec(value);
    if (!match) return null;
    return TERMS[match[1]] + " · " + TERMS[match[2]] + " · " + TERMS[match[3]];
  }

  function translateThreatDetail(value) {
    const labels = Object.freeze({ Motes: "كائنات", Casters: "رماة", Guardians: "حراس", Boss: "زعيم" });
    const pieces = value.split(" · ");
    if (!pieces.every(function (piece) { return /^(Motes|Casters|Guardians|Boss) ×\d+$/.test(piece); })) return null;
    return pieces.map(function (piece) {
      const match = /^(Motes|Casters|Guardians|Boss) ×(\d+)$/.exec(piece);
      return labels[match[1]] + " ×" + match[2];
    }).join(" · ");
  }

  function translateCore(value) {
    if (!active || typeof value !== "string" || value.length === 0) return value;
    if (EXACT[value]) return EXACT[value];

    const spellName = translateSpellName(value);
    if (spellName) return spellName;

    const threatDetail = translateThreatDetail(value);
    if (threatDetail) return threatDetail;

    let match = /^FORM (Bolt|Orbit) · ESSENCE (Ember|Frost) · LAW (Split|Echo)(?: · LV (\d+))?$/.exec(value);
    if (match) {
      return "الشكل " + TERMS[match[1]] + " · العنصر " + TERMS[match[2]] + " · طريقة الإطلاق " + TERMS[match[3]] +
        (match[4] ? " · المستوى " + match[4] : "");
    }

    match = /^CURRENT · (.+) · LV (\d+) → (\d+)$/.exec(value);
    if (match) return "الحالي · " + translateCore(match[1]) + " · المستوى " + match[2] + " إلى " + match[3];

    match = /^(FORM|ESSENCE|LAW) · (Bolt|Orbit|Ember|Frost|Split|Echo)$/.exec(value);
    if (match) {
      const axis = match[1] === "FORM" ? "الشكل" : match[1] === "ESSENCE" ? "العنصر" : "طريقة الإطلاق";
      return axis + " · " + TERMS[match[2]];
    }

    match = /^(FORM|ESSENCE|LAW) → (Bolt|Orbit|Ember|Frost|Split|Echo)$/.exec(value);
    if (match) {
      const axis = match[1] === "FORM" ? "الشكل" : match[1] === "ESSENCE" ? "العنصر" : "طريقة الإطلاق";
      return axis + " · " + TERMS[match[2]];
    }

    match = /^SPELL HELD · LV (\d+)$/.exec(value);
    if (match) return "تم الاحتفاظ بالتعويذة · المستوى " + match[1];

    match = /^(.+) · LV (\d+)$/.exec(value);
    if (match && match[1] !== value) return translateCore(match[1]) + " · المستوى " + match[2];

    match = /^Spellbook (\d+)\/8 · Proven spells can start future Trials$/.exec(value);
    if (match) return "كتاب التعاويذ " + match[1] + "/8 · يمكن بدء اختبار جديد بالتعاويذ المكتشفة";

    match = /^Spellbook (\d+)\/8 proven$/.exec(value);
    if (match) return "كتاب التعاويذ: " + match[1] + "/8 مكتشفة";

    match = /^Tap to choose from (\d+) starting spells$/.exec(value);
    if (match) return "اضغط للاختيار من " + match[1] + " تعاويذ بداية";

    match = /^(.+) will begin the next Trial\.$/.exec(value);
    if (match) return "سيبدأ الاختبار التالي بتعويذة " + translateCore(match[1]) + ".";

    match = /^Resume Rewrite after Wave (\d+)$/.exec(value);
    if (match) return "متابعة الاختيار بعد الموجة " + match[1];

    match = /^Resume Wave (\d+)$/.exec(value);
    if (match) return "متابعة الموجة " + match[1];

    match = /^Checkpoint: (.+) · (.+)$/.exec(value);
    if (match) return "نقطة الحفظ: " + translateCore(match[1]) + " · " + match[2];

    match = /^12 waves · Rewrite or hold · Every choice grows the spell$/.exec(value);
    if (match) return "12 موجة · غيّر جزءًا أو احتفظ بها · كل اختيار يقوّي التعويذة";

    match = /^New Spell Proven · (\d+)\/8$/.exec(value);
    if (match) return "تعويذة جديدة مكتشفة · " + match[1] + "/8";

    match = /^Spell LV (\d+) → (\d+)$/.exec(value);
    if (match) return "مستوى التعويذة " + match[1] + " إلى " + match[2];

    match = /^NEXT · (BOSS|GUARDIAN|WAVE (\d+)) · (.+)$/.exec(value);
    if (match) {
      const stage = match[1] === "BOSS" ? "الزعيم" : match[1] === "GUARDIAN" ? "الحارس" : "الموجة " + match[2];
      return "التالي · " + stage + " · " + translateCore(match[3]);
    }

    match = /^ACT (I|II|III) · (BOSS|GUARDIAN|WAVE (\d+))$/.exec(value);
    if (match) {
      const act = match[1] === "I" ? "1" : match[1] === "II" ? "2" : "3";
      const stage = match[2] === "BOSS" ? "الزعيم" : match[2] === "GUARDIAN" ? "الحارس" : "الموجة " + match[3];
      return "الفصل " + act + " · " + stage;
    }

    match = /^HP (\d+)\/(\d+)$/.exec(value);
    if (match) return "الحياة " + match[1] + "/" + match[2];

    match = /^(\d+) Waves$/.exec(value);
    if (match) return match[1] + " موجة";

    match = /^Best (\d+)$/.exec(value);
    if (match) return "الأفضل " + match[1];

    match = /^Score (\d+)$/.exec(value);
    if (match) return "النقاط " + match[1];

    match = /^Complete (.+)$/.exec(value);
    if (match) return "اكتمل " + match[1];

    match = /^Wave (\d+)\/(\d+)$/.exec(value);
    if (match) return "الموجة " + match[1] + "/" + match[2];

    match = /^Wave (\d+) Clear$/.exec(value);
    if (match) return "اكتملت الموجة " + match[1];

    match = /^A(\d+) W(\d+) · (\d+) foes$/.exec(value);
    if (match) return "الفصل " + match[1] + " · الموجة " + match[2] + " · " + match[3] + " أعداء";

    match = /^A(\d+) W(\d+) · incoming$/.exec(value);
    if (match) return "الفصل " + match[1] + " · الموجة " + match[2] + " · قادمون";

    match = /^Time (.+) · Score (\d+)$/.exec(value);
    if (match) return "الوقت " + match[1] + " · النقاط " + match[2];

    match = /^Reached Wave (\d+) of (\d+)$/.exec(value);
    if (match) return "وصلت إلى الموجة " + match[1] + " من " + match[2];

    let translated = value;
    const phrases = [
      ["single-target", "هدف واحد"],
      ["crowd shield", "حماية من الحشود"],
      ["burn splash", "حرق جماعي"],
      ["repeat later", "تتكرر لاحقًا"],
      ["hunts the mark", "تلاحق الهدف"],
      ["guards nearby", "تحمي المنطقة القريبة"],
      ["burns + splashes", "تحرق وتؤذي القريبين"],
      ["casts 3 now", "تطلق 3 فورًا"],
      ["same shape", "نفس الشكل"],
      ["spell grows", "التعويذة تقوى"],
      ["still grows", "تستمر في القوة"],
      ["Starting spell:", "تعويذة البداية:"],
      ["Open options", "فتح الخيارات"],
      ["Pause game", "إيقاف اللعبة مؤقتًا"],
      ["Resume game", "متابعة اللعبة"],
      ["Starting spell", "تعويذة البداية"],
      ["Spellbook", "كتاب التعاويذ"],
      ["Trial", "الاختبار"],
      ["Wave", "الموجة"],
      ["FORM", "الشكل"],
      ["ESSENCE", "العنصر"],
      ["LAW", "طريقة الإطلاق"],
      ["LV", "المستوى"],
      ["slows", "تُبطئ"],
    ];
    for (const phrase of phrases) translated = translated.split(phrase[0]).join(phrase[1]);
    for (const term of Object.keys(TERMS)) {
      translated = translated.replace(new RegExp("\\b" + term + "\\b", "g"), TERMS[term]);
    }
    return translated;
  }

  function translateText(value) {
    if (!active || typeof value !== "string") return value;
    const leading = (value.match(/^\s*/) || [""])[0];
    const trailing = (value.match(/\s*$/) || [""])[0];
    const start = leading.length;
    const end = value.length - trailing.length;
    if (start >= end) return value;
    const core = value.slice(start, end);
    return leading + translateCore(core) + trailing;
  }

  window.PixelMageLocale = Object.freeze({
    active,
    language,
    translateText,
  });

  if (!active) return;

  function translateAttribute(element, name) {
    if (!element || typeof element.getAttribute !== "function" || typeof element.setAttribute !== "function") return;
    const current = element.getAttribute(name);
    if (!current) return;
    const translated = translateText(current);
    if (translated !== current) element.setAttribute(name, translated);
  }

  function translateNode(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      const current = node.nodeValue || "";
      const translated = translateText(current);
      if (translated !== current) node.nodeValue = translated;
      return;
    }
    if (node.nodeType !== 1 && node.nodeType !== 9) return;
    if (node.nodeType === 1) {
      translateAttribute(node, "aria-label");
      translateAttribute(node, "title");
    }
    const children = node.childNodes ? Array.from(node.childNodes) : [];
    for (const child of children) translateNode(child);
  }

  if (document.documentElement) {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }
  if (document.body) {
    document.body.classList.add("language-ar");
    document.body.dataset.language = "ar";
  }

  translateNode(document.documentElement || document.body);

  if (typeof MutationObserver === "function" && document.body) {
    const observer = new MutationObserver(function (mutations) {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") translateNode(mutation.target);
        else if (mutation.type === "attributes") translateAttribute(mutation.target, mutation.attributeName);
        else for (const node of mutation.addedNodes || []) translateNode(node);
      }
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["aria-label", "title"],
    });
  }

  const contextPrototype = window.CanvasRenderingContext2D && window.CanvasRenderingContext2D.prototype;
  if (contextPrototype && !contextPrototype.__pixelMageArabicText) {
    const originalFillText = contextPrototype.fillText;
    Object.defineProperty(contextPrototype, "__pixelMageArabicText", { value: true });
    contextPrototype.fillText = function (text) {
      const args = Array.from(arguments);
      args[0] = translateText(String(text));
      const previousDirection = this.direction;
      this.direction = "rtl";
      try {
        return originalFillText.apply(this, args);
      } finally {
        this.direction = previousDirection;
      }
    };
  }
})();
