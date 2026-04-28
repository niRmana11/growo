import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Protected route - redirects to login if not authenticated
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FDF4] to-[#E2F4CC]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#7ED957]"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render the protected page
  if (isAuthenticated) {
    return children;
  }

  // If not authenticated, redirect to login
  return <Navigate to="/login" replace />;
};
