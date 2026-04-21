const authService = require('../services/auth.service');

async function register(req, res) {
  const { name, email, password } = req.body;
  const result = await authService.register({ name, email, password });
  res.status(201).json(result);
}

async function login(req, res) {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  res.json(result);
}

function me(req, res) {
  res.json({ user: req.user });
}

module.exports = { register, login, me };
