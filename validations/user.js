const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.signupValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter valid email.")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("E-mail address already exists!");
        }
      });
    })
    .normalizeEmail(),
  body("password").trim().isLength({ min: 6 }),
  body("name").trim().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    next();
  },
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Please enter valid email."),
  body("password").trim().notEmpty().withMessage("Please enter your password."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    next();
  },
];

exports.statusValidation = [
  body("status").notEmpty().withMessage("Please enter a status."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    next();
  },
];
