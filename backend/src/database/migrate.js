const fs = require("node:fs/promises");
const path = require("node:path");
const { pool } = require("./pool");

async function migrateDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL nao configurada.");
  }

  const schemaPath = path.join(__dirname, "../../../database/schema.sql");
  const schema = await fs.readFile(schemaPath, "utf8");
  await pool.query(schema);
}

module.exports = { migrateDatabase };
