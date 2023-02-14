const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { signupValidation, loginValidation } = require("../validations/user");

router.put("/signup", signupValidation, authController.signup);

router.post("/login", authController.login);
module.exports = router;
