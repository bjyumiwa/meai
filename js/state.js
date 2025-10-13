// ===== state.js =====
(() => {
  const NS = "meai";
  const LS = {
    HIST: `${NS}.history.v1`,
    USED: `${NS}.usedRequests.v1`,
    LAST_SLOT: `${NS}.lastSlot`,
    AFF: `${NS}.affection`,
    CHAR: `${NS}.charColor`,
    STARTED: `${NS}.started`,
    LANG: `${NS}.lang`
  };

  const todayISO = () => {
    const d = new Date();
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  };

  const currentSlot = () => {
    const h = new Date().getHours();
    const slot = (h >= 5 && h < 16) ? "morning" : "night";
    return `${todayISO()}_${slot}`;
  };

  const loadJSON = (k, fb) => { try { return JSON.parse(localStorage.getItem(k) || JSON.stringify(fb)); } catch { return fb; } };
  const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const loadHistory = () => loadJSON(LS.HIST, []);
  const saveHistory = (arr) => saveJSON(LS.HIST, arr);
  const pushLog = (entry) => { const h = loadHistory(); h.unshift(entry); saveHistory(h); };

  const getAffection = () => Number(localStorage.getItem(LS.AFF) || "0");
  const setAffection = (n) => localStorage.setItem(LS.AFF, String(n));

  const getCharColor = () => localStorage.getItem(LS.CHAR) || pickChar();
  const pickChar = () => {
    const c = ["blue", "pink", "green"][Math.floor(Math.random() * 3)];
    localStorage.setItem(LS.CHAR, c);
    return c;
  };

  const hasSave = () => {
    const aff = getAffection();
    const histLen = loadHistory().length;
    return aff > 0 || histLen > 0;
  };

  const markStarted = () => localStorage.setItem(LS.STARTED, "1");
  const resetAll = () => {
    [LS.HIST, LS.USED, LS.LAST_SLOT, LS.AFF, LS.CHAR, LS.STARTED].forEach(k => localStorage.removeItem(k));
    getCharColor();
  };

  const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const toCSV = (hist) => {
    const header = ["date", "slot", "request", "response", "affection"].join(",");
    const lines = hist.map(h => [h.date, h.slot, q(h.request), q(h.response || ""), h.affection].join(","));
    return [header, ...lines].join("\n");
  };

  const downloadText = (filename, text) => {
    const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a);
    a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  window.State = {
    LS, todayISO, currentSlot,
    loadHistory, saveHistory, pushLog,
    getAffection, setAffection,
    getCharColor, hasSave, markStarted, resetAll,
    toCSV, downloadText, loadJSON, saveJSON
  };
})();
