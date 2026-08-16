import axios from 'axios';

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    const raw = import.meta.env.VITE_API_URL.trim().replace(/\/$/, '');
    return raw.endsWith('/api') ? raw : `${raw}/api`;
  }
  
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return `${window.location.origin}/api`;
  }

  return 'http://localhost:5001/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tastraa_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token.trim()}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
