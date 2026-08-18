require("dotenv").config();

const { pool } = require("../backend/src/database/pool");
const { migrateDatabase } = require("../backend/src/database/migrate");

async function migrate() {
  try {
    await migrateDatabase();
    console.log("Schema aplicado com sucesso.");
  } finally {
    await pool.end();
  }
}

migrate().catch((error) => {
  console.error("Falha ao aplicar schema:", error.message);
  process.exit(1);
});
