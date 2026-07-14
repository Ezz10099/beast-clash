(function () {
  "use strict";

  const search = window.location && typeof window.location.search === "string" ? window.location.search : "";
  const language = new URLSearchParams(search).get("lang") === "ar" ? "ar" : "en";
  const active = language === "ar";

  const PART = Object.freeze({
    Bolt: "صاعقة", Orbit: "مدار", Ember: "جمرة", Frost: "صقيع", Split: "انقسام", Echo: "صدى",
    BOLT: "صاعقة", ORBIT: "مدار", EMBER: "جمرة", FROST: "صقيع", SPLIT: "انقسام", ECHO: "صدى",
  });

  const EXACT = Object.freeze({
    "Living Spell Trial": "تحدّي التعويذة الحيّة",
    "Representative Trial": "تحدٍّ تجريبي",
    "Move. Watch. Rewrite.": "تحرّك. راقب. أعد صياغتها.",
    "Drag away from red runes. Your spell casts itself.": "ابتعد عن الرموز الحمراء. التعويذة تُطلَق تلقائيًا.",
    "Drag anywhere to steer above your thumb. Avoid red runes; spells cast automatically.": "اسحب في أي مكان؛ يتحرك الساحر فوق إصبعك. ابتعد عن الرموز الحمراء، والتعويذة تُطلَق تلقائيًا.",
    "hunts · burns · casts 3": "تلاحق الهدف · تحرق · تطلق ثلاث نسخ",
    "Starting spell · open Spellbook": "تعويذة البداية · افتح كتاب التعاويذ",
    "Rewrite or hold. Every choice grows the living spell.": "أعد صياغة جزء منها أو أبقها كما هي. كل اختيار يقوّي التعويذة.",
    "Resume Trial": "متابعة التحدّي",
    "Start New Trial": "بدء تحدٍّ جديد",
    "Living Spellbook": "كتاب التعاويذ الحيّة",
    "Choose your first spell": "اختر تعويذة البداية",
    "The starter and proven spells can begin a Trial.": "يمكنك بدء التحدّي بالتعويذة الأساسية أو بأي تعويذة اكتشفتها.",
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
    "Choose the starter or a proven spell. Locked spells are found by rewriting.": "اختر التعويذة الأساسية أو إحدى التعويذات المكتشفة. اكتشف التعويذات المقفلة بإعادة الصياغة.",
    "Unproven Spell": "تعويذة غير مكتشفة",
    "SELECTED": "مختارة", "READY": "متاحة", "FIND IN A TRIAL": "اكتشفها أثناء التحدّي",
    "Act I cleared · Choose one": "اكتمل الفصل الأول · اختر واحدًا",
    "Act II cleared · Choose one": "اكتمل الفصل الثاني · اختر واحدًا",
    "HOLD · Current Spell": "احتفظ · التعويذة الحالية",
    "same shape · still grows": "نفس التركيب · تزداد قوة",
    "Keeps every spell word while the living spell gains its next level.": "يُبقي أجزاء التعويذة كما هي ويرفع مستواها.",
    "HOLD": "احتفاظ", "NEW": "جديدة", "KNOWN": "مكتشفة",
    "Auto-Paused": "إيقاف تلقائي", "Trial Paused": "التحدّي متوقف مؤقتًا",
    "Your Checkpoint Is Safe": "نقطة الحفظ محفوظة", "Take a Breath": "خذ استراحة",
    "Action stopped when the game lost focus. This wave restarts from its boundary if the app closes.": "توقفت اللعبة عند مغادرتها. إذا أُغلقت، ستبدأ الموجة الحالية من بدايتها.",
    "Enemies, projectiles, and the wave clock are frozen.": "توقّف الأعداء والمقذوفات ومؤقت الموجة.",
    "Restart Trial": "إعادة التحدّي", "Trial Options": "خيارات التحدّي",
    "Rewrite Waiting": "إعادة الصياغة بانتظارك", "Back to Rewrite": "العودة إلى إعادة الصياغة",
    "This wave boundary is saved. Return to choose one change.": "تم حفظ تقدمك عند نهاية الموجة. ارجع واختر تغييرًا واحدًا.",
    "The Trial is paused. Resume here, or press Back again to exit.": "التحدّي متوقف مؤقتًا. تابع من هنا، أو اضغط زر الرجوع مرة أخرى للخروج.",
    "Sound and haptic choices save automatically.": "تُحفَظ إعدادات الصوت والاهتزاز تلقائيًا.",
    "Play Again": "العب مرة أخرى", "Resume": "متابعة", "Pause": "إيقاف مؤقت",
    "TRIAL COMPLETE": "اكتمل التحدّي", "Tap to choose your next spell": "اضغط لاختيار تعويذة البداية التالية",
    "THE SPELL UNRAVELS": "تفككت التعويذة",
    "RED RUNE = MOVE BEFORE IT CLOSES": "الرمز الأحمر = ابتعد قبل أن ينغلق",
    "BLUE AIM LINE = MOVE BEFORE THE SHOT": "خط التصويب الأزرق = تحرّك قبل الإطلاق",
    "THE MARK SHOWS BOLT'S CURRENT TARGET": "العلامة تحدد هدف الصاعقة الحالي",
    "GOLD RING AND LINE WARN OF A CHARGE": "الحلقة والخط الذهبيان يحذّران من هجمة اندفاع",
    "FORM CHANGES WHERE YOUR SPELL FIGHTS": "الشكل يحدّد أين تقاتل تعويذتك",
    "ESSENCE CHANGES WHAT EVERY HIT DOES": "الجوهر يحدّد تأثير كل إصابة",
    "LAW CHANGES HOW EACH CAST MULTIPLIES": "القانون يحدّد كيف تتضاعف كل إطلاقة",
    "BAIT THE CHARGE · STRIKE DURING RECOVERY": "استدرج الاندفاع · هاجم أثناء التعافي",
    "MOTES RUSH FROM EVERY EDGE": "الشظايا تندفع من كل الجهات",
    "CASTERS ENTER FROM BOTH SIDES": "سحرة الرموز يدخلون من الجانبين",
    "TWO CHARGERS · BREAK EACH TELEGRAPH": "مهاجمان مندفعان · راقب إشارة كل اندفاع",
    "DODGE THE RING · BAIT THE CHARGE": "تجنّب الحلقة · استدرج الاندفاع",
    "hunts the mark": "تلاحق الهدف المحدد", "guards nearby": "تحمي المنطقة المحيطة",
    "burns + splashes": "تحرق الهدف وتؤذي القريبين", "slows": "تبطّئ الأعداء",
    "casts 3 now": "تطلق ثلاث نسخ فورًا", "repeats later": "تكرر الإطلاق بعد لحظة",
    "same shape · spell grows": "نفس التعويذة · تزداد قوة",
    "Fires at the marked enemy; best against one threat.": "تطلق نحو العدو المحدد؛ أفضل ضد هدف واحد.",
    "Circles you; hits nearby crowds and blocks enemy shots.": "تدور حولك؛ تضرب الأعداء القريبين وتصد مقذوفاتهم.",
    "Burns what it hits and splashes damage nearby.": "تحرق ما تصيبه وتؤذي الأعداء القريبين.",
    "Slows every enemy the spell touches.": "تبطّئ كل عدو تلامسه التعويذة.",
    "Casts three smaller copies immediately.": "تطلق ثلاث نسخ أصغر فورًا.",
    "Repeats the spell a moment later.": "تكرر التعويذة بعد لحظة.",
  });

  const TITLES = Object.freeze({
    "FIRST SCRIPT": "المخطوطة الأولى", CROSSFIRE: "نيران متقاطعة", "BROKEN LINES": "سطور مكسورة",
    "FIRST GUARDIAN": "الحارس الأول", "SECOND ACT": "الفصل الثاني", "TWIN PRESSURE": "ضغط مزدوج",
    "CROWDED PAGE": "صفحة مزدحمة", "SECOND GUARDIAN": "الحارس الثاني", "MOTE STAMPEDE": "اندفاع الشظايا",
    "GLYPH CROSSFIRE": "نيران الرموز المتقاطعة", "TWIN WARDS": "الحارسان التوأمان", "THE REDACTOR": "المُنقِّح",
  });

  function core(value) {
    if (!active || !value) return value;
    if (EXACT[value]) return EXACT[value];
    const title = TITLES[value.toUpperCase()];
    if (title) return title;

    let m = /^(Bolt|Orbit) · (Ember|Frost) · (Split|Echo)$/.exec(value);
    if (m) return PART[m[1]] + " · " + PART[m[2]] + " · " + PART[m[3]];

    m = /^FORM (Bolt|Orbit) · ESSENCE (Ember|Frost) · LAW (Split|Echo)(?: · LV (\d+))?$/.exec(value);
    if (m) return "الشكل " + PART[m[1]] + " · الجوهر " + PART[m[2]] + " · القانون " + PART[m[3]] + (m[4] ? " · المستوى " + m[4] : "");

    m = /^CURRENT · (.+) · LV (\d+) → (\d+)$/.exec(value);
    if (m) return "التعويذة الحالية · " + core(m[1]) + " · المستوى " + m[2] + " إلى " + m[3];

    m = /^(FORM|ESSENCE|LAW) [·→] (Bolt|Orbit|Ember|Frost|Split|Echo)$/.exec(value);
    if (m) return (m[1] === "FORM" ? "الشكل" : m[1] === "ESSENCE" ? "الجوهر" : "القانون") + " · " + PART[m[2]];

    m = /^SPELL HELD · LV (\d+)$/.exec(value);
    if (m) return "تم الاحتفاظ بالتعويذة · المستوى " + m[1];

    m = /^(.+) · LV (\d+)$/.exec(value);
    if (m) return core(m[1]) + " · المستوى " + m[2];

    m = /^Spellbook (\d+)\/8 · Proven spells can start future Trials$/.exec(value);
    if (m) return "كتاب التعاويذ " + m[1] + "/8 · استخدم المكتشفة في المحاولة التالية";

    m = /^Spellbook (\d+)\/8 proven$/.exec(value);
    if (m) return "كتاب التعاويذ: " + m[1] + "/8 مكتشفة";

    m = /^Tap to choose from (\d+) starting spells$/.exec(value);
    if (m) return "اضغط للاختيار من " + m[1] + " تعويذات متاحة";

    m = /^(.+) will begin the next Trial\.$/.exec(value);
    if (m) return "ستبدأ المحاولة التالية بتعويذة " + core(m[1]) + ".";

    m = /^Resume Rewrite after Wave (\d+)$/.exec(value);
    if (m) return "متابعة إعادة الصياغة بعد الموجة " + m[1];
    m = /^Resume Wave (\d+)$/.exec(value);
    if (m) return "متابعة الموجة " + m[1];
    m = /^Checkpoint: (.+) · (.+)$/.exec(value);
    if (m) return "نقطة الحفظ: " + core(m[1]) + " · " + m[2];
    m = /^12 waves · Rewrite or hold · Every choice grows the spell$/.exec(value);
    if (m) return "12 موجة · أعد الصياغة أو احتفظ · كل اختيار يقوّي التعويذة";
    m = /^New Spell Proven · (\d+)\/8$/.exec(value);
    if (m) return "اكتُشفت تعويذة جديدة · " + m[1] + "/8";
    m = /^Spell LV (\d+) → (\d+)$/.exec(value);
    if (m) return "ارتفع مستوى التعويذة من " + m[1] + " إلى " + m[2];

    m = /^NEXT · (BOSS|GUARDIAN|WAVE (\d+)) · (.+)$/.exec(value);
    if (m) return "التالي · " + (m[1] === "BOSS" ? "الزعيم" : m[1] === "GUARDIAN" ? "الحارس" : "الموجة " + m[2]) + " · " + core(m[3]);
    m = /^ACT (I|II|III) · (BOSS|GUARDIAN|WAVE (\d+))$/.exec(value);
    if (m) return "الفصل " + (m[1] === "I" ? 1 : m[1] === "II" ? 2 : 3) + " · " + (m[2] === "BOSS" ? "الزعيم" : m[2] === "GUARDIAN" ? "الحارس" : "الموجة " + m[3]);

    m = /^(Motes|Casters|Guardians|Boss) ×(\d+)(?: · (.*))?$/.exec(value);
    if (m) {
      const name = m[1] === "Motes" ? "شظايا" : m[1] === "Casters" ? "سحرة رموز" : m[1] === "Guardians" ? "حراس" : "زعيم";
      return name + " ×" + m[2] + (m[3] ? " · " + core(m[3]) : "");
    }

    m = /^HP (\d+)\/(\d+)$/.exec(value);
    if (m) return "الصحة " + m[1] + "/" + m[2];
    m = /^(\d+) Waves$/.exec(value);
    if (m) return m[1] + " موجة";
    m = /^Best (\d+)$/.exec(value);
    if (m) return "أفضل نتيجة " + m[1];
    m = /^Score (\d+)$/.exec(value);
    if (m) return "النقاط " + m[1];
    m = /^Complete (.+)$/.exec(value);
    if (m) return "المدة " + m[1];
    m = /^Wave (\d+)\/(\d+)$/.exec(value);
    if (m) return "الموجة " + m[1] + "/" + m[2];
    m = /^Wave (\d+) Clear$/.exec(value);
    if (m) return "اكتملت الموجة " + m[1];
    m = /^A(\d+) W(\d+) · (\d+) foes$/.exec(value);
    if (m) return "الفصل " + m[1] + " · الموجة " + m[2] + " · " + m[3] + " أعداء";
    m = /^A(\d+) W(\d+) · incoming$/.exec(value);
    if (m) return "الفصل " + m[1] + " · الموجة " + m[2] + " · الأعداء قادمون";
    m = /^Time (.+) · Score (\d+)$/.exec(value);
    if (m) return "الوقت " + m[1] + " · النقاط " + m[2];
    m = /^Reached Wave (\d+) of (\d+)$/.exec(value);
    if (m) return "وصلت إلى الموجة " + m[1] + " من " + m[2];

    const replace = [
      ["hunts the mark", "تلاحق الهدف المحدد"], ["guards nearby", "تحمي المنطقة المحيطة"],
      ["burns + splashes", "تحرق الهدف وتؤذي القريبين"], ["casts 3 now", "تطلق ثلاث نسخ فورًا"],
      ["repeats later", "تكرر الإطلاق بعد لحظة"], ["slows", "تبطّئ الأعداء"],
      ["FORM", "الشكل"], ["ESSENCE", "الجوهر"], ["LAW", "القانون"], ["LV", "المستوى"],
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
