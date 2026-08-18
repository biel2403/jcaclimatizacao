const { login } = require("../services/authService");
const { AppError } = require("../utils/AppError");
const { getSessionCookieOptions } = require("../config/sessionCookie");

async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Informe email e senha.", 400, "VALIDATION_ERROR");
    }

    const user = await login(email, password);
    req.session.user = user;
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

function logoutController(req, res, next) {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie("jca.sid", getSessionCookieOptions());
    return res.json({ ok: true });
  });
}

function meController(req, res) {
  res.json({ user: req.session.user || null });
}

module.exports = { loginController, logoutController, meController };
