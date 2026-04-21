require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../src/config/database');

const [,, name, email, password] = process.argv;

if (!name || !email || !password) {
  console.error('Uso: node scripts/create-admin.js <nome> <email> <senha>');
  process.exit(1);
}

async function main() {
  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    console.error(`Erro: já existe um usuário com o e-mail "${email}"`);
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, email, passwordHash, 'admin']
  );

  console.log('Admin criado com sucesso:');
  console.log(rows[0]);
  process.exit(0);
}

main().catch((err) => {
  console.error('Erro:', err.message);
  process.exit(1);
});
