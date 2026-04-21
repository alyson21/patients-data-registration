const AppError = require('../utils/AppError');

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues[0].message;
      throw new AppError(message, 400);
    }
    req.body = result.data;
    next();
  };
}

module.exports = validate;
