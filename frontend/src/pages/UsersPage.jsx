import { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';

const roleBadge = {
  admin: 'bg-blue-100 text-blue-700',
  user:  'bg-gray-100 text-gray-600',
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;

  async function fetchUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => { fetchUsers(); }, []);

  async function handleDelete(id) {
    if (!window.confirm('Remover usuário?')) return;
    setError('');
    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2>Usuários</h2>
        <span className="text-sm text-gray-400">{users.length} cadastrado{users.length !== 1 ? 's' : ''}</span>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
          <p className="form-error">{error}</p>
        </div>
      )}

      <div className="card p-0 overflow-hidden">
        {users.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-12">Nenhum usuário encontrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="font-medium text-gray-900">{u.name}</td>
                    <td className="text-gray-500">{u.email}</td>
                    <td>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${roleBadge[u.role] ?? roleBadge.user}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      {u.id !== currentUserId && (
                        <div className="flex justify-end">
                          <button onClick={() => handleDelete(u.id)} className="btn-danger py-1.5 px-3 text-xs">
                            Excluir
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
