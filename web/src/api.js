import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
if (baseURL && !baseURL.endsWith('/api') && !baseURL.endsWith('/api/')) {
  baseURL = `${baseURL.replace(/\/$/, '')}/api`;
}

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tastraa_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
