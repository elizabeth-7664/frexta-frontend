import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';

const ClientNotes = () => {
  const { id: clientId } = useParams();
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ content: '' });
  const [editingNote, setEditingNote] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [clientId]);

  const fetchNotes = async () => {
    try {
      const res = await API.get(`/api/clients/${clientId}/notes`);
      setNotes(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch notes.');
      console.error('Error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/api/notes', { content: form.content, client_id: parseInt(clientId) });
      setForm({ content: '' });
      fetchNotes();
      setError('Note added successfully!');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error adding note.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    setError('');
    try {
      await API.put(`/api/notes/${id}`, { content: form.content, client_id: parseInt(clientId) });
      setEditingNote(null);
      setForm({ content: '' });
      fetchNotes();
      setError('Note updated successfully!');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error updating note.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await API.delete(`/api/notes/${id}`);
      fetchNotes();
      setError('Note deleted successfully!');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error deleting note.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto">
          <Link to={`/clients/${clientId}`} className="text-blue-600 hover:underline">
            Back to Client
          </Link>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Notes for Client #{clientId}</h2>
        {error && (
          <p className={error.includes('successfully') ? 'text-green-600 mb-4' : 'text-red-500 mb-4'}>
            {error}
          </p>
        )}
        <form
          onSubmit={editingNote ? (e) => { e.preventDefault(); handleUpdate(editingNote); } : handleSubmit}
          className="bg-white p-6 rounded-lg shadow mb-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {editingNote ? 'Edit Note' : 'New Note'}
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : editingNote ? 'Update Note' : 'Add Note'}
          </button>
          {editingNote && (
            <button
              type="button"
              onClick={() => { setEditingNote(null); setForm({ content: '' }); }}
              className="mt-4 ml-2 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </form>
        {notes.length === 0 ? (
          <p className="text-gray-600">No notes found.</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="bg-white p-4 rounded-lg shadow">
                <p>{note.content}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => { setEditingNote(note.id); setForm({ content: note.content }); }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientNotes;