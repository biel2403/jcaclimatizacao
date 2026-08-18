const {
  createLead,
  getLeadById,
  listLeads,
  updateLeadNotes,
  updateLeadStatus
} = require("../services/leadService");
const { validateLeadInput } = require("../utils/validators");
const { buildWhatsappLink } = require("../utils/whatsapp");
const { AppError } = require("../utils/AppError");

async function createLeadController(req, res, next) {
  try {
    const parsed = validateLeadInput(req.body);

    if (parsed.spam) {
      return res.status(201).json({ ok: true });
    }

    if (parsed.errors.length) {
      throw new AppError(parsed.errors[0], 400, "VALIDATION_ERROR");
    }

    const lead = await createLead(parsed.data);
    res.status(201).json({ lead });
  } catch (error) {
    next(error);
  }
}

async function listLeadsController(req, res, next) {
  try {
    const leads = await listLeads(req.query);
    res.json({ leads });
  } catch (error) {
    next(error);
  }
}

async function getLeadController(req, res, next) {
  try {
    const lead = await getLeadById(req.params.id);
    res.json({
      lead: {
        ...lead,
        whatsappLink: buildWhatsappLink(lead.phone, lead.name, lead.serviceType)
      }
    });
  } catch (error) {
    next(error);
  }
}

async function updateStatusController(req, res, next) {
  try {
    const lead = await updateLeadStatus(req.params.id, req.body.status);
    res.json({ lead });
  } catch (error) {
    next(error);
  }
}

async function updateNotesController(req, res, next) {
  try {
    const lead = await updateLeadNotes(req.params.id, req.body.internalNotes);
    res.json({ lead });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createLeadController,
  listLeadsController,
  getLeadController,
  updateStatusController,
  updateNotesController
};
