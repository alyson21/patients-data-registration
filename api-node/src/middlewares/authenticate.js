const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/auth');
const userRepository = require('../repositories/user.repository');
const AppError = require('../utils/AppError');

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Token não fornecido', 401);
  }

  const token = authHeader.slice(7);

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    throw new AppError('Token inválido ou expirado', 401);
  }

  const user = await userRepository.findById(payload.sub);
  if (!user) throw new AppError('Usuário não encontrado', 401);

  req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
  next();
}

module.exports = authenticate;
