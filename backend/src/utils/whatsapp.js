function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function buildWhatsappLink(phone, name, serviceType) {
  const text = `Olá, ${name}! Recebi sua solicitação de orçamento para ${serviceType}. Gostaria de conversar sobre o serviço.`;
  return `https://wa.me/${onlyDigits(phone)}?text=${encodeURIComponent(text)}`;
}

module.exports = { buildWhatsappLink, onlyDigits };
