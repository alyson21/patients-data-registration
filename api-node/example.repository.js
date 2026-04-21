class ExampleRepository {
  async findAll()        { return []; }
  async findById(id)     { return null; }
  async create(data)     { return { id: 1, ...data }; }
  async update(id, data) { return { id, ...data }; }
  async remove(id)       { return true; }
}
module.exports = ExampleRepository;
