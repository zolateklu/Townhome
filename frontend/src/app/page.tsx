'use client';

import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="text-white text-2xl text-center">Loading...</div>;
  
  return user ? <Dashboard /> : <LoginForm />;
}
