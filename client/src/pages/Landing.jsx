import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Target, Sparkles, Bot, ArrowRight } from 'lucide-react';
import growoLogo from '../assets/growo-logo.png';

export function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-sans selection:bg-green-200 relative overflow-hidden">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center relative z-10">
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
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center relative z-10">
        {/* AI Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          <span>Now with AI Growth Coaching</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
          Build habits that <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">
            actually stick.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed">
          GrowO combines powerful daily tracking with personalized AI coaching to help you become
          the best version of yourself, every single day.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Enter Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start Growing for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto bg-white border-2 border-gray-200 hover:border-green-600 text-gray-700 hover:text-green-600 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center"
              >
                Welcome Back
              </Link>
            </>
          )}
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-24 relative z-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to grow</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stop breaking your streaks. Our intelligent tools adapt to your lifestyle to ensure
              you hit your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-green-50/50 p-8 rounded-3xl border border-green-100 hover:shadow-lg transition-shadow">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-green-100">
                <Target className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Daily Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Log your habits seamlessly. Our beautiful GitHub-style contribution graph visually
                rewards your consistency.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 hover:shadow-lg transition-shadow">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-emerald-100">
                <Sparkles className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Pattern Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI analyzes your data to find hidden patterns in your behavior, giving you
                actionable advice to improve.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-green-50/50 p-8 rounded-3xl border border-green-100 hover:shadow-lg transition-shadow">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 border border-green-100">
                <Bot className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Growth Coach</h3>
              <p className="text-gray-600 leading-relaxed">
                Chat with your personalized AI coach anytime. It knows your stats and helps you
                overcome mental roadblocks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative floating background blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-200/40 blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-emerald-200/40 blur-[120px]"></div>
      </div>
    </div>
  );
}
