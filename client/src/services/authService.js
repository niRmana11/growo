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
      // Token is now set as HttpOnly cookie automatically
      return response.data.data.user; // Returns { user }
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
      // Token is now set as HttpOnly cookie automatically
      return response.data.data.user; // Returns { user }
    }

    throw new Error(response.data.message || 'Login failed');
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      if (response.data.success) {
        return response.data.data; // Returns user object
      }
      throw new Error(response.data.message || 'Failed to fetch profile');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  },

  // Logout (cookie cleared by server)
  logout: async () => {
    try {
      // Call backend logout endpoint (clears authToken cookie)
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      // Don't throw - logout should always succeed on frontend
      return { success: true, message: 'Logged out' };
    }
  },
};
