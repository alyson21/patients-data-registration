const ExampleService = require('../services/example.service');
class ExampleController {
  constructor() { this.service = new ExampleService(); }
  async findAll(req, res)  { return res.json(await this.service.findAll()); }
  async findById(req, res) { return res.json(await this.service.findById(req.params.id)); }
  async create(req, res)   { return res.status(201).json(await this.service.create(req.body)); }
  async update(req, res)   { return res.json(await this.service.update(req.params.id, req.body)); }
  async remove(req, res)   { await this.service.remove(req.params.id); return res.status(204).send(); }
}
module.exports = ExampleController;
