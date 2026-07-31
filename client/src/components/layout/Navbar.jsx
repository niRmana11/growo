import { LogOut } from 'lucide-react';
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
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
