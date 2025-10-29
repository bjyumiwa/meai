<!-- public/js/meai-common.js -->
<script>
(function(){
  const LS_STATE  = 'MEAI_STATE_V3';
  const LS_USER   = 'MEAI_USER_NAME';
  const LS_COLOR  = 'MEAI_CHAR_COLOR';
  const LS_CNAME  = 'MEAI_CHAR_NAME_V1';

  function loadState(){
    const raw = localStorage.getItem(LS_STATE);
    return raw ? JSON.parse(raw) : {
      userName: localStorage.getItem(LS_USER)||'',
      charColor: localStorage.getItem(LS_COLOR)||'blue'
    };
  }
  function saveState(s){ localStorage.setItem(LS_STATE, JSON.stringify(s)); }

  const api = {
    getUserName(){ return (loadState().userName || localStorage.getItem(LS_USER) || '').trim(); },
    setUserName(v){ const s=loadState(); s.userName=(v||'').trim(); saveState(s); localStorage.setItem(LS_USER, s.userName); },

    getColor(){ return (loadState().charColor || localStorage.getItem(LS_COLOR) || 'blue'); },
    setColor(c){ const s=loadState(); s.charColor=c; saveState(s); localStorage.setItem(LS_COLOR, c); },

    getCharName(){ return localStorage.getItem(LS_CNAME) || ''; },
    setCharName(n){ localStorage.setItem(LS_CNAME, (n||'').trim()); },

    imgPath(emotion='calm'){ return `public/char/${api.getColor()}/${emotion}.png`; }
  };

  window.MeAI = Object.assign(window.MeAI||{}, api);
})();
</script>
