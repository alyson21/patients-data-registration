const AppError = require('../utils/AppError');
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({ status: 'error', message: err.message });
  console.error(err);
  return res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
}
module.exports = errorHandler;
