import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'In Progress', client_id: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

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
    setMessage('');
    try {
      const res = await API.post('/projects', form);
      setProjects([...projects, res.data]);
      setForm({ title: '', description: '', status: 'In Progress', client_id: '' });
      setMessage('Project added!');
    } catch (err) {
      setMessage('Error adding project.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      {/* Add Project Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-white p-4 rounded shadow">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
        >
          <option>In Progress</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
        <select
          name="client_id"
          value={form.client_id}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
          required
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Add Project
        </button>
        {message && <p className="text-sm mt-2 text-green-600">{message}</p>}
      </form>

      {/* Projects List */}
      {projects.length === 0 ? (
        <p className="text-gray-600">No projects found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Status: <span className="font-medium">{project.status}</span>
              </p>
              <p className="text-gray-700">{project.description}</p>
              {project.client_name && (
                <p className="mt-2 text-sm text-gray-500">Client: {project.client_name}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
