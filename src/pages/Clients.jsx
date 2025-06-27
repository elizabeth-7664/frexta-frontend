import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await API.get('/api/clients');
      setClients(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch clients.');
      console.error('Error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/api/clients', form);
      setClients([...clients, res.data]);
      setForm({ name: '', email: '', phone: '', company: '' });
      setError('Client added successfully!');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error adding client.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    try {
      await API.delete(`/api/clients/${id}`);
      setClients(clients.filter((client) => client.id !== id));
      setError('Client deleted successfully!');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error deleting client.');
      console.error('Error:', err);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/dashboard" className="text-blue-600 hover:underline">Back to Dashboard</Link>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Clients</h2>
        {error && (
          <p className={error.includes('successfully') ? 'text-green-600 mb-4' : 'text-red-500 mb-4'}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="mt-1 w-full p-2 border rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Client'}
          </button>
        </form>
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 p-2 border rounded-md w-full md:w-1/2"
        />
        {filteredClients.length === 0 ? (
          <p className="text-gray-600">No clients found.</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Phone</th>
                  <th className="py-2 px-4 text-left">Company</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-t">
                    <td className="py-2 px-4">{client.name}</td>
                    <td className="py-2 px-4">{client.email}</td>
                    <td className="py-2 px-4">{client.phone || 'N/A'}</td>
                    <td className="py-2 px-4">{client.company || 'N/A'}</td>
                    <td className="py-2 px-4 space-x-2">
                      <Link to={`/clients/${client.id}`} className="text-blue-600 hover:underline">
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
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
};

export default Clients;