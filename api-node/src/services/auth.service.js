const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/auth');
const AppError = require('../utils/AppError');

function generateToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

async function register({ name, email, password }) {
  if (await userRepository.findByEmail(email)) {
    throw new AppError('E-mail já cadastrado', 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userRepository.create({ name, email, passwordHash });
  const token = generateToken(user);

  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

async function login({ email, password }) {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new AppError('Credenciais inválidas', 401);

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new AppError('Credenciais inválidas', 401);

  const token = generateToken(user);
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

module.exports = { register, login };
