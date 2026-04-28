import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Include cookies automatically with every request (HttpOnly auth cookies)
  withCredentials: true,
});

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't redirect here - let components/route guards handle 401s
    // This prevents infinite redirect loops during auth initialization
    return Promise.reject(error);
  }
);

export default api;
