// ==========================================
// COLEÇÃO DE ÍCONES VETORIAIS (SVG)
// ==========================================
const ICONS = {
  power: `<svg viewBox="0 0 24 24"><path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/></svg>`,
  signal: `<svg viewBox="0 0 24 24"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4"/></svg>`,
  pharma: `<svg viewBox="0 0 24 24"><path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>`,
  building: `<svg viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>`,
  target: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34c3.08-.63 5.43-3.23 5.9-6.66H4.1c.47 3.43 2.82 6.03 5.9 6.66Z"/></svg>`,
  arena: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-10 10v4a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6v-4a10 10 0 0 0-10-10ZM2 12h20M12 2v20"/></svg>`
};

// ==========================================
// CONFIGURAÇÃO DOS 11 BOTÕES REAIS
// ==========================================
const BUTTONS_CONFIG = [
  {
    id: "btn-forbes",
    name: "Quadra Forbes",
    svg: ICONS.power,
    url: "https://app.benuvem.com.br/device-io/151/receive-event"
  },
  {
    id: "btn-line",
    name: "Quadra Line",
    svg: ICONS.power,
    url: "https://app.benuvem.com.br/device-io/404/receive-event"
  },
  {
    id: "btn-novapharma",
    name: "Quadra Nova Pharma",
    svg: ICONS.power,
    url: "https://app.benuvem.com.br/device-io/149/receive-event"
  },
  {
    id: "btn-unipora",
    name: "Quadra UnIpora",
    svg: ICONS.power,
    url: "https://app.benuvem.com.br/device-io/403/receive-event"
  },
  {
    id: "btn-exato01",
    name: "Exato 01",
    svg: ICONS.power,
    url: "https://app.benuvem.com.br/device-io/261/receive-event"
  },
  {
    id: "btn-exato02",
    name: "Exato 02",
    svg: ICONS.power,
    url: "https://app.benuvem.com.br/device-io/262/receive-event"
  },
  {
    id: "btn-exato03",
    name: "Exato 03",
    svg: ICONS.power,
    url: "https://app.benuvem.com.br/device-io/263/receive-event"
  },
  {
    id: "btn-exato04",
    name: "Exato 04",
    svg: ICONS.power,
    url: "https://app.benuvem.com.br/device-io/364/receive-event"
  },
  {
    id: "btn-aabb01",
    name: "AABB 01",
    svg: ICONS.power,
    url: "https://app.benuvem.com.br/device-io/182/receive-event"
  },
  {
    id: "btn-aabb02",
    name: "AABB 02",
    svg: ICONS.power,
    url: "https://app.benuvem.com.br/device-io/389/receive-event"
  },
  {
    id: "btn-mva-arena",
    name: "MVA Arena",
    svg: ICONS.power,
    url: "https://app.benuvem.com.br/device-io/238/receive-event"
  }
];

// ==========================================
// RENDERIZAÇÃO E EVENTOS
// ==========================================
const grid = document.getElementById("button-grid");
const toast = document.getElementById("status-toast");
let toastTimeout;

function showToast(msg) {
  clearTimeout(toastTimeout);
  toast.textContent = msg;
  toast.classList.add("show");
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 1600);
}

function sendCommand(buttonConfig) {
  if (navigator.vibrate) {
    navigator.vibrate(50); // Feedback tátil ao tocar
  }

  fetch(buttonConfig.url, {
    method: "GET",
    mode: "no-cors"
  })
  .then(() => showToast(`Enviado: ${buttonConfig.name}`))
  .catch(err => {
    console.error(err);
    showToast(`Erro ao enviar: ${buttonConfig.name}`);
  });
}

function renderButtons() {
  grid.innerHTML = "";

  BUTTONS_CONFIG.forEach(cfg => {
    const card = document.createElement("div");
    card.className = "button-card";

    const bezel = document.createElement("div");
    bezel.className = "na-bezel";

    const btn = document.createElement("button");
    btn.className = "na-button";
    btn.setAttribute("aria-label", cfg.name);
    btn.innerHTML = cfg.svg;

    bezel.appendChild(btn);

    const label = document.createElement("span");
    label.className = "button-label";
    label.textContent = cfg.name;

    card.appendChild(bezel);
    card.appendChild(label);
    grid.appendChild(card);

    // Eventos de Pressionar
    const press = (e) => {
      e.preventDefault();
      if (!btn.classList.contains("pressed")) {
        btn.classList.add("pressed");
        sendCommand(cfg);
      }
    };

    // Eventos de Soltar
    const release = (e) => {
      e.preventDefault();
      btn.classList.remove("pressed");
    };

    btn.addEventListener("pointerdown", press);
    btn.addEventListener("pointerup", release);
    btn.addEventListener("pointercancel", release);
    btn.addEventListener("pointerleave", release);
    btn.addEventListener("contextmenu", e => e.preventDefault());
  });
}

renderButtons();
