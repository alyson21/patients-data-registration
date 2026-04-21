const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro na requisição');
  return data;
}

export function register(name, email, password) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export function login(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function getPatients() {
  return request('/patients');
}

export function createPatient(data) {
  return request('/patients', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updatePatient(id, data) {
  return request(`/patients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deletePatient(id) {
  return request(`/patients/${id}`, { method: 'DELETE' });
}

export function getUsers() {
  return request('/users');
}

export function deleteUser(id) {
  return request(`/users/${id}`, { method: 'DELETE' });
}
