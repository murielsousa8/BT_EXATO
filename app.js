// ==========================================
// CONFIGURAÇÃO DOS BOTÕES
// Adicione quantos botões desejar aqui:
// ==========================================
const BUTTONS_CONFIG = [
  {
    id: "btn-1",
    name: "Nova Pharma",
    // Imagem/ícone SVG em Base64 ou URL de imagem
    icon: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
    url: "https://app.benuvem.com.br/device-io/149/receive-event",
    method: "GET" // ou POST
  },
  {
    id: "btn-2",
    name: "UnIpora",
    icon: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
    url: "https://app.benuvem.com.br/device-io/403/receive-event",
    method: "GET"
  },
  {
    id: "btn-3",
    name: "Lince",
    icon: "https://cdn-icons-png.flaticon.com/512/3524/3524659.png",
    url: "https://app.benuvem.com.br/device-io/404/receive-event",
    method: "GET"
  },
   {
    id: "btn-4",
    name: "Forbes",
    icon: "https://cdn-icons-png.flaticon.com/512/3524/3524659.png",
    url: "https://app.benuvem.com.br/device-io/151/receive-event",
    method: "GET"
  }
];

// ==========================================
// RENDERIZAÇÃO E EVENTOS
// ==========================================
const grid = document.getElementById("button-grid");
const toast = document.getElementById("status-toast");

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1500);
}

function sendCommand(buttonConfig) {
  // Vibração tátil no celular se suportado
  if (navigator.vibrate) navigator.vibrate(40);

  // Envio do evento em segundo plano (mode no-cors evita bloqueios se o servidor de IoT não tiver headers CORS abertos)
  fetch(buttonConfig.url, {
    method: buttonConfig.method,
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

    const img = document.createElement("img");
    img.src = cfg.icon;
    img.alt = cfg.name;

    btn.appendChild(img);
    bezel.appendChild(btn);

    const label = document.createElement("span");
    label.className = "button-label";
    label.textContent = cfg.name;

    card.appendChild(bezel);
    card.appendChild(label);
    grid.appendChild(card);

    // Eventos de Pressionar (Pointer Events cobrem Mouse e Touch)
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
  });
}

renderButtons();
