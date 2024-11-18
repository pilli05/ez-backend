const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.login);
router.get("/verify-email/:verification_code", AuthController.verifyEmail);

module.exports = router;
