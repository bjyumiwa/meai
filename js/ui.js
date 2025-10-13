import { getCharColor, getAffection } from "./state.js";
import { t } from "./i18n.js";

export const setGradientByTime = () => {
  const hour = new Date().getHours();
  const app = document.getElementById("app");
  app.classList.remove("gradient-day","gradient-evening","gradient-night");
  if (hour >= 5 && hour < 16) app.classList.add("gradient-day");
  else if (hour < 20) app.classList.add("gradient-evening");
  else app.classList.add("gradient-night");
};

export const renderCharacter = () => {
  const color = getCharColor();
  const aff = getAffection();
  const mood = aff >= 3 ? "joy" : "calm";
  const path = `public/char/${color}/${mood}.png`;
  const img = document.getElementById("charImg");
  img.src = path; img.alt = `めあい(${color}/${mood})`;
  const glow = document.getElementById("glow");
  const base = 0.35, extra = Math.min(0.45, aff * 0.03);
  glow.style.opacity = String(base + extra);
  glow.style.transform = `scale(${1 + Math.min(0.25, aff*0.01)})`;
};

export const setRequestText = (text) => { document.getElementById("requestText").textContent = text; };
export const setPeriodText = (isMorning) => {
  document.getElementById("periodText").textContent = isMorning ? t("period_morning") : t("period_night");
};
export const setAffection = (val) => { document.getElementById("affectionVal").textContent = val; renderCharacter(); };

export const renderHistory = (hist) => {
  const wrap = document.getElementById("historyList"); wrap.innerHTML = "";
  hist.forEach(entry => {
    const el = document.createElement("div");
    el.className = "log";
    el.innerHTML = `
      <div class="log__date">${entry.date}</div>
      <div class="log__period">${entry.slot.endsWith("_morning") ? t("period_morning") : t("period_night")}</div>
      <div>
        <div class="log__req">📌 ${escapeHTML(entry.request||"")}</div>
        ${entry.response ? `<div class="log__res">💬 ${escapeHTML(entry.response)}</div>` : ""}
      </div>`;
    wrap.appendChild(el);
  });
};

export const bindEnterToClick = (inputId, buttonId) => {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(buttonId);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") btn.click(); });
};
export const pulse = (id, amt=1.06, dur=260) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.animate([{transform:"scale(1)"},{transform:`scale(${amt})`},{transform:"scale(1)"}], {duration:dur, easing:"ease-out"});
};

const escapeHTML = (s) => s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
