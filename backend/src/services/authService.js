const bcrypt = require("bcryptjs");
const { pool } = require("../database/pool");
const { AppError } = require("../utils/AppError");

async function ensureAdminUser() {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return;

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

  await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     ON CONFLICT (email)
     DO UPDATE SET name = EXCLUDED.name, password_hash = EXCLUDED.password_hash, updated_at = NOW()`,
    [
      process.env.ADMIN_NAME || "Administrador",
      process.env.ADMIN_EMAIL.toLowerCase(),
      passwordHash
    ]
  );
}

async function login(email, password) {
  const result = await pool.query(
    "SELECT id, name, email, password_hash FROM users WHERE email = $1",
    [String(email || "").trim().toLowerCase()]
  );
  const user = result.rows[0];

  if (!user) {
    throw new AppError("Email ou senha invalidos.", 401, "INVALID_LOGIN");
  }

  const matches = await bcrypt.compare(password || "", user.password_hash);

  if (!matches) {
    throw new AppError("Email ou senha invalidos.", 401, "INVALID_LOGIN");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

module.exports = { ensureAdminUser, login };
