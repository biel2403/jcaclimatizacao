const test = require("node:test");
const assert = require("node:assert/strict");
const { buildWhatsappLink, onlyDigits } = require("../backend/src/utils/whatsapp");

test("remove caracteres nao numericos do telefone", () => {
  assert.equal(onlyDigits("(11) 99999-0000"), "11999990000");
});

test("gera link do WhatsApp com mensagem", () => {
  const link = buildWhatsappLink("(11) 99999-0000", "Mariana", "Higienizacao");

  assert.ok(link.startsWith("https://wa.me/11999990000?text="));
  assert.ok(decodeURIComponent(link).includes("Mariana"));
  assert.ok(decodeURIComponent(link).includes("Higienizacao"));
});
