const { body, validationResult } = require("express-validator");

// Common middleware to send validation errors
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};


// USER REGISTER VALIDATION

const registerValidation = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  handleValidation
];

// USER LOGIN VALIDATION

const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidation
];


// TASK CREATE / UPDATE VALIDATION

const taskCreateValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be pending, in-progress, or completed"),

  handleValidation
];

module.exports = {
  registerValidation,
  loginValidation,
  taskCreateValidation
};
