import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';
import growoLogoFull from '../assets/growo-logo-full.png';

export const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error, register } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (email, password, name) => {
    try {
      await register(email, password, name);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block transition-transform hover:scale-105">
            <img
              src={growoLogoFull}
              alt="GrowO Logo"
              className="h-20 w-auto mx-auto drop-shadow-sm"
            />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Create Account</h1>
          <p className="text-gray-500 font-medium">Start your growth journey today.</p>
        </div>

        {/* Premium Glass Register Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-2xl">
          <RegisterForm onSubmit={handleRegister} error={error} isLoading={isLoading} />

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-600 font-medium">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-all"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
