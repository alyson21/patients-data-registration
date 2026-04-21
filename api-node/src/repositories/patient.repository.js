const pool = require('../config/database');

async function findAll() {
  const { rows } = await pool.query(
    'SELECT id, name, age, created_at, user_id FROM patients ORDER BY created_at DESC'
  );
  return rows;
}

async function create({ name, age, userId }) {
  const { rows } = await pool.query(
    'INSERT INTO patients (name, age, user_id) VALUES ($1, $2, $3) RETURNING *',
    [name, age, userId]
  );
  return rows[0];
}

async function update(id, { name, age }) {
  const { rows } = await pool.query(
    'UPDATE patients SET name = $1, age = $2 WHERE id = $3 RETURNING *',
    [name, age, id]
  );
  return rows[0] || null;
}

async function remove(id) {
  const { rowCount } = await pool.query('DELETE FROM patients WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { findAll, create, update, remove };
