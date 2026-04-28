import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

// Login page - renders login form and handles authentication
export const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error, login } = useAuth();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Handle form submission
  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      // Redirect happens via useEffect when isAuthenticated changes
    } catch (err) {
      // Error already in store, displayed by form
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FDF4] to-[#E2F4CC] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-[#0D1117]">Grow</span>
            <span className="text-[#7ED957]">O</span>
          </h1>
          <p className="text-gray-600">Welcome back</p>
        </div>

        {/* Login form card */}
        <div className="card">
          <LoginForm onSubmit={handleLogin} error={error} isLoading={isLoading} />

          {/* Link to register */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-[#7ED957] font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
