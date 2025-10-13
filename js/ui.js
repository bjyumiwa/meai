window.UI = (() => {
  function renderAffection(){
    document.getElementById("affectionCount").textContent=State.getAffection();
    const aff=State.getAffection();
    let color=State.getCharColor();
    if(aff>=12)color="purple";else if(aff>=8)color="green";else if(aff>=4)color="pink";
    document.getElementById("charImg").src=`./public/char/${color}/calm.png`;
  }

  function renderAvatar(mood="calm"){
    const color=State.getCharColor();
    document.getElementById("charImg").src=`./public/char/${color}/${mood}.png`;
  }

  function appendHistoryRow(item){
    const row=document.createElement("div");
    row.className="history-row";
    row.innerHTML=`<div>${item.request}</div><div style="font-size:12px;color:#aaa">${item.date} (${item.slot})</div>`;
    document.getElementById("historyList").prepend(row);
  }

  function exportCSV(){
    const csv=State.toCSV(State.loadHistory());
    State.downloadText("meai_history.csv",csv);
  }

  return {renderAffection,renderAvatar,appendHistoryRow,exportCSV};
})();
