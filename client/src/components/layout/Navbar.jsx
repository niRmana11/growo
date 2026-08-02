import { LogOut, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import growoLogo from '../../assets/growo-logo.png';

export function Navbar({ user, onLogout }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/dashboard" className="block">
              <img src={growoLogo} alt="GrowO Logo" className="h-12 w-auto" />
              <p className="text-xs mt-1 font-medium">
                <span className="text-green-600">Grow</span>
                <span className="text-gray-900"> every day. </span>
                <span className="text-green-600">Go</span>
                <span className="text-gray-900"> every day.</span>
              </p>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Show Upgrade button ONLY if user is not already PRO */}
            {user?.plan !== 'pro' && (
              <Link
                to="/pricing"
                className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <Sparkles size={16} />
                Upgrade to Pro
              </Link>
            )}

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
