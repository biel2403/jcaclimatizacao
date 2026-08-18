const test = require("node:test");
const assert = require("node:assert/strict");
const { getSessionCookieOptions } = require("../backend/src/config/sessionCookie");

test("cookie de sessão usa SameSite none e secure em produção", () => {
  const originalEnv = { ...process.env };
  process.env.NODE_ENV = "production";

  const options = getSessionCookieOptions();

  assert.equal(options.sameSite, "none");
  assert.equal(options.secure, true);
  process.env = originalEnv;
});

test("cookie de sessão usa lax em desenvolvimento", () => {
  const originalEnv = { ...process.env };
  process.env.NODE_ENV = "development";

  const options = getSessionCookieOptions();

  assert.equal(options.sameSite, "lax");
  assert.equal(options.secure, false);
  process.env = originalEnv;
});
