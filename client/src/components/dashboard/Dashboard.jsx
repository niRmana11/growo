import { useAuth } from '../../hooks/useAuth';

// Dashboard page - placeholder for main app
export const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Redirect happens automatically via useEffect in ProtectedRoute
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FDF4] to-[#E2F4CC]">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-[#0D1117]">Grow</span>
            <span className="text-[#7ED957]">O</span>
          </h1>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>

        {/* Welcome card */}
        <div className="card max-w-2xl">
          <h2 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h2>
          <p className="text-gray-600 mb-4">You're now logged in and can access your dashboard.</p>

          {/* User info */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Plan:</strong>{' '}
              <span className="capitalize font-semibold text-[#7ED957]">{user?.plan}</span>
            </p>
            <p>
              <strong>Member since:</strong> {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Next steps */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>Next Steps:</strong> Build out habit tracking, AI features, and analytics on
              the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
