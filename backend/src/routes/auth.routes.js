const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.registerController);

router.post("/login", authController.loginController);

router.get("/logout", authController.logoutController);

module.exports = router;
