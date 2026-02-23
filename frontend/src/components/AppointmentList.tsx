'use client';

import { useAppointments } from '@/context/AppointmentContext';

export default function AppointmentList() {
  const { appointments } = useAppointments();

  if (appointments.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg text-center text-gray-500">
        No appointments yet
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Your Appointments</h3>
      <div className="space-y-3">
        {appointments.map((apt) => (
          <div key={apt.id} className="p-4 bg-white rounded border border-gray-200">
            <h4 className="font-semibold text-lg">{apt.client_name}</h4>
            <p className="text-gray-700 text-sm mt-1">{apt.service_type}</p>
            <p className="text-gray-600 text-sm mt-1">
              {apt.service_date} • {apt.estimated_duration} minutes
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
