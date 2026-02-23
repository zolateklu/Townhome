'use client';

import { useAuth } from '@/context/AuthContext';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl w-full mx-auto p-8 bg-white rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold flex-1">Welcome, {user?.username}</h2>
        <button 
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors whitespace-nowrap"
        >
          Logout
        </button>
      </div>
      
      <div className="flex flex-col gap-6">
        <AppointmentForm />
        <AppointmentList />
      </div>
    </div>
  );
}
