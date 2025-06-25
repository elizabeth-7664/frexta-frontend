// src/pages/ClientNotes.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

const ClientNotes = () => {
  const { id: clientId } = useParams();
  const [notes, setNotes] = useState([]);
  const [newContent, setNewContent] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await API.get(`/clients/${clientId}/notes`);
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [clientId]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post('/notes', {
        content: newContent,
        client_id: clientId,
      });
      setNewContent('');
      fetchNotes();
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await API.patch(`/notes/${id}`, { content: editedContent });
      setEditingNote(null);
      setEditedContent('');
      fetchNotes();
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Notes for Client #{clientId}</h2>

      <form onSubmit={handleCreate} className="mb-6">
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Write a new note..."
          className="w-full p-2 border mb-2"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Add Note
        </button>
      </form>

      {notes.length === 0 ? (
        <p>No notes yet for this client.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="bg-white p-4 shadow rounded">
              {editingNote === note.id ? (
                <>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-2 border mb-2"
                  />
                  <button onClick={() => handleUpdate(note.id)} className="bg-green-600 text-white py-1 px-3 mr-2">
                    Save
                  </button>
                  <button onClick={() => setEditingNote(null)} className="bg-gray-400 text-white py-1 px-3">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{note.content}</p>
                  <div className="mt-2 space-x-2">
                    <button onClick={() => {
                      setEditingNote(note.id);
                      setEditedContent(note.content);
                    }} className="text-blue-600">Edit</button>
                    <button onClick={() => handleDelete(note.id)} className="text-red-600">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientNotes;
