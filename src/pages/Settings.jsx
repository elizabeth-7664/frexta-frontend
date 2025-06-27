import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Load current user data
    const fetchUser = async () => {
      try {
        const res = await API.get('/api/users/me');
        setEmail(res.data.email);
        setName(res.data.name || '');
      } catch (err) {
        console.error('Failed to fetch user info', err);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put('/api/users/me', { name });
      setMessage('Settings updated successfully!');
    } catch (err) {
      console.error('Update failed', err);
      setMessage('Failed to update settings.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email (read-only)</label>
          <input type="email" value={email} disabled className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
