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
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      // Cookie will be cleared by server via Set-Cookie: authToken=; Max-Age=0
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
