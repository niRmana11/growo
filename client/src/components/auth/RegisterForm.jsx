import { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react'; // Premium icons!

export const RegisterForm = ({ onSubmit, error, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6 && value.length > 0) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    await onSubmit(email, password, name);
  };

  const isFormValid = email && password && name && password.length >= 6;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name input */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm font-bold text-gray-700">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            placeholder="Your Name"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white focus:bg-white disabled:opacity-50"
          />
        </div>
      </div>

      {/* Email input */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-bold text-gray-700">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            placeholder="you@example.com"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white focus:bg-white disabled:opacity-50"
          />
        </div>
      </div>

      {/* Password input */}
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-bold text-gray-700">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            disabled={isLoading}
            placeholder="••••••••"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white focus:bg-white disabled:opacity-50"
          />
        </div>
        {passwordError && (
          <p className="text-amber-500 text-sm font-medium pt-1 px-1">{passwordError}</p>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium text-center">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading || !isFormValid}
        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:transform-none disabled:shadow-none mt-2"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Create Account
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
};
