window.addEventListener("DOMContentLoaded",()=>{
  const app=document.getElementById("app");
  const titleScreen=document.getElementById("titleScreen");
  const btnStart=document.getElementById("btnStart");
  const btnContinue=document.getElementById("btnContinue");
  const btnAbout=document.getElementById("btnAbout");
  const btnCloseModal=document.getElementById("btnCloseModal");
  const modal=document.getElementById("researchModal");
  const langSelect=document.getElementById("langSelect");

  langSelect.value=getLang();
  langSelect.addEventListener("change",e=>setLanguage(e.target.value));

  btnContinue.disabled=!State.hasSave();

  btnStart.addEventListener("click",()=>{
    State.resetAll();
    State.markStarted();
    titleScreen.hidden=true;app.hidden=false;
    startGame(true);
  });

  btnContinue.addEventListener("click",()=>{
    if(!State.hasSave()){alert(t("no_save"));return;}
    titleScreen.hidden=true;app.hidden=false;
    startGame(false);
  });

  btnAbout.addEventListener("click",()=>modal.showModal());
  btnCloseModal.addEventListener("click",()=>modal.close());
});

function startGame(newGame){
  if(newGame){State.saveHistory([]);State.setAffection(0);}
  const req=nextRequest();
  document.getElementById("reqText").textContent=req.text;
  document.getElementById("reqPeriod").textContent=req.period;
  UI.renderAffection();

  document.getElementById("btnSend").onclick=()=>{
    const reply=document.getElementById("replyInput").value.trim()||t("done");
    const entry={date:State.todayISO(),slot:State.currentSlot(),request:document.getElementById("reqText").textContent,response:reply,affection:State.getAffection()+1};
    State.pushLog(entry);
    State.setAffection(State.getAffection()+1);
    UI.renderAvatar("joy");setTimeout(()=>UI.renderAvatar("calm"),1000);
    UI.renderAffection();UI.appendHistoryRow(entry);
    document.getElementById("replyInput").value="";
    const next=nextRequest();
    document.getElementById("reqText").textContent=next.text;
    document.getElementById("reqPeriod").textContent=next.period;
  };

  document.getElementById("btnExport").onclick=UI.exportCSV;
  const hist=State.loadHistory();
  document.getElementById("historyList").innerHTML="";
  hist.forEach(UI.appendHistoryRow);
}
