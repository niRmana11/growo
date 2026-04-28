import { useState } from 'react';

// Register form component - renders email/password/name fields with validation
export const RegisterForm = ({ onSubmit, error, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validate password when user types
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

    // Validate all fields are filled
    if (!email || !password || !name) {
      return;
    }

    // Validate password is long enough
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    // Call the onSubmit callback with all fields
    await onSubmit(email, password, name);
  };

  // Check if form is valid
  const isFormValid = email && password && name && password.length >= 6;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
        />
      </div>

      {/* Email input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
        />
      </div>

      {/* Password input with validation */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password (min 6 characters)
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          disabled={isLoading}
          placeholder="••••••"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
        />
        {passwordError && <p className="text-yellow-600 text-sm mt-1">{passwordError}</p>}
      </div>

      {/* Server error message */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Submit button */}
      <button type="submit" disabled={isLoading || !isFormValid} className="w-full btn-primary">
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      {/* Helper text */}
      <p className="text-sm text-gray-600 text-center">
        Password will be securely hashed on the server
      </p>
    </form>
  );
};
