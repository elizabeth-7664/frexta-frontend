import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [amount, setAmount] = useState('');
  const [projectId, setProjectId] = useState('');
  const [datePaid, setDatePaid] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPayments();
    fetchProjects();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await API.get('/api/payments');
      setPayments(res.data);
    } catch (err) {
      const msg =
        err.response?.data?.detail || 'Failed to fetch payments.';
      setError(msg);
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await API.get('/api/projects');
      setProjects(res.data);
    } catch (err) {
      const msg =
        err.response?.data?.detail || 'Failed to fetch projects.';
      setError(msg);
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const payload = {
      amount: parseFloat(amount),
      project_id: parseInt(projectId),
      date_paid: datePaid,
    };

    if (!payload.date_paid) {
      setError("Please enter the date paid.");
      return;
    }

    try {
      console.log("Sending payload:", payload);
      const res = await API.post('/api/payments', payload);
      setPayments([...payments, res.data]);
      setAmount('');
      setProjectId('');
      setDatePaid('');
    } catch (err) {
      const errorMessage =
        Array.isArray(err.response?.data?.detail)
          ? err.response.data.detail.map((e) => e.msg).join(', ')
          : err.response?.data?.detail || 'Failed to create payment.';
      setError(errorMessage);
      console.error('Full Axios Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Payments</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Project</label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md"
              required
            >
              <option value="">-- Choose a project --</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name || `Project ${project.id}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date Paid</label>
            <input
              type="date"
              value={datePaid}
              onChange={(e) => setDatePaid(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white py-2 rounded-md ${
              projectId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!projectId}
          >
            Add Payment
          </button>
        </form>

        <div>
          <h3 className="text-xl font-semibold mb-4">Payment List</h3>
          {payments.length === 0 ? (
            <p>No payments found.</p>
          ) : (
            <ul className="space-y-4">
              {payments.map((payment) => (
                <li key={payment.id} className="p-4 bg-gray-50 rounded-md">
                  <p>Amount: ${payment.amount}</p>
                  <p>Project ID: {payment.project_id}</p>
                  <p>Date Paid: {payment.date_paid}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
