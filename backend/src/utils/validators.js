const VALID_STATUSES = [
  "NOVO",
  "CONTATO",
  "ORCAMENTO",
  "NEGOCIACAO",
  "FECHADO",
  "PERDIDO"
];

const VALID_SERVICES = [
  "Instalacao",
  "Manutencao",
  "Higienizacao",
  "Limpeza",
  "Reparo",
  "Outro"
];

function cleanText(value, maxLength) {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  if (!text) return null;
  return text.slice(0, maxLength);
}

function cleanPhone(value) {
  return cleanText(value, 30)?.replace(/[^\d+]/g, "") || null;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateLeadInput(body) {
  const honeypot = cleanText(body.companyWebsite, 120);
  if (honeypot) {
    return { spam: true };
  }

  const name = cleanText(body.name, 120);
  const phone = cleanPhone(body.phone);
  const email = cleanText(body.email, 180);
  const serviceType = cleanText(body.serviceType, 40);
  const quantity = Number(body.quantity || 1);
  const description = cleanText(body.description, 1000);

  const errors = [];

  if (!name || name.length < 2) errors.push("Informe seu nome.");
  if (!phone || phone.length < 10) errors.push("Informe um WhatsApp valido.");
  if (!serviceType || !VALID_SERVICES.includes(serviceType)) {
    errors.push("Informe o servico desejado.");
  }
  if (email && !isEmail(email)) errors.push("Informe um email valido.");
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
    errors.push("Informe uma quantidade valida.");
  }
  if (description && description.length > 1000) {
    errors.push("Descricao muito longa.");
  }

  return {
    errors,
    data: {
      name,
      phone,
      email,
      city: cleanText(body.city, 100),
      neighborhood: cleanText(body.neighborhood, 100),
      serviceType,
      equipmentType: cleanText(body.equipmentType, 80),
      brand: cleanText(body.brand, 80),
      btus: cleanText(body.btus, 40),
      quantity,
      description
    }
  };
}

function validateStatus(status) {
  return VALID_STATUSES.includes(status);
}

module.exports = {
  VALID_STATUSES,
  VALID_SERVICES,
  cleanText,
  validateLeadInput,
  validateStatus
};
