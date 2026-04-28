import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';

// Register page - renders register form and handles new user creation
export const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error, register, clearError } = useAuth();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Handle form submission
  const handleRegister = async (email, password, name) => {
    try {
      await register(email, password, name);
      // Redirect happens via useEffect when isAuthenticated changes
    } catch (err) {
      // Error already in store, displayed by form
      console.error('Registration failed:', err);
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
          <p className="text-gray-600">Start your growth journey today</p>
        </div>

        {/* Register form card */}
        <div className="card">
          <RegisterForm onSubmit={handleRegister} error={error} isLoading={isLoading} />

          {/* Link to login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#7ED957] font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
