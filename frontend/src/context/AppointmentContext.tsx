'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { appointmentApi } from '@/lib/api';
import { useAuth } from './AuthContext';

interface Appointment {
  id: number;
  client_name: string;
  service_date: string;
  service_type: string;
  estimated_duration: number;
  created_at: string;
  user_id: number;
}

interface AppointmentContextType {
  appointments: Appointment[];
  loading: boolean;
  createAppointment: (appointment: { client_name: string; service_date: string; service_type: string; estimated_duration: number }) => Promise<void>;
  fetchAppointments: () => Promise<void>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  const fetchAppointments = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const result = await appointmentApi.getAll(token);
      setAppointments(result);
      localStorage.setItem('appointments', JSON.stringify(result));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointment: { client_name: string; service_date: string; service_type: string; estimated_duration: number }) => {
    if (!token) return;
    
    setLoading(true);
    try {
      const newAppointment = await appointmentApi.create(token, appointment);
      const updated = [...appointments, newAppointment];
      setAppointments(updated);
      localStorage.setItem('appointments', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppointmentContext.Provider value={{ appointments, loading, createAppointment, fetchAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error('useAppointments must be used within AppointmentProvider');
  return context;
};
