const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const path = require("node:path");
const { pool } = require("./database/pool");
const { apiLimiter } = require("./middleware/rateLimit");
const { errorHandler } = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

function createApp() {
  const app = express();
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  app.set("trust proxy", 1);
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || origin === frontendUrl) {
          return callback(null, true);
        }

        return callback(new Error("Origem nao autorizada por CORS."));
      },
      credentials: true
    })
  );
  app.use(express.json({ limit: "32kb" }));
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: "user_sessions",
        createTableIfMissing: true
      }),
      name: "jca.sid",
      secret: process.env.SESSION_SECRET || "dev-secret-change-me",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 8
      }
    })
  );

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api", apiLimiter);
  app.use("/api/auth", authRoutes);
  app.use("/api/leads", leadRoutes);
  app.use("/api/dashboard", dashboardRoutes);

  if (process.env.SERVE_FRONTEND === "true") {
    app.use(express.static(path.join(__dirname, "../../frontend")));
  }

  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
