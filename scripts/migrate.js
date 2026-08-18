require("dotenv").config();

const fs = require("node:fs/promises");
const path = require("node:path");
const { Pool } = require("pg");

async function migrate() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL nao configurada.");
  }

  const schemaPath = path.join(__dirname, "../database/schema.sql");
  const schema = await fs.readFile(schemaPath, "utf8");
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false
  });

  try {
    await pool.query(schema);
    console.log("Schema aplicado com sucesso.");
  } finally {
    await pool.end();
  }
}

migrate().catch((error) => {
  console.error("Falha ao aplicar schema:", error.message);
  process.exit(1);
});
