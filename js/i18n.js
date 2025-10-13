// ===== i18n.js =====
// 言語ごとの文言定義
window.I18N = {
  ja: {
    requests: [
      "今日はだれかに『おはよう』を伝えてみよう",
      "水をコップ一杯のもう",
      "5分だけストレッチしてみよう",
      "外の空気を吸いに行こう"
    ],
    done: "はい、やったよ",
    period_now: "いま",
    no_save: "セーブデータがありません。"
  },
  en: {
    requests: [
      "Say “good morning” to someone today.",
      "Drink a glass of water.",
      "Stretch for 5 minutes.",
      "Step outside for fresh air."
    ],
    done: "Done!",
    period_now: "now",
    no_save: "No save data."
  }
};

// 現在の言語設定を取得
window.getLang = () => localStorage.getItem("meai.lang") || "ja";

// 言語を切り替え
window.setLanguage = (lang) => {
  localStorage.setItem("meai.lang", lang);
  document.documentElement.lang = lang;
};

// 翻訳用ショート関数
window.t = (key) => {
  const lang = getLang();
  const data = I18N[lang] || I18N.ja;
  return key.split(".").reduce((o, k) => o?.[k], data);
};
