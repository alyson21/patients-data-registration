const userRepository = require('../repositories/user.repository');
const AppError = require('../utils/AppError');

async function list() {
  return userRepository.findAll();
}

async function remove(id, requesterId) {
  if (id === requesterId) throw new AppError('Não é possível remover o próprio usuário', 400);
  const deleted = await userRepository.remove(id);
  if (!deleted) throw new AppError('Usuário não encontrado', 404);
}

module.exports = { list, remove };
