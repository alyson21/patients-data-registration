const pool = require('../config/database');

function toUser(row) {
  return { id: row.id, name: row.name, email: row.email, role: row.role, passwordHash: row.password };
}

async function findByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0] ? toUser(rows[0]) : null;
}

async function findById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0] ? toUser(rows[0]) : null;
}

async function create({ name, email, passwordHash }) {
  const { rows } = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, passwordHash]
  );
  return toUser(rows[0]);
}

async function findAll() {
  const { rows } = await pool.query(
    'SELECT id, name, email, role FROM users ORDER BY name ASC'
  );
  return rows;
}

async function remove(id) {
  const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { findByEmail, findById, create, findAll, remove };
