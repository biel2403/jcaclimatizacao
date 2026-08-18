const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { leadCreateLimiter } = require("../middleware/rateLimit");
const {
  createLeadController,
  getLeadController,
  listLeadsController,
  updateNotesController,
  updateStatusController
} = require("../controllers/leadController");

const router = express.Router();

router.post("/", leadCreateLimiter, createLeadController);
router.get("/", requireAuth, listLeadsController);
router.get("/:id", requireAuth, getLeadController);
router.patch("/:id/status", requireAuth, updateStatusController);
router.patch("/:id/notes", requireAuth, updateNotesController);

module.exports = router;
