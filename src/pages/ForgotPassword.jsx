// src/pages/ForgotPassword.jsx

import React, { useState } from 'react';
import API from '../utils/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/forgot-password', { email });
      setMessage(res.data.message || 'If that email exists, a reset link was sent.');
    } catch (err) {
      setMessage('Error sending reset link.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="block w-full p-2 border mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
