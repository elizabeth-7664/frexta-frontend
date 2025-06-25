
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const Settings = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user?.user) {
      setName(user.user.name);
      setEmail(user.user.email);
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/users/${user.user.id}`, { name, email });
      alert('Profile updated!');
      login({ ...user, user: res.data }); 
    } catch (err) {
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <form onSubmit={handleUpdate} className="max-w-md">
        <label className="block mb-2">
          Name:
          <input
            className="w-full border p-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          Email:
          <input
            className="w-full border p-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Settings;
