const test = require("node:test");
const assert = require("node:assert/strict");
const { requireAuth } = require("../backend/src/middleware/auth");

test("protege rotas administrativas sem sessao", () => {
  const req = { session: {} };
  const next = (error) => {
    assert.equal(error.statusCode, 401);
    assert.equal(error.code, "UNAUTHORIZED");
  };

  requireAuth(req, {}, next);
});

test("permite rotas administrativas com sessao", () => {
  const req = { session: { user: { id: 1 } } };
  let called = false;

  requireAuth(req, {}, () => {
    called = true;
  });

  assert.equal(called, true);
});
