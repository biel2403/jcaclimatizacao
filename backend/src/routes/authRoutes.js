const express = require("express");
const {
  loginController,
  logoutController,
  meController
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", meController);

module.exports = router;
