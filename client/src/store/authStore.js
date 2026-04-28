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

      // Always try to fetch profile - browser sends HttpOnly cookie automatically
      // If valid, session is restored. If invalid, we get 401 and stay logged out.
      const userData = await authService.getProfile();

      set({
        user: userData,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      });
    } catch (err) {
      // Cookie is invalid/expired or user not found
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    }
  },
}));
