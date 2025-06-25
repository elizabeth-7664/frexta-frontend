

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await API.get(`/clients/${id}`);
        setClient(res.data);
      } catch (err) {
        console.error('Failed to fetch client details:', err);
      }
    };

    fetchClient();
  }, [id]);

  if (!client) return <p className="p-6">Loading client details...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{client.name}</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-xl font-semibold mb-2">Client Info</h3>
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Phone:</strong> {client.phone}</p>
          <p><strong>Company:</strong> {client.company || 'N/A'}</p>
        </div>

        {/* Future Feature: Notes or Tags */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-xl font-semibold mb-2">Notes</h3>
          <p>Coming soon...</p>
        </div>
      </div>

      {/* Future Section: Projects */}
      <div className="bg-white rounded shadow p-4 mt-6">
        <h3 className="text-xl font-semibold mb-2">Projects</h3>
        <p>Coming soon...</p>
      </div>

      {/* Future Section: Payments */}
      <div className="bg-white rounded shadow p-4 mt-6">
        <h3 className="text-xl font-semibold mb-2">Payments</h3>
        <p>Coming soon...</p>
      </div>
    </div>
  );
};

export default ClientDetails;
