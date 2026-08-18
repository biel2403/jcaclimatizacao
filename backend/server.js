require("dotenv").config();

const { createApp } = require("./src/app");
const { ensureAdminUser } = require("./src/services/authService");

const port = process.env.PORT || 3001;
const app = createApp();

ensureAdminUser()
  .catch((error) => {
    console.warn("Admin inicial nao foi criado:", error.message);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`ClimaPro CRM API rodando em http://localhost:${port}`);
    });
  });
