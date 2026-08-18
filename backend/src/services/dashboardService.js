const { pool } = require("../database/pool");
const { mapStatusLabel } = require("../utils/status");

async function getDashboard() {
  const countsResult = await pool.query(
    "SELECT status, COUNT(*)::int AS total FROM leads GROUP BY status"
  );
  const recentResult = await pool.query(
    `SELECT id, name, service_type, status, created_at
     FROM leads
     ORDER BY created_at DESC
     LIMIT 8`
  );

  const counts = {
    NOVO: 0,
    CONTATO: 0,
    ORCAMENTO: 0,
    NEGOCIACAO: 0,
    FECHADO: 0,
    PERDIDO: 0
  };

  for (const row of countsResult.rows) {
    counts[row.status] = row.total;
  }

  return {
    counts,
    labels: Object.fromEntries(
      Object.keys(counts).map((status) => [status, mapStatusLabel(status)])
    ),
    recent: recentResult.rows.map((row) => ({
      id: row.id,
      name: row.name,
      serviceType: row.service_type,
      status: row.status,
      createdAt: row.created_at
    }))
  };
}

module.exports = { getDashboard };
