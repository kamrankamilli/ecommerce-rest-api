const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");
const { statusValidation } = require("../validations/user");

router.get("/status", isAuth, userController.getStatus);
router.put("/status", isAuth, statusValidation, userController.updateStatus);

module.exports = router;
