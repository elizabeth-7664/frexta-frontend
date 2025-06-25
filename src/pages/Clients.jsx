// src/pages/Clients.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Clients = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await API.get('/clients');
      setClients(res.data);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await API.post('/clients', form);
      setClients([...clients, res.data]);
      setForm({ name: '', email: '', phone: '' });
      setMessage('Client added successfully!');
    } catch (err) {
      setMessage('Error adding client');
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Clients</h2>

      {/* Add New Client */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={form.name}
          onChange={handleChange}
          className="block w-full border p-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="block w-full border p-2"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="block w-full border p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Client'}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search clients..."
        className="mb-4 p-2 border w-full md:w-1/2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Clients Table */}
      {filteredClients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td className="py-2 px-4 border-b">{client.name}</td>
                <td className="py-2 px-4 border-b">{client.email}</td>
                <td className="py-2 px-4 border-b">{client.phone}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/clients/${client.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Clients;
