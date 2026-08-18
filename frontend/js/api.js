const API_BASE_URL = window.JCA_CONFIG.apiBaseUrl;

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error?.message || "Erro ao comunicar com a API.");
  }

  return data;
}

function setBranding() {
  const brand = window.JCA_CONFIG.brand;
  document.querySelectorAll("[data-brand-name]").forEach((el) => {
    el.textContent = brand.name;
  });
  document.querySelectorAll("[data-brand-phone]").forEach((el) => {
    el.textContent = brand.phone;
  });
  document.querySelectorAll("[data-brand-email]").forEach((el) => {
    el.textContent = brand.email;
  });
  document.querySelectorAll("[data-brand-city]").forEach((el) => {
    el.textContent = brand.city;
  });
  document.querySelectorAll("[data-brand-regions]").forEach((el) => {
    el.textContent = brand.regions;
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach((el) => {
    el.href = `https://wa.me/${brand.whatsapp}`;
  });
}

function formatDate(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(value));
}

function statusLabel(status) {
  return {
    NOVO: "Novo",
    CONTATO: "Em contato",
    ORCAMENTO: "Orcamento",
    NEGOCIACAO: "Negociacao",
    FECHADO: "Fechado",
    PERDIDO: "Perdido"
  }[status] || status;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

document.addEventListener("DOMContentLoaded", setBranding);
