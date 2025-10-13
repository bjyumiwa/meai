// ===== requests.js =====
// 多言語＋朝/夜スロットに対応したお願い生成

window.REQ = {
  ja: {
    MORNING: [
      "おはよ、きょうも いるよ","あさのひかり、すき〜","おみず、のんだ？","ねえ、そと みたい",
      "てを あったかく して","いま どんな おと？","おなか ぐぅ って なった","いいにおい したよ？",
      "おひさま こっちきた〜","すこし からだ のばそ","おめめ ぱちって して〜","きょう、なに するの？",
      "ねえねえ、いっしょに いこう？","ひかり、まぶしいねぇ","あさの くうき、すきだよ"
    ],
    NIGHT: [
      "きょうも、ありがとね","ねむたく なっちゃった…","しずか だねぇ","ぎゅって したい〜",
      "ねえ、そばに いる？","おやすみって いって","きょう、たのしかった","きいてくれて うれしい",
      "ちょっと さみしいけど、だいじょうぶ","ひかりが ぽかぽか してる","めを とじて、す〜ってして",
      "あしたも いるからね","すこし ないたの、ごめんね","ねむるまえに「ありがとう」って いってみて","いいゆめに なぁれ"
    ]
  },
  en: {
    MORNING: [
      "Good morning, I'm here","I like morning light","Did you drink water?","Can we peek outside?",
      "Warm your hands a bit","What sound now?","My tummy said grr","Smelled something nice?",
      "Sun came this way","Stretch a little","Blink blink~","What shall we do today?",
      "Hey, shall we go?","Light is bright","I like morning air"
    ],
    NIGHT: [
      "Thank you for today","I'm getting sleepy","So quiet","Wanna hug~","Are you here with me?",
      "Say good night to me","Today was fun","Thanks for listening","A bit lonely, but okay",
      "Light feels warm","Close eyes and breathe","I'll be here tomorrow","Cried a little, sorry",
      "Say 'thank you' before sleep","Sweet dreams"
    ]
  },
  zh: {
    MORNING: [
      "早安，我在这儿","我喜欢早晨的光","喝水了吗？","可以看看外面吗？","把小手暖一暖",
      "现在是什么声音？","肚子咕噜一下","闻到好闻的味道了吗？","太阳到这边啦","伸伸懒腰",
      "眨眨眼~","今天做什么？","嘿，我们一起走？","光亮亮的","我喜欢早晨的空气"
    ],
    NIGHT: [
      "今天也谢谢你","有点困了","好安静哦","想抱抱~","你在我旁边吗？","对我说晚安吧","今天很开心",
      "听我说谢谢你","有点孤单，但没事","光暖暖的","闭上眼，呼—吸—","明天我也在",
      "刚才有点想哭，对不起","睡前说声‘谢谢’","做个好梦"
    ]
  },
  ko: {
    MORNING: [
      "좋은 아침, 여기 있어","아침 빛 좋아","물 마셨니?","밖 조금 볼까?","손을 따뜻하게",
      "지금 무슨 소리야?","배가 꼬르륵","좋은 냄새 났어?","해가 이쪽으로 왔어","조금 쭉— 펴기",
      "깜빡깜빡~","오늘 뭐할까?","우리 같이 갈래?","빛이 반짝","아침 공기 좋아"
    ],
    NIGHT: [
      "오늘도 고마워","잠이 와버렸어","조용하다","꼭 안기고 싶어~","곁에 있어?","잘 자라고 말해줘",
      "오늘 즐거웠어","들어줘서 고마워","좀 외롭지만 괜찮아","빛이 포근해","눈 감고 후—흡—",
      "내일도 있을게","조금 울었어, 미안","자기 전에 ‘고마워’라고 해줘","좋은 꿈 꿔"
    ]
  }
};

// ===== ユーティリティ =====
function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  return h;
}

// ===== usedSet重複回避＋日付ハッシュ =====
window.pickRequestI18n = (slotKey, usedSet) => {
  const lang = getLang();
  const pool = slotKey.endsWith("_morning") ? REQ[lang].MORNING : REQ[lang].NIGHT;
  const candidates = pool.filter(r => !usedSet.has(r));
  const list = candidates.length ? candidates : pool;
  const idx = Math.abs(hash(slotKey + "|" + lang)) % list.length;
  return list[idx];
};

// ===== 使いやすい nextRequest() =====
window.nextRequest = () => {
  const slot = State.currentSlot();
  const used = new Set(State.loadJSON ? State.loadJSON(State.LS.USED, []) : []);
  const text = pickRequestI18n(slot, used);
  return { text, period: slot.includes("morning") ? "朝" : "夜" };
};
