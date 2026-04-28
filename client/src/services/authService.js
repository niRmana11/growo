import api from './api';

// Register new user
export const authService = {
  register: async (email, password, name) => {
    const response = await api.post('/auth/register', {
      email,
      password,
      name,
    });

    if (response.data.success) {
      return response.data.data; // Returns { token, user }
    }

    throw new Error(response.data.message || 'Registration failed');
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    if (response.data.success) {
      return response.data.data; // Returns { token, user }
    }

    throw new Error(response.data.message || 'Login failed');
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');

    if (response.data.success) {
      return response.data.data; // Returns user object
    }

    throw new Error(response.data.message || 'Failed to fetch profile');
  },

  // Logout (clear token from localStorage)
  logout: async () => {
    try {
      // Call backend logout endpoint (returns success message)
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      // Don't throw - logout should always succeed on frontend
      return { success: true, message: 'Logged out' };
    }
  },
};
