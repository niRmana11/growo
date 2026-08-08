import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { Navbar } from '../components/layout/Navbar.jsx';
import { useNavigate } from 'react-router-dom';

export function Analytics() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600 mb-8">Deep dive into your habit trends and consistency.</p>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
          <p className="text-gray-500">Charts loading soon...</p>
        </div>
      </main>
    </div>
  );
}
