// ファイル: public/js/meai-reset.js
(function(){
  const START_PAGE = 'index.html'; // ← スタートページ名（必要なら変更）

  const KNOWN_KEYS = [
    'MEAI_STATE_V3','MEAI_LOG_V3','MEAI_USER_NAME','MEAI_CHAR_COLOR',
    'MEAI_SEEN_COVER_V1','MEAI_SLEEP_DATE_V1'
  ];
  const PREFIXES = [
    'MEAI_DAILY_V3:','MEAI_DAY_PROGRESS_V3:',
    'MEAI_GOOD_V1:','MEAI_PENALTY_V1:',
    'MEAI_STATE_V2','MEAI_LOG_V2'
  ];

  function clearAll(){
    KNOWN_KEYS.forEach(k=> localStorage.removeItem(k));
    Object.keys(localStorage).forEach(k=>{
      if (PREFIXES.some(p => k.startsWith(p))) localStorage.removeItem(k);
    });
  }

  function resetAllGlobal(){
    if (!confirm('すべての記録を初期化し、スタート画面へ戻ります。よろしいですか？')) return;
    clearAll();
    location.href = START_PAGE;
  }

  // グローバル公開 & 自動バインド（#resetAll / .reset-all どちらでもOK）
  window.MeAI = window.MeAI || {};
  window.MeAI.resetAll = resetAllGlobal;

  document.addEventListener('click', (e)=>{
    const t = e.target.closest('#resetAll, .reset-all');
    if (t){ e.preventDefault(); resetAllGlobal(); }
  });
})();
