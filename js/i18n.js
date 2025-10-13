const NS = "meai";
const LANG_KEY = `${NS}.lang`;
export const SUPPORTED = ["ja","en","zh","ko"];

export const tdata = {
  ja:{app_title:"めあい",app_sub:"— 小さなAIのいる生活 —",btn_new:"はじめから",btn_cont:"つづきから",
      hint_continue:"※ セーブがあると表示されます",btn_to_title:"タイトルへ",btn_csv:"CSV出力",
      input_placeholder:"ひとこと返してね（任意）",btn_done:"はい、やったよ",btn_goodnight:"おやすみ",
      hist_title:"お世話のきろく",period_morning:"あさの おねがい",period_night:"よるの おねがい",
      confirm_new:"セーブデータを消して、はじめからにします。よろしいですか？",
      csv_name_prefix:"meai_history_",menu_research:"研究について",menu_language:"言語",
      research_title:"研究について",
      research_body:`「めあい」は、生活の中でAIを“お世話”する体験を通じて、人とAIの関わりをやさしく観察できる実験的ミニゲームです。1日1〜2回、AIが小さなお願いをします。あなたはそれに応えるだけ。判定はしません。信頼にもとづく関係の記録（ログ）をCSVで保存できます。\n\n・対象：日常で続けられる超軽量のケア体験\n・データ：日付／時間帯（朝・夜）／お願い文／返答／継続日数（愛着）\n・目的：AIとの“いる関係（being-with）”を、押しつけずに可視化\n・公開：GitHub Pages（ローカル保存のみ／外部送信なし）`,
      research_close:"とじる"},
  en:{app_title:"Me•AI",app_sub:"— A tiny AI living with you —",btn_new:"New game",btn_cont:"Continue",
      hint_continue:"Shown when a save exists",btn_to_title:"Back to Title",btn_csv:"Export CSV",
      input_placeholder:"Say a little reply (optional)",btn_done:"Okay, I did it",btn_goodnight:"Good night",
      hist_title:"Care Log",period_morning:"Morning request",period_night:"Night request",
      confirm_new:"Start a new game and delete current save?",csv_name_prefix:"meai_history_",
      menu_research:"About Research",menu_language:"Language",research_title:"About the Research",
      research_body:`“Me•AI” is a tiny experimental game about caring for an AI in everyday life. Once or twice a day, the AI makes a small request. You simply respond. There is no verification—it's trust-based. Logs can be exported as CSV.\n\n• Target: ultra-light daily care you can keep\n• Data: date / slot (morning, night) / request / reply / affection (streak)\n• Goal: visualize a gentle “being-with” relationship with AI\n• Hosting: GitHub Pages (local only, no external transmission)`,
      research_close:"Close"},
  zh:{app_title:"芽·AI",app_sub:"— 和你一起生活的小AI —",btn_new:"重新开始",btn_cont:"继续",
      hint_continue:"有存档时显示",btn_to_title:"返回标题",btn_csv:"导出CSV",
      input_placeholder:"回一句话（可选）",btn_done:"嗯，做好了",btn_goodnight:"晚安",
      hist_title:"照料记录",period_morning:"早晨的请求",period_night:"夜晚的请求",
      confirm_new:"重新开始并删除当前存档？",csv_name_prefix:"meai_history_",
      menu_research:"关于研究",menu_language:"语言",research_title:"关于研究",
      research_body:`“芽·AI”是在日常生活中“照料AI”的微小实验性游戏。每天1-2次，AI会提出一个小请求，你只需回应。不做验证——基于信任。记录可导出为CSV。\n\n• 对象：可持续的超轻量照护体验\n• 数据：日期 / 时段（早/晚） / 请求 / 回复 / 连续天数（亲密度）\n• 目标：温柔地可视化人与AI的“共在”关系\n• 托管：GitHub Pages（仅本地存储，无外部传输）`,
      research_close:"关闭"},
  ko:{app_title:"메아이",app_sub:"— 함께 사는 작은 AI —",btn_new:"처음부터",btn_cont:"이어하기",
      hint_continue:"세이브가 있을 때 표시",btn_to_title:"타이틀로",btn_csv:"CSV 내보내기",
      input_placeholder:"한마디 남겨요 (선택)",btn_done:"응, 했어",btn_goodnight:"잘 자",
      hist_title:"돌봄 기록",period_morning:"아침 요청",period_night:"밤 요청",
      confirm_new:"세이브를 삭제하고 처음부터 시작할까요?",csv_name_prefix:"meai_history_",
      menu_research:"연구 소개",menu_language:"언어",research_title:"연구 소개",
      research_body:`‘메아이’는 일상에서 AI를 ‘돌봐주는’ 경험을 통해 사람과 AI의 관계를 부드럽게 관찰하는 실험적 미니 게임입니다. 하루 1~2번, AI가 작은 부탁을 하고, 당신은 응답만 하면 됩니다. 검증은 하지 않습니다. 신뢰 기반의 기록을 CSV로 저장할 수 있습니다.\n\n• 대상: 매일 지속 가능한 초경량 케어\n• 데이터: 날짜 / 시간대(아침·밤) / 부탁 / 응답 / 연속일(애착)\n• 목적: 강요하지 않는 ‘함께 있음(being-with)’을 시각화\n• 공개: GitHub Pages (로컬 저장, 외부 전송 없음)`,
      research_close:"닫기"}
};

export const getLang = () => {
  const saved = localStorage.getItem(LANG_KEY);
  if (SUPPORTED.includes(saved)) return saved;
  const nav = (navigator.language || "ja").slice(0,2);
  const lang = SUPPORTED.includes(nav) ? nav : "ja";
  localStorage.setItem(LANG_KEY, lang);
  return lang;
};
export const setLang = (lang) => { if (SUPPORTED.includes(lang)) localStorage.setItem(LANG_KEY, lang); };
export const t = (key) => (tdata[getLang()]?.[key]) ?? (tdata.ja[key] ?? key);
