const { AppError } = require("../utils/AppError");

function requireAuth(req, _res, next) {
  if (!req.session.user) {
    return next(new AppError("Login necessario.", 401, "UNAUTHORIZED"));
  }

  return next();
}

module.exports = { requireAuth };
