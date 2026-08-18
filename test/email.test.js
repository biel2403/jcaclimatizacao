const test = require("node:test");
const assert = require("node:assert/strict");
const { buildLeadEmail, isEmailEnabled } = require("../backend/src/services/emailService");

test("email de novo lead inclui dados principais", () => {
  const email = buildLeadEmail({
    name: "Mariana Souza",
    phone: "11999990000",
    serviceType: "Higienização e limpeza",
    city: "São Paulo",
    neighborhood: "Centro",
    email: "mariana@example.com",
    equipmentType: "Split",
    brand: "LG",
    btus: "12000",
    quantity: 1,
    description: "Preciso higienizar o aparelho da sala."
  });

  assert.match(email.subject, /Novo lead/);
  assert.match(email.text, /Mariana Souza/);
  assert.match(email.text, /Higienização e limpeza/);
  assert.match(email.html, /Conversar pelo WhatsApp/);
});

test("email fica desativado sem SMTP completo", () => {
  const originalEnv = { ...process.env };
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_PORT;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  delete process.env.MAIL_FROM;
  delete process.env.LEAD_NOTIFICATION_EMAIL;

  assert.equal(isEmailEnabled(), false);
  process.env = originalEnv;
});
