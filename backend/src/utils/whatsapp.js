function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function buildWhatsappLink(phone, name, serviceType) {
  const text = `Ola, ${name}! Recebi sua solicitacao de orcamento para ${serviceType}. Gostaria de conversar sobre o servico.`;
  return `https://wa.me/${onlyDigits(phone)}?text=${encodeURIComponent(text)}`;
}

module.exports = { buildWhatsappLink, onlyDigits };
