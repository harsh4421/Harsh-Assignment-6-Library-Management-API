const { validationResult } = require('express-validator');

function validate(rules) {
  return async (req, res, next) => {
    await Promise.all(rules.map((rule) => rule.run(req)));
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed.',
        errors: result.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }
    next();
  };
}
module.exports = { validate };
