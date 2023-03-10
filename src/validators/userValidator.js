const { body, validationResult, check } = require("express-validator");
const userValidationRules = () => {
  return [
    check("username")
      .notEmpty()
      .withMessage("username is required")
      .not()
      .custom((val) => /[^A-za-z0-9\s]/g.test(val))
      .withMessage("Username not use uniq characters"),

    check("email").isEmail().notEmpty().withMessage("email is required").not(),

    check("password")
      .notEmpty()
      .withMessage("password is required")
      .not()
      .custom((val) => /[^A-za-z0-9\s]/g.test(val))
      .withMessage("password not use uniq characters"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
