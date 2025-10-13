// ===== i18n.js =====
window.getLang = () => localStorage.getItem("meai.lang") || "ja";
window.setLanguage = (lang) => {
  localStorage.setItem("meai.lang", lang);
  document.documentElement.lang = lang;
};
window.t = (key) => {
  const lang = getLang();
  const base = {
    ja: { done: "はい、やったよ", no_save: "セーブデータがありません。" },
    en: { done: "Done!", no_save: "No save data." },
    zh: { done: "做到了！", no_save: "没有保存数据。" },
    ko: { done: "했어!", no_save: "저장된 데이터가 없어요." }
  };
  const data = base[lang] || base.ja;
  return key.split(".").reduce((o, k) => o?.[k], data);
};
