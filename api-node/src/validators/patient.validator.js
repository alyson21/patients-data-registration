const { z } = require('zod');

const create = z.object({
  name: z.string({ required_error: 'name é obrigatório' }).min(2, 'name deve ter ao menos 2 caracteres'),
  age: z
    .number({ required_error: 'age é obrigatório', invalid_type_error: 'age deve ser um número' })
    .int('age deve ser inteiro')
    .positive('age deve ser positivo'),
});

const update = create;

module.exports = { create, update };
