'use client';

import { useState } from 'react';
import { useAppointments } from '@/context/AppointmentContext';

export default function AppointmentForm() {
  const [clientName, setClientName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('');
  const [error, setError] = useState('');
  const { createAppointment, loading } = useAppointments();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!clientName || !serviceType || !serviceDate || !estimatedDuration) {
      setError('All fields are required');
      return;
    }

    const duration = parseInt(estimatedDuration);
    if (isNaN(duration) || duration <= 0) {
      setError('Estimated duration must be a positive number');
      return;
    }

    try {
      await createAppointment({ 
        client_name: clientName, 
        service_date: serviceDate, 
        service_type: serviceType, 
        estimated_duration: duration 
      });
      setClientName('');
      setServiceType('');
      setServiceDate('');
      setEstimatedDuration('');
    } catch {
      setError('Failed to create appointment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Create Appointment</h3>
      
      {error && (
        <div className="p-3 mb-4 bg-red-50 text-red-600 rounded text-sm">
          {error}
        </div>
      )}
      
      <input
        type="text"
        placeholder="Client Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <select
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Service Type</option>
        <option value="mowing">Mowing</option>
        <option value="installation">Installation</option>
        <option value="maintenance">Maintenance</option>
      </select>
      
      <input
        type="date"
        value={serviceDate}
        onChange={(e) => setServiceDate(e.target.value)}
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="number"
        placeholder="Estimated Duration (minutes)"
        value={estimatedDuration}
        onChange={(e) => setEstimatedDuration(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <button 
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60 transition-colors"
      >
        {loading ? 'Creating...' : 'Create Appointment'}
      </button>
    </form>
  );
}
