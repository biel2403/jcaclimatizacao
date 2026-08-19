function getApiBaseUrl() {
  let storedUrl = "";

  try {
    storedUrl = localStorage.getItem("JCA_API_BASE_URL") || "";
  } catch (_error) {
    storedUrl = "";
  }

  const configuredUrl = window.JCA_API_BASE_URL || storedUrl;
  if (configuredUrl) return configuredUrl;

  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.protocol === "file:";

  return isLocal ? "http://localhost:3001" : "https://jca-climatizacao-api.onrender.com";
}

window.JCA_CONFIG = {
  apiBaseUrl: getApiBaseUrl(),
  brand: {
    name: "JCA Climatização",
    description: "Instalação, manutenção, higienização, limpeza e reparo de ar-condicionado.",
    phone: "(15) 99629-9888",
    whatsapp: "5515996299888",
    email: "jcaclimatizacao@gmail.com",
    city: "Sorocaba - SP",
    regions: "Centro, Zona Leste, Zona Norte e regiões próximas",
    instagram: "@jcaclimatizacao_2026"
  }
};
