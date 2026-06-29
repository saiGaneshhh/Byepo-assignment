const express = require("express");
const router = express.Router();

const {
  superAdminLogin,
  adminSignup,
  adminLogin,
} = require("../controllers/authController");

router.post("/super-admin/login", superAdminLogin);
router.post("/signup", adminSignup);
router.post("/admin/login", adminLogin);

module.exports = router;