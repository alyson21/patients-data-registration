const AppError = require('../utils/AppError');
const logger = require('../utils/logger');
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({ status: 'error', message: err.message });
  logger.error('unhandled_error', { message: err.message, stack: err.stack, route: req.originalUrl, method: req.method });
  return res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
}
module.exports = errorHandler;
