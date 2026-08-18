const test = require("node:test");
const assert = require("node:assert/strict");
const { validateLeadInput, validateStatus } = require("../backend/src/utils/validators");

test("valida lead valido", () => {
  const result = validateLeadInput({
    name: "Mariana",
    phone: "(11) 99999-0000",
    serviceType: "Higienização e limpeza",
    email: "mariana@example.com",
    quantity: "1"
  });

  assert.equal(result.errors.length, 0);
  assert.equal(result.data.phone, "11999990000");
  assert.equal(result.data.serviceType, "Higienização e limpeza");
});

test("normaliza servico sem acento", () => {
  const result = validateLeadInput({
    name: "Mariana",
    phone: "(11) 99999-0000",
    serviceType: "Instalacao"
  });

  assert.equal(result.errors.length, 0);
  assert.equal(result.data.serviceType, "Instalação");
});

test("rejeita lead sem campos obrigatorios", () => {
  const result = validateLeadInput({});
  assert.ok(result.errors.length >= 3);
});

test("detecta honeypot", () => {
  const result = validateLeadInput({ companyWebsite: "spam.example" });
  assert.equal(result.spam, true);
});

test("valida status permitido", () => {
  assert.equal(validateStatus("NOVO"), true);
  assert.equal(validateStatus("INVALIDO"), false);
});
