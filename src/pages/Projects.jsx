import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';

const Projects = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [clientId, setClientId] = useState('');
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [clientsRes, projectsRes, paymentsRes] = await Promise.all([
        API.get('/api/clients'),
        API.get('/api/projects'),
        API.get('/api/payments'),
      ]);
      setClients(clientsRes.data);
      setProjects(projectsRes.data);
      setPayments(paymentsRes.data);
    } catch (err) {
      setError('Failed to load data. Try again.');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const payload = {
        name,
        description,
        status,
        client_id: parseInt(clientId),
      };
      await API.post('/api/projects', payload);
      setSuccessMessage('Project created successfully.');
      setName('');
      setDescription('');
      setStatus('Pending');
      setClientId('');
      fetchInitialData(); // refresh list
    } catch (err) {
      const msg =
        err.response?.data?.detail?.map?.(e => e.msg).join(', ') ||
        err.response?.data?.detail ||
        'Project creation failed.';
      setError(msg);
      console.error('Full Axios Error:', err);
    }
  };

  const getClientName = (id) => {
    const client = clients.find((c) => c.id === id);
    return client ? client.name : 'Unknown';
  };

  const getPaymentsForProject = (projectId) => {
    return payments.filter((p) => p.project_id === projectId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create New Project</h2>
          <Link to="/dashboard" className="text-blue-500 hover:underline">← Return to Dashboard</Link>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 text-sm mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <div>
            <label className="block font-medium text-sm mb-1">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded shadow-sm"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded shadow-sm"
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Assign to Client</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full border px-3 py-2 rounded shadow-sm"
              required
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} ({client.email})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Create Project
          </button>
        </form>

        <h3 className="text-xl font-bold mb-4">Existing Projects</h3>
        {projects.length === 0 ? (
          <p className="text-gray-600">No projects available.</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => {
              const relatedPayments = getPaymentsForProject(project.id);
              const totalPaid = relatedPayments.reduce((acc, p) => acc + parseFloat(p.amount), 0);

              return (
                <li key={project.id} className="border rounded p-4 bg-gray-50">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">{project.name}</h4>
                      <p className="text-sm text-gray-600">
                        Client: {getClientName(project.client_id)} • Status: {project.status}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created: {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-blue-600 hover:underline self-start"
                    >
                      View →
                    </Link>
                  </div>

                  <div className="mt-2 text-sm">
                    <p className="font-medium">Payments:</p>
                    {relatedPayments.length === 0 ? (
                      <p className="text-gray-500">No payments yet.</p>
                    ) : (
                      <>
                        <ul className="list-disc ml-5 text-gray-700">
                          {relatedPayments.slice(0, 2).map((pay) => (
                            <li key={pay.id}>
                              {pay.amount} on {new Date(pay.date).toLocaleDateString()}
                            </li>
                          ))}
                        </ul>
                        <p className="text-green-700 mt-1">Total: KES {totalPaid.toFixed(2)}</p>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Projects;
