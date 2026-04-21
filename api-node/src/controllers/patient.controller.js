const patientService = require('../services/patient.service');

async function list(req, res) {
  const patients = await patientService.list();
  res.json(patients);
}

async function create(req, res) {
  const { name, age } = req.body;
  const patient = await patientService.create({ name, age }, req.user.id);
  res.status(201).json(patient);
}

async function update(req, res) {
  const { name, age } = req.body;
  const patient = await patientService.update(req.params.id, { name, age });
  res.json(patient);
}

async function remove(req, res) {
  await patientService.remove(req.params.id);
  res.status(204).send();
}

module.exports = { list, create, update, remove };
