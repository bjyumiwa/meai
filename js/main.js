import {
  LS, loadHistory, saveHistory, pushLog,
  getAffection, setAffection, getLastSlot, setLastSlot,
  todayISO, currentSlot, loadJSON, saveJSON, toCSV, downloadText,
  hasSave, resetAll, markStarted
} from "./state.js";
import { pickRequestI18n } from "./requests.js";
import { setGradientByTime, renderCharacter, setRequestText, setPeriodText,
         setAffection as uiSetAffection, renderHistory, bindEnterToClick, pulse } from "./ui.js";
import { t, getLang, setLang, SUPPORTED } from "./i18n.js";

const state = { slotKey: null, request: "", used: new Set() };

/* ===== タイトル初期化 ===== */
function initTitle(){
  const title = document.getElementById("titleScreen");
  const app = document.getElementById("app");
  const btnNew = document.getElementById("btnNew");
  const btnCont = document.getElementById("btnContinue");

  // 文言
  document.querySelector("#titleScreen .title").textContent = t("app_title");
  document.querySelector(".subtitle").textContent = t("app_sub");
  btnNew.textContent = t("btn_new");
  btnCont.textContent = t("btn_cont");
  document.querySelector(".hint").textContent = t("hint_continue");

  setupLangUI();
  setupResearchModal();

  if (hasSave()) btnCont.disabled = false;

  btnNew.onclick = () => {
    if (hasSave() && !confirm(t("confirm_new"))) return;
    resetAll(); markStarted(); startGame();
    title.hidden = true; app.hidden = false;
  };
  btnCont.onclick = () => {
    if (btnCont.disabled) return;
    markStarted(); startGame();
    title.hidden = true; app.hidden = false;
  };

  title.hidden = false; app.hidden = true;
}

function setupLangUI(){
  const sel = document.getElementById("langSelect");
  sel.innerHTML = SUPPORTED.map(code => {
    const label = ({ja:"日本語",en:"English",zh:"简体中文",ko:"한국어"})[code];
    return `<option value="${code}">${label}</option>`;
  }).join("");
  sel.value = getLang();
  sel.onchange = () => { setLang(sel.value); location.reload(); };
  document.getElementById("langLabel").textContent = t("menu_language");
}

function setupResearchModal(){
  document.getElementById("openResearch").textContent = t("menu_research");
  document.getElementById("researchTitle").textContent = t("research_title");
  document.getElementById("researchBody").textContent = t("research_body");
  document.getElementById("closeResearch").textContent = t("research_close");
  const modal = document.getElementById("researchModal");
  document.getElementById("openResearch").onclick = () => modal.showModal();
  document.getElementById("closeResearch").onclick = () => modal.close();
}

/* ===== 本編 ===== */
function startGame(){
  state.slotKey = currentSlot();
  state.used = new Set(loadJSON(LS.USED, []));

  setGradientByTime();
  renderCharacter();
  uiSetAffection(getAffection());
  document.querySelector(".app__header .title").textContent = t("app_title");
  document.getElementById("toTitleBtn").textContent = t("btn_to_title");
  document.getElementById("exportCsvBtn").textContent = t("btn_csv");
  document.getElementById("replyInput").placeholder = t("input_placeholder");
  document.getElementById("doneBtn").textContent = t("btn_done");
  document.getElementById("goodnightBtn").textContent = t("btn_goodnight");
  document.querySelector(".history__title").textContent = t("hist_title");

  setPeriodText(state.slotKey.endsWith("_morning"));

  const last = getLastSlot();
  if (last !== state.slotKey) {
    state.request = pickRequestI18n(state.slotKey, state.used);
    setRequestText(state.request);
    state.used.add(state.request);
    if (state.used.size > 120) state.used = new Set();
    saveJSON(LS.USED, [...state.used]);
    setLastSlot(state.slotKey);
  } else {
    const hist = loadHistory();
    const found = hist.find(h => h.slot === state.slotKey);
    state.request = found?.request || pickRequestI18n(state.slotKey, state.used);
    setRequestText(state.request);
  }

  renderHistory(loadHistory());

  document.getElementById("doneBtn").onclick = onDone;
  document.getElementById("goodnightBtn").onclick = onGoodnight;
  document.getElementById("exportCsvBtn").onclick = onExportCSV;
  document.getElementById("toTitleBtn").onclick = backToTitle;
  bindEnterToClick("replyInput", "doneBtn");

  document.getElementById("goodnightBtn").disabled = !state.slotKey.endsWith("_night");
}

function onDone(){
  const reply = document.getElementById("replyInput").value.trim();
  const hist = loadHistory();
  const already = hist.some(h => h.slot === state.slotKey);
  let aff = getAffection();
  if (!already) { aff += 1; setAffection(aff); uiSetAffection(aff); }
  const entry = { date: todayISO(), slot: state.slotKey, request: state.request, response: reply || "OK", affection: aff };
  if (already) { const idx = hist.findIndex(h => h.slot === state.slotKey); hist[idx] = entry; saveHistory(hist); }
  else { pushLog(entry); }
  renderHistory(loadHistory());
  document.getElementById("replyInput").value = "";
  pulse("charImg", 1.08, 320);
}

function onGoodnight(){
  const entry = { date: todayISO(), slot: state.slotKey, request: t("btn_goodnight"),
    response: t("btn_goodnight"), affection: getAffection() };
  const hist = loadHistory();
  const already = hist.some(h => h.slot === state.slotKey);
  if (already) {
    const idx = hist.findIndex(h => h.slot === state.slotKey);
    hist[idx].response = (hist[idx].response ? hist[idx].response + " / " : "") + entry.response;
    saveHistory(hist);
  } else { pushLog(entry); }
  renderHistory(loadHistory());
  const glow = document.getElementById("glow");
  glow.animate([{opacity:glow.style.opacity||".6"},{opacity:".25"},{opacity:glow.style.opacity||".6"}],
               {duration:1200, easing:"ease-in-out"});
  pulse("goodnightBtn", 1.05, 260);
}

function onExportCSV(){
  const csv = toCSV(loadHistory());
  downloadText(`${t("csv_name_prefix")}${todayISO()}.csv`, csv);
}

function backToTitle(){
  document.getElementById("titleScreen").hidden = false;
  document.getElementById("app").hidden = true;
  document.getElementById("btnContinue").disabled = !hasSave();
}

// 起動：タイトルから
document.addEventListener("DOMContentLoaded", initTitle);
