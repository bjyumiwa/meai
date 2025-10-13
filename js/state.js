const NS = "meai";
export const LS = {
  HIST: `${NS}.history.v1`,
  USED: `${NS}.usedRequests.v1`,
  LAST_SLOT: `${NS}.lastSlot`,
  AFF: `${NS}.affection`,
  CHAR: `${NS}.charColor`,
  STARTED: `${NS}.started`,
  LANG: `${NS}.lang`
};

export const todayISO = () => {
  const d = new Date();
  const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2,'0'), dd = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${dd}`;
};
// 5-16時=朝, それ以外=夜
export const currentSlot = () => {
  const h = new Date().getHours();
  const slot = (h >= 5 && h < 16) ? "morning" : "night";
  return `${todayISO()}_${slot}`;
};

export const loadJSON = (k, fb) => { try{ return JSON.parse(localStorage.getItem(k) || JSON.stringify(fb)); }catch{ return fb; } };
export const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

export const loadHistory = () => loadJSON(LS.HIST, []);
export const saveHistory = (arr) => saveJSON(LS.HIST, arr);
export const pushLog = (entry) => { const h = loadHistory(); h.unshift(entry); saveHistory(h); };

export const getAffection = () => Number(localStorage.getItem(LS.AFF) || "0");
export const setAffection = (n) => localStorage.setItem(LS.AFF, String(n));

export const getLastSlot = () => localStorage.getItem(LS.LAST_SLOT) || "";
export const setLastSlot = (slot) => localStorage.setItem(LS.LAST_SLOT, slot);

export const getCharColor = () => localStorage.getItem(LS.CHAR) || pickChar();
const pickChar = () => {
  const c = ["blue","pink","green"][Math.floor(Math.random()*3)];
  localStorage.setItem(LS.CHAR, c); return c;
};

export const hasSave = () => {
  const started = localStorage.getItem(LS.STARTED) === "1";
  const aff = getAffection(); const histLen = loadHistory().length;
  return started || aff > 0 || histLen > 0;
};
export const markStarted = () => localStorage.setItem(LS.STARTED, "1");
export const resetAll = () => {
  [LS.HIST,LS.USED,LS.LAST_SLOT,LS.AFF,LS.CHAR,LS.STARTED].forEach(k=>localStorage.removeItem(k));
  getCharColor(); // 新しい色を割り当て
};

// CSV
export const toCSV = (hist) => {
  const header = ["date","slot","request","response","affection"].join(",");
  const lines = hist.map(h => [h.date,h.slot,q(h.request),q(h.response||""),String(h.affection??"")].join(","));
  return [header,...lines].join("\n");
};
const q = (s) => `"${String(s).replace(/"/g,'""')}"`;
export const downloadText = (filename, text) => {
  const blob = new Blob([text], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
};
