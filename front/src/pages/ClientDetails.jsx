import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClientData();
  }, [id]);

  const fetchClientData = async () => {
    try {
      const [clientRes, projectsRes, notesRes] = await Promise.all([
        API.get(`/api/clients/${id}`),
        API.get(`/api/clients/${id}/projects`),
        API.get(`/api/clients/${id}/notes`),
      ]);
      setClient(clientRes.data);
      setProjects(projectsRes.data);
      setNotes(notesRes.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail || `Failed to fetch client data for ID ${id}.`;
      setError(errorMessage);
      console.error('Error:', err);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (!client) {
    return <div className="min-h-screen bg-gray-100 p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Client: {client.name}</h2>
        <p>Email: {client.email}</p>
        <p>Phone: {client.phone}</p>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Projects</h3>
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project.id} className="p-4 bg-gray-50 rounded-md">
                  <Link to={`/projects/${project.id}`} className="text-blue-600 hover:underline">
                    {project.name}
                  </Link>
                  <p>{project.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Notes</h3>
          {notes.length === 0 ? (
            <p>No notes found.</p>
          ) : (
            <ul className="space-y-4">
              {notes.map((note) => (
                <li key={note.id} className="p-4 bg-gray-50 rounded-md">
                  <p>{note.content}</p>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(note.created_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <Link
            to={`/clients/${id}/notes`}
            className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Note
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;