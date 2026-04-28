import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

// Custom hook for authentication logic
export const useAuth = () => {
  const store = useAuthStore();

  // Destructure store state and actions
  const { user, isAuthenticated, isLoading, error } = store;
  const { setUser, clearUser, setLoading, setError, clearError } = store;

  // Register new user
  const register = async (email, password, name) => {
    try {
      setLoading(true);
      clearError();

      const userData = await authService.register(email, password, name);

      // Token is now stored in HttpOnly cookie (set by server)
      // Update store with user data
      setUser(userData);

      return userData;
    } catch (err) {
      // Set error message in store for UI to display
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      clearError();

      const userData = await authService.login(email, password);

      // Token is now stored in HttpOnly cookie (set by server)
      // Update store with user data
      setUser(userData);

      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);

      // Call backend logout endpoint (clears authToken cookie)
      await authService.logout();

      // Clear store
      clearUser();
    } catch (err) {
      console.error('Logout error:', err);
      // Still clear on error - don't trap user
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  // Return everything components need
  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    clearError,
  };
};
