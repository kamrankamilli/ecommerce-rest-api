const { body, validationResult } = require("express-validator");

exports.validatePosts = [
  body("title").trim().isLength({ min: 5 }),
  body("content").trim().isLength({ min: 5 }),
  (req, res, next) => {
    const errors = validationResult(req, res, next);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.statusCode = 422;
      throw error;
    }
    next();
  },
];
