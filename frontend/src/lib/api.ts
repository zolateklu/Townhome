const API_URL = 'http://localhost:8000';

export const authApi = {
  login: async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  getMe: async (token: string) => {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  }
};

export const appointmentApi = {
  create: async (token: string, appointment: { client_name: string; service_date: string; service_type: string; estimated_duration: number }) => {
    const res = await fetch(`${API_URL}/api/appointments`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointment)
    });
    
    if (!res.ok) throw new Error('Failed to create appointment');
    return res.json();
  },

  getAll: async (token: string) => {
    const res = await fetch(`${API_URL}/api/appointments`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!res.ok) throw new Error('Failed to fetch appointments');
    return res.json();
  }
};
