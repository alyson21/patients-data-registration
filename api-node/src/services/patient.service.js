const patientRepository = require('../repositories/patient.repository');
const AppError = require('../utils/AppError');

async function list() {
  return patientRepository.findAll();
}

async function create({ name, age }, userId) {
  return patientRepository.create({ name, age, userId });
}

async function update(id, { name, age }) {
  const patient = await patientRepository.update(id, { name, age });
  if (!patient) throw new AppError('Paciente não encontrado', 404);
  return patient;
}

async function remove(id) {
  const deleted = await patientRepository.remove(id);
  if (!deleted) throw new AppError('Paciente não encontrado', 404);
}

module.exports = { list, create, update, remove };
