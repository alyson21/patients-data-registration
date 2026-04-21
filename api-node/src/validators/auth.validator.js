const { z } = require('zod');

const register = z.object({
  name: z.string({ required_error: 'name é obrigatório' }).min(2, 'name deve ter ao menos 2 caracteres'),
  email: z.string({ required_error: 'email é obrigatório' }).email('email inválido'),
  password: z.string({ required_error: 'password é obrigatório' }).min(6, 'password deve ter ao menos 6 caracteres'),
});

const login = z.object({
  email: z.string({ required_error: 'email é obrigatório' }).email('email inválido'),
  password: z.string({ required_error: 'password é obrigatório' }).min(1, 'password é obrigatório'),
});

module.exports = { register, login };
