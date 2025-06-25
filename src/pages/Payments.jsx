

import React, { useEffect, useState } from 'react';
import API from '../utils/api';

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await API.get('/payments');
        setPayments(res.data);
      } catch (err) {
        console.error('Failed to fetch payments:', err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payments</h2>

      {payments.length === 0 ? (
        <p className="text-gray-600">No payment records found.</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow overflow-x-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Client</th>
              <th className="py-2 px-4 text-left">Project</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t">
                <td className="py-2 px-4">{payment.client_name || 'N/A'}</td>
                <td className="py-2 px-4">{payment.project_title || 'N/A'}</td>
                <td className="py-2 px-4">KSh {payment.amount}</td>
                <td className="py-2 px-4">{new Date(payment.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Payments;
