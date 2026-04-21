const ExampleRepository = require('../repositories/example.repository');
const AppError = require('../utils/AppError');
class ExampleService {
  constructor() { this.repository = new ExampleRepository(); }
  async findAll() { return this.repository.findAll(); }
  async findById(id) {
    const record = await this.repository.findById(id);
    if (!record) throw new AppError('Registro não encontrado', 404);
    return record;
  }
  async create(data) { return this.repository.create(data); }
  async update(id, data) { await this.findById(id); return this.repository.update(id, data); }
  async remove(id) { await this.findById(id); return this.repository.remove(id); }
}
module.exports = ExampleService;
