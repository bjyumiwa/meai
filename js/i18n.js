// 超軽量 i18n
const I18N = {
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
function setLanguage(lang){ localStorage.setItem("meai_lang", lang); document.documentElement.lang = lang; }
function t(path){
  const lang = localStorage.getItem("meai_lang") || "ja";
  const obj = I18N[lang] || I18N.ja;
  return path.split(".").reduce((o,k)=>o?.[k], obj);
}
