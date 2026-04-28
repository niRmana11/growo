import { create } from 'zustand';

// Auth store: central state for authentication
export const useAuthStore = create((set) => ({
  // State
  user: null,
  isAuthenticated: false,
  isLoading: false,
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
}));
