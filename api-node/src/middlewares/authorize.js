const AppError = require('../utils/AppError');

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) throw new AppError('Não autenticado', 401);
    if (!roles.includes(req.user.role)) throw new AppError('Acesso negado', 403);
    next();
  };
}

module.exports = authorize;
