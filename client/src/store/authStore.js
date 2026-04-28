import { create } from 'zustand';
import { authService } from '../services/authService';

// Auth store: central state for authentication
export const useAuthStore = create((set) => ({
  // State
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  // Set user after successful login/register
  setUser: (userData) =>
    set({
      user: userData,
      isAuthenticated: true,
      error: null,
    }),

  // Clear user on logout
  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    }),

  // Set loading state (true during API calls)
  setLoading: (isLoading) => set({ isLoading }),

  // Set error message
  setError: (error) => set({ error }),

  // Clear error message
  clearError: () => set({ error: null }),

  // Initialize auth session from localStorage on app startup
  initializeAuth: async () => {
    try {
      set({ isLoading: true });

      const token = localStorage.getItem('authToken');

      // If no token, just finish loading
      if (!token) {
        set({ isLoading: false });
        return;
      }

      // Token exists - verify it's still valid by fetching profile
      const userData = await authService.getProfile();

      // If successful, restore user session
      set({
        user: userData,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      });
    } catch (err) {
      // Token is invalid (expired, revoked, etc)
      // Clear it and stay logged out
      localStorage.removeItem('authToken');
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    }
  },
}));
