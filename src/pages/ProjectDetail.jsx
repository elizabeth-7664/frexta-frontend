import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', status: 'Pending' });
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get(`/api/projects/${id}`)
      .then((res) => {
        setProject(res.data);
        setForm({ name: res.data.name, description: res.data.description || '', status: res.data.status });
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch project details.');
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/api/projects/${id}`);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete project.');
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await API.put(`/api/projects/${id}`, form);
      setProject(res.data);
      setEditing(false);
    } catch (err) {
      const msg =
        err.response?.data?.detail?.map((d) => d.msg).join(', ') ||
        err.response?.data?.detail ||
        'Update failed.';
      setError(msg);
      console.error(err);
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;
  if (!project) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Project Details</h2>
        <Link to="/dashboard" className="text-blue-500 hover:underline">← Back</Link>
      </div>

      {editing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            >
              <option>Pending</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
            <button type="button" onClick={() => setEditing(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>Name:</strong> {project.name}</p>
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Status:</strong> {project.status}</p>
          <p><strong>Client ID:</strong> {project.client_id}</p>
          <p><strong>Created:</strong> {new Date(project.created_at).toLocaleString()}</p>
          <p><strong>Updated:</strong> {new Date(project.updated_at).toLocaleString()}</p>

          <div className="flex gap-4 mt-4">
            <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
