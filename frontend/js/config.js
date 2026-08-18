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
    name: "JCA Climatizacao",
    description: "Instalacao, manutencao, higienizacao, limpeza e reparo de ar-condicionado.",
    phone: "(11) 99999-9999",
    whatsapp: "5511999999999",
    email: "contato@jcaclimatizacao.com.br",
    city: "Sao Paulo - SP",
    regions: "Centro, Zona Leste, Zona Norte e regioes proximas",
    instagram: "@jcaclimatizacao"
  }
};
