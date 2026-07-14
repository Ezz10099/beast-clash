(function () {
  "use strict";

  const DRAFT_KEY = "pixel_mage_cell_runner_draft_v1";
  const USED_KEY = "pixel_mage_cell_runner_used_tokens_v1";
  const TOKEN_PATTERN = /^[a-z0-9_-]{1,32}$/i;
  const STAGES = ["setup", "observation", "interview", "gate", "result"];

  const PROTOCOL = Object.freeze({
    en: Object.freeze({
      label: "English",
      neutral: "Please play this as if you found it yourself. I will not explain it, but you can stop whenever you want.",
      retry: "You may try once more if you want.",
      questions: Object.freeze([
        "What did you think you were supposed to do?",
        "What do Form, Essence, and Law each change? ‘I don't know’ is fine.",
        "Describe one choice you made, what you expected, and what changed afterward.",
        "Which moment was most enjoyable? Which moment was least enjoyable or boring?",
        "Was anything unclear, hard to notice, or unfair?",
        "Would you choose to start another run now, without a reward for helping us? Why or why not?",
        "What would you expect or hope to discover next?",
        "What would a finished version need before it felt worth downloading and keeping?",
      ]),
    }),
    ar: Object.freeze({
      label: "Arabic",
      neutral: "العب هذه اللعبة كأنك وجدتها بنفسك. لن أشرحها لك، ويمكنك التوقف متى أردت.",
      retry: "يمكنك المحاولة مرة أخرى إن أردت.",
      questions: Object.freeze([
        "ماذا فهمت أن عليك أن تفعل؟",
        "ماذا يغيّر كل واحد من: الشكل، والعنصر، وطريقة الإطلاق؟ لا مشكلة إن كانت الإجابة: لا أعرف.",
        "صف اختيارًا واحدًا قمت به: ماذا توقعت أن يحدث، وماذا تغيّر بعده؟",
        "ما اللحظة الأكثر متعة؟ وما اللحظة الأقل متعة أو الأكثر مللًا؟",
        "هل كان هناك شيء غير واضح، أو صعب الملاحظة، أو غير عادل؟",
        "هل ستختار بدء محاولة أخرى الآن من دون مكافأة مقابل مساعدتنا؟ لماذا أو لماذا لا؟",
        "ماذا تتوقع أو تأمل أن تكتشف بعد ذلك؟",
        "ماذا تحتاج النسخة المكتملة حتى تشعر أنها تستحق التنزيل والاحتفاظ بها؟",
      ]),
    }),
  });

  const ids = [
    "languagePath", "familiarity", "buildCommit", "device", "freshToken", "gameBase", "testUrl",
    "participantFreshConfirmed", "startedWithoutHelp", "movedWithoutHelp", "firstRuneReacted",
    "secondRuneReacted", "rewriteWithoutHelp", "noticedCombatChange", "openedSpellbookVoluntarily",
    "startedAgainVoluntarily", "attemptResult", "waveReached", "retryResult", "postResultAction",
    "choicesByWave", "spellChanges", "firstConfusion", "firstBoredom", "bossReaction", "translationIssues",
    "technicalIssues", "gateControls", "gateAxes", "gateChange", "gateEnjoyment", "gateReplay",
    "gateTechnical", "predictionMatches", "predictionMisses", "gateResult", "ownerDecision", "resultRecord",
  ];

  const byId = function (id) { return document.getElementById(id); };
  const fields = new Map(ids.map(function (id) { return [id, byId(id)]; }));
  const statusMessage = byId("statusMessage");
  const openGameLink = byId("openGameLink");
  const neutralInstruction = byId("neutralInstruction");
  const retryInstruction = byId("retryInstruction");
  const questionList = byId("questionList");
  const timerDisplay = byId("timerDisplay");
  const timerToggleButton = byId("timerToggleButton");

  let currentStage = "setup";
  let timerSeconds = 0;
  let timerRunning = false;
  let timerHandle = null;

  function setStatus(message, error) {
    statusMessage.textContent = message || "";
    statusMessage.dataset.error = error ? "true" : "false";
  }

  function cleanToken(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 32);
  }

  function randomToken() {
    const now = new Date();
    const date = String(now.getFullYear()) + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0");
    let random = "";
    if (window.crypto && typeof window.crypto.getRandomValues === "function") {
      const values = new Uint32Array(2);
      window.crypto.getRandomValues(values);
      random = values[0].toString(36).slice(-4) + values[1].toString(36).slice(-4);
    } else {
      random = Math.floor(Math.random() * 0xffffffff).toString(36).padStart(7, "0");
    }
    return cleanToken("cell-" + date + "-" + random).slice(0, 32);
  }

  function usedTokens() {
    try {
      const parsed = JSON.parse(localStorage.getItem(USED_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.filter(function (token) { return TOKEN_PATTERN.test(token); }) : [];
    } catch {
      return [];
    }
  }

  function markTokenUsed(token) {
    const next = Array.from(new Set(usedTokens().concat(token))).slice(-100);
    try { localStorage.setItem(USED_KEY, JSON.stringify(next)); } catch {}
  }

  function buildTestUrl() {
    const token = cleanToken(fields.get("freshToken").value);
    fields.get("freshToken").value = token;
    const base = fields.get("gameBase").value.trim() || "index.html";
    let url;
    try {
      url = new URL(base, window.location.href);
      url.searchParams.set("fresh", token || "new-token-required");
      if (fields.get("languagePath").value === "ar") url.searchParams.set("lang", "ar");
      else url.searchParams.delete("lang");
      url.hash = "";
      fields.get("testUrl").value = url.href;
      openGameLink.href = url.href;
    } catch {
      fields.get("testUrl").value = "Invalid game base URL";
      openGameLink.href = "#";
    }
  }

  function applyLanguage() {
    const language = fields.get("languagePath").value === "ar" ? "ar" : "en";
    const protocol = PROTOCOL[language];
    neutralInstruction.textContent = protocol.neutral;
    retryInstruction.textContent = protocol.retry;
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    neutralInstruction.dir = language === "ar" ? "rtl" : "ltr";
    retryInstruction.dir = language === "ar" ? "rtl" : "ltr";
    renderQuestions();
    buildTestUrl();
  }

  function renderQuestions() {
    const language = fields.get("languagePath").value === "ar" ? "ar" : "en";
    const previous = Array.from(questionList.querySelectorAll("textarea")).map(function (item) { return item.value; });
    questionList.replaceChildren();
    PROTOCOL[language].questions.forEach(function (question, index) {
      const card = document.createElement("label");
      const prompt = document.createElement("strong");
      const answer = document.createElement("textarea");
      card.className = "question-card";
      card.dir = language === "ar" ? "rtl" : "ltr";
      prompt.textContent = String(index + 1) + ". " + question;
      answer.id = "answer" + (index + 1);
      answer.rows = 4;
      answer.value = previous[index] || "";
      answer.placeholder = language === "ar" ? "اكتب كلمات اللاعب كما قالها" : "Record the player's own words";
      answer.addEventListener("input", saveDraft);
      card.append(prompt, answer);
      questionList.append(card);
    });
  }

  function stageIndex(stage) { return Math.max(0, STAGES.indexOf(stage)); }

  function showStage(stage) {
    currentStage = STAGES.includes(stage) ? stage : "setup";
    document.querySelectorAll("[data-stage]").forEach(function (section) {
      section.hidden = section.dataset.stage !== currentStage;
    });
    const activeIndex = stageIndex(currentStage);
    document.querySelectorAll("[data-step-indicator]").forEach(function (indicator) {
      const index = stageIndex(indicator.dataset.stepIndicator);
      indicator.removeAttribute("aria-current");
      indicator.dataset.complete = index < activeIndex ? "true" : "false";
      if (index === activeIndex) indicator.setAttribute("aria-current", "step");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    saveDraft();
  }

  function formatTime(seconds) {
    const value = Math.max(0, Math.floor(seconds));
    return Math.floor(value / 60) + ":" + String(value % 60).padStart(2, "0");
  }

  function renderTimer() {
    timerDisplay.textContent = formatTime(timerSeconds);
    timerToggleButton.textContent = timerRunning ? "Pause timer" : timerSeconds > 0 ? "Resume timer" : "Start timer";
  }

  function setTimerRunning(next) {
    timerRunning = next === true;
    if (timerHandle !== null) window.clearInterval(timerHandle);
    timerHandle = null;
    if (timerRunning) {
      timerHandle = window.setInterval(function () {
        timerSeconds += 1;
        renderTimer();
        if (timerSeconds % 10 === 0) saveDraft();
      }, 1000);
    }
    renderTimer();
    saveDraft();
  }

  function fieldValue(element) {
    return element && element.type === "checkbox" ? element.checked : element ? element.value : "";
  }

  function saveDraft() {
    const data = { stage: currentStage, timerSeconds, values: {}, answers: [] };
    fields.forEach(function (element, id) {
      if (id !== "testUrl") data.values[id] = fieldValue(element);
    });
    data.answers = Array.from(questionList.querySelectorAll("textarea")).map(function (item) { return item.value; });
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch {}
  }

  function restoreDraft() {
    let data;
    try { data = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null"); } catch { data = null; }
    if (!data || typeof data !== "object") return false;
    if (data.values && typeof data.values === "object") {
      Object.keys(data.values).forEach(function (id) {
        const element = fields.get(id);
        if (!element) return;
        if (element.type === "checkbox") element.checked = data.values[id] === true;
        else element.value = String(data.values[id] === undefined ? "" : data.values[id]);
      });
    }
    timerSeconds = Number.isFinite(Number(data.timerSeconds)) ? Math.max(0, Math.floor(Number(data.timerSeconds))) : 0;
    applyLanguage();
    if (Array.isArray(data.answers)) {
      Array.from(questionList.querySelectorAll("textarea")).forEach(function (item, index) {
        item.value = String(data.answers[index] || "");
      });
    }
    showStage(STAGES.includes(data.stage) ? data.stage : "setup");
    renderTimer();
    setStatus("Local draft restored.", false);
    return true;
  }

  function requireSetup() {
    const token = cleanToken(fields.get("freshToken").value);
    if (!TOKEN_PATTERN.test(token)) return "Generate a valid fresh token first.";
    if (usedTokens().includes(token)) return "This token was already used. Generate a new token for a clean participant.";
    if (!fields.get("participantFreshConfirmed").checked) return "Confirm that the participant is genuinely fresh.";
    if (!fields.get("familiarity").value) return "Select the participant's broad mobile-game familiarity.";
    if (!fields.get("device").value.trim()) return "Record the device and orientation.";
    return "";
  }

  function unansweredQuestions() {
    return Array.from(questionList.querySelectorAll("textarea"))
      .map(function (item, index) { return item.value.trim() ? null : index + 1; })
      .filter(Boolean);
  }

  function booleanText(value) { return value ? "Yes" : "No"; }
  function textOrNone(value) { return String(value || "").trim() || "None recorded"; }

  function generateRecord() {
    const language = fields.get("languagePath").value === "ar" ? "ar" : "en";
    const answers = Array.from(questionList.querySelectorAll("textarea")).map(function (item) { return item.value.trim(); });
    const record = [
      "# Pixel Mage — Fresh-Player Cell Result",
      "",
      "- Build/commit: " + textOrNone(fields.get("buildCommit").value),
      "- Language path: " + PROTOCOL[language].label,
      "- Fresh token: `" + fields.get("freshToken").value + "`",
      "- Device and orientation: " + textOrNone(fields.get("device").value),
      "- Mobile-game familiarity: " + textOrNone(fields.get("familiarity").value),
      "- First attempt result, wave, and time: " + textOrNone(fields.get("attemptResult").value) + ", wave " + textOrNone(fields.get("waveReached").value) + ", " + formatTime(timerSeconds),
      "- Retry result, if offered: " + textOrNone(fields.get("retryResult").value),
      "- Started without help: " + booleanText(fields.get("startedWithoutHelp").checked),
      "- Moved without help: " + booleanText(fields.get("movedWithoutHelp").checked),
      "- First two rune reactions: first " + booleanText(fields.get("firstRuneReacted").checked) + "; second " + booleanText(fields.get("secondRuneReacted").checked),
      "- Rewrite chosen without help: " + booleanText(fields.get("rewriteWithoutHelp").checked),
      "- Choices by wave: " + textOrNone(fields.get("choicesByWave").value),
      "- Noticed spell changes: " + textOrNone(fields.get("spellChanges").value) + " (observed flag: " + booleanText(fields.get("noticedCombatChange").checked) + ")",
      "- First confusion/unfair moment: " + textOrNone(fields.get("firstConfusion").value),
      "- First boredom/disengagement moment: " + textOrNone(fields.get("firstBoredom").value),
      "- Boss/climax reaction: " + textOrNone(fields.get("bossReaction").value),
      "- Voluntary post-result action: " + textOrNone(fields.get("postResultAction").value) + "; opened Spellbook: " + booleanText(fields.get("openedSpellbookVoluntarily").checked) + "; selected/started again: " + booleanText(fields.get("startedAgainVoluntarily").checked),
      "",
      "## Answers 1–8",
      "",
    ];
    answers.forEach(function (answer, index) {
      record.push(String(index + 1) + ". " + answer);
    });
    record.push(
      "",
      "- Translation or RTL issues: " + textOrNone(fields.get("translationIssues").value),
      "- Other technical issues: " + textOrNone(fields.get("technicalIssues").value),
      "- Prediction matches: " + textOrNone(fields.get("predictionMatches").value),
      "- Prediction misses and likely causes: " + textOrNone(fields.get("predictionMisses").value),
      "- GO criteria checks: controls/rune " + booleanText(fields.get("gateControls").checked) + "; axes " + booleanText(fields.get("gateAxes").checked) + "; rewrite change " + booleanText(fields.get("gateChange").checked) + "; enjoyment/climax " + booleanText(fields.get("gateEnjoyment").checked) + "; replay curiosity " + booleanText(fields.get("gateReplay").checked) + "; technical " + booleanText(fields.get("gateTechnical").checked),
      "- Gate result: " + fields.get("gateResult").value,
      "- Owner second go/no-go: " + fields.get("ownerDecision").value,
      ""
    );
    fields.get("resultRecord").value = record.join("\n");
  }

  async function copyText(value, successMessage) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.append(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      setStatus(successMessage, false);
    } catch {
      setStatus("Copy failed. Select the text and copy it manually.", true);
    }
  }

  fields.get("languagePath").addEventListener("change", function () { applyLanguage(); saveDraft(); });
  fields.get("gameBase").addEventListener("input", function () { buildTestUrl(); saveDraft(); });
  fields.get("freshToken").addEventListener("input", function () { buildTestUrl(); saveDraft(); });

  fields.forEach(function (element, id) {
    if (!element || ["languagePath", "gameBase", "freshToken", "testUrl", "resultRecord"].includes(id)) return;
    element.addEventListener(element.type === "checkbox" || element.tagName === "SELECT" ? "change" : "input", saveDraft);
  });

  byId("generateTokenButton").addEventListener("click", function () {
    fields.get("freshToken").value = randomToken();
    buildTestUrl();
    saveDraft();
    setStatus("New unused token generated.", false);
  });

  byId("copyUrlButton").addEventListener("click", function () {
    copyText(fields.get("testUrl").value, "Test URL copied.");
  });

  byId("beginObservationButton").addEventListener("click", function () {
    const error = requireSetup();
    if (error) { setStatus(error, true); return; }
    markTokenUsed(fields.get("freshToken").value);
    setStatus("Setup locked. Give only the neutral instruction, then observe silently.", false);
    showStage("observation");
  });

  timerToggleButton.addEventListener("click", function () { setTimerRunning(!timerRunning); });
  byId("timerResetButton").addEventListener("click", function () {
    setTimerRunning(false);
    timerSeconds = 0;
    renderTimer();
    saveDraft();
  });

  byId("finishObservationButton").addEventListener("click", function () {
    setTimerRunning(false);
    setStatus("Observation closed. Ask the eight questions exactly as written.", false);
    showStage("interview");
  });

  byId("finishInterviewButton").addEventListener("click", function () {
    const missing = unansweredQuestions();
    if (missing.length > 0) {
      setStatus("Record an answer for every question. Use ‘No answer’ when that is the participant's response. Missing: " + missing.join(", "), true);
      return;
    }
    setStatus("Interview complete. Review the evidence against the frozen decision rules.", false);
    showStage("gate");
  });

  byId("generateRecordButton").addEventListener("click", function () {
    const result = fields.get("gateResult").value;
    if (!result) { setStatus("Select a gate result after reviewing the evidence.", true); return; }
    const allGoChecks = ["gateControls", "gateAxes", "gateChange", "gateEnjoyment", "gateReplay", "gateTechnical"]
      .every(function (id) { return fields.get(id).checked; });
    if (result === "GO candidate" && !allGoChecks) {
      setStatus("GO candidate requires all six frozen GO checks. Choose REVISION/NO-GO or complete the missing evidence.", true);
      return;
    }
    generateRecord();
    setStatus("Result record generated. Copy it back into the development session.", false);
    showStage("result");
  });

  byId("copyRecordButton").addEventListener("click", function () {
    copyText(fields.get("resultRecord").value, "Result record copied.");
  });

  byId("downloadRecordButton").addEventListener("click", function () {
    const blob = new Blob([fields.get("resultRecord").value], { type: "text/markdown;charset=utf-8" });
    const link = document.createElement("a");
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = "pixel-mage-cell-" + fields.get("freshToken").value + ".md";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(objectUrl); }, 0);
  });

  byId("resetRunnerButton").addEventListener("click", function () {
    if (!window.confirm("Reset this local draft and create a new cell? The exported record will not be recoverable here.")) return;
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    window.location.reload();
  });

  if (!restoreDraft()) {
    fields.get("freshToken").value = randomToken();
    applyLanguage();
    renderTimer();
    saveDraft();
  }
})();
