import { useState, useEffect } from 'react';
import { getPatients, createPatient, updatePatient, deletePatient } from '../services/api';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');

  async function fetchPatients() {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => { fetchPatients(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createPatient({ name, age: Number(age) });
      setName('');
      setAge('');
      await fetchPatients();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(patient) {
    setEditingId(patient.id);
    setEditName(patient.name);
    setEditAge(String(patient.age));
    setError('');
  }

  function cancelEdit() {
    setEditingId(null);
    setError('');
  }

  async function handleUpdate(id) {
    setError('');
    setLoading(true);
    try {
      await updatePatient(id, { name: editName, age: Number(editAge) });
      setEditingId(null);
      await fetchPatients();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Remover paciente?')) return;
    setError('');
    try {
      await deletePatient(id);
      await fetchPatients();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <h2>Pacientes</h2>
          <span className="text-sm text-gray-400">{patients.length} cadastrado{patients.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Formulário de criação */}
        <div className="card">
          <h3 className="mb-4">Novo paciente</h3>
          <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
            <div className="form-group flex-1">
              <label className="form-label">Nome</label>
              <input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="form-group w-full sm:w-28">
              <label className="form-label">Idade</label>
              <input
                type="number"
                placeholder="Ex: 34"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input"
                min={1}
                required
              />
            </div>
            <div className="flex items-end">
              <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
                {loading ? 'Salvando...' : 'Adicionar'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-3 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
              <p className="form-error">{error}</p>
            </div>
          )}
        </div>

        {/* Tabela */}
        <div className="card p-0 overflow-hidden">
          {patients.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-12">Nenhum paciente cadastrado.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Cadastrado em</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p) =>
                    editingId === p.id ? (
                      <tr key={p.id}>
                        <td>
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="input py-1.5"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editAge}
                            onChange={(e) => setEditAge(e.target.value)}
                            className="input py-1.5 w-20"
                            min={1}
                          />
                        </td>
                        <td className="text-gray-400">
                          {new Date(p.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td>
                          <div className="flex gap-2 justify-end">
                            <button onClick={() => handleUpdate(p.id)} disabled={loading} className="btn-primary py-1.5 px-3 text-xs">
                              Salvar
                            </button>
                            <button onClick={cancelEdit} className="btn-secondary py-1.5 px-3 text-xs">
                              Cancelar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr key={p.id}>
                        <td className="font-medium text-gray-900">{p.name}</td>
                        <td>{p.age} anos</td>
                        <td className="text-gray-400">
                          {new Date(p.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td>
                          <div className="flex gap-2 justify-end">
                            <button onClick={() => startEdit(p)} className="btn-secondary py-1.5 px-3 text-xs">
                              Editar
                            </button>
                            <button onClick={() => handleDelete(p.id)} className="btn-danger py-1.5 px-3 text-xs">
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

    </div>
  );
}
