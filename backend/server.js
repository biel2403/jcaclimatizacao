require("dotenv").config();

const { createApp } = require("./src/app");
const { migrateDatabase } = require("./src/database/migrate");
const { ensureAdminUser } = require("./src/services/authService");

const port = process.env.PORT || 3001;
const app = createApp();

async function bootstrap() {
  await migrateDatabase();
  await ensureAdminUser();
}

bootstrap()
  .then(() => {
    app.listen(port, () => {
      console.log(`JCA Climatização CRM API rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Bootstrap inicial falhou:", error.message);
    process.exit(1);
  });
