const userService = require('../services/user.service');

async function list(req, res) {
  const users = await userService.list();
  res.json(users);
}

async function remove(req, res) {
  await userService.remove(req.params.id, req.user.id);
  res.status(204).send();
}

module.exports = { list, remove };
