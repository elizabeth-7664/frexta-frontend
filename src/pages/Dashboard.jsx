// src/pages/Dashboard.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Welcome, {user?.user?.name || 'User'} 👋</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold">Clients</h3>
          <p>Manage all your clients here.</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold">Projects</h3>
          <p>Track active and completed projects.</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold">Payments</h3>
          <p>View and update payment records.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
