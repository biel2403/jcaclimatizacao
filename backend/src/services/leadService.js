const { pool } = require("../database/pool");
const { AppError } = require("../utils/AppError");
const { validateStatus, cleanText } = require("../utils/validators");

function mapLead(row, includeInternal = true) {
  const lead = {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    city: row.city,
    neighborhood: row.neighborhood,
    serviceType: row.service_type,
    equipmentType: row.equipment_type,
    brand: row.brand,
    btus: row.btus,
    quantity: row.quantity,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };

  if (includeInternal) {
    lead.internalNotes = row.internal_notes;
  }

  return lead;
}

async function createLead(input) {
  const result = await pool.query(
    `INSERT INTO leads (
      name, phone, email, city, neighborhood, service_type,
      equipment_type, brand, btus, quantity, description
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *`,
    [
      input.name,
      input.phone,
      input.email,
      input.city,
      input.neighborhood,
      input.serviceType,
      input.equipmentType,
      input.brand,
      input.btus,
      input.quantity,
      input.description
    ]
  );

  return mapLead(result.rows[0], false);
}

async function listLeads({ q, status, sort = "desc" }) {
  const values = [];
  const where = [];

  if (q) {
    values.push(`%${q.trim()}%`);
    where.push(`(name ILIKE $${values.length} OR phone ILIKE $${values.length})`);
  }

  if (status && validateStatus(status)) {
    values.push(status);
    where.push(`status = $${values.length}`);
  }

  const order = sort === "asc" ? "ASC" : "DESC";
  const result = await pool.query(
    `SELECT * FROM leads
     ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
     ORDER BY created_at ${order}
     LIMIT 200`,
    values
  );

  return result.rows.map((row) => mapLead(row));
}

async function getLeadById(id) {
  const result = await pool.query("SELECT * FROM leads WHERE id = $1", [id]);
  const lead = result.rows[0];

  if (!lead) {
    throw new AppError("Lead nao encontrado.", 404, "LEAD_NOT_FOUND");
  }

  return mapLead(lead);
}

async function updateLeadStatus(id, status) {
  if (!validateStatus(status)) {
    throw new AppError("Status inválido.", 400, "INVALID_STATUS");
  }

  const result = await pool.query(
    `UPDATE leads SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );

  if (!result.rows[0]) {
    throw new AppError("Lead nao encontrado.", 404, "LEAD_NOT_FOUND");
  }

  return mapLead(result.rows[0]);
}

async function updateLeadNotes(id, notes) {
  const result = await pool.query(
    `UPDATE leads SET internal_notes = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [cleanText(notes, 2000), id]
  );

  if (!result.rows[0]) {
    throw new AppError("Lead nao encontrado.", 404, "LEAD_NOT_FOUND");
  }

  return mapLead(result.rows[0]);
}

module.exports = {
  createLead,
  listLeads,
  getLeadById,
  updateLeadStatus,
  updateLeadNotes
};
