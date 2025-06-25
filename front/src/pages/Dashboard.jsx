import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ClientConnect</h1>
          <div className="space-x-4">
            <Link to="/clients" className="text-blue-600 hover:underline">Clients</Link>
            <Link to="/projects" className="text-blue-600 hover:underline">Projects</Link>
            <Link to="/payments" className="text-blue-600 hover:underline">Payments</Link>
            <Link to="/settings" className="text-blue-600 hover:underline">Settings</Link>
            <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Welcome, {user?.email || 'User'} 👋</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Clients</h3>
            <p className="text-gray-600">Manage your client relationships.</p>
            <Link to="/clients" className="mt-4 inline-block text-blue-600 hover:underline">
              View Clients
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Projects</h3>
            <p className="text-gray-600">Track your ongoing projects.</p>
            <Link to="/projects" className="mt-4 inline-block text-blue-600 hover:underline">
              View Projects
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Payments</h3>
            <p className="text-gray-600">Monitor payment statuses.</p>
            <Link to="/payments" className="mt-4 inline-block text-blue-600 hover:underline">
              View Payments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;