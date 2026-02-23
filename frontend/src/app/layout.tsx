'use client';

import { AuthProvider } from '@/context/AuthContext';
import { AppointmentProvider } from '@/context/AppointmentContext';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AuthProvider>
          <AppointmentProvider>
            {children}
          </AppointmentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
