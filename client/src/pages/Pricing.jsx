import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { Check, Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Pricing() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    try {
      setIsLoading(true);
      const res = await api.post('/stripe/create-checkout-session');
      if (res.data.url) {
        window.location.href = res.data.url; // Redirect immediately to Stripe Checkout!
      }
    } catch (error) {
      console.error('Failed to start checkout:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-green-200">
      <div className="max-w-7xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-green-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600">Invest in your personal growth. Cancel anytime.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="w-full md:w-1/2 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-extrabold text-gray-900">$0</span>
              <span className="text-gray-500 font-medium">/ forever</span>
            </div>
            <p className="text-gray-600 mb-8">Everything you need to track your daily habits.</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {['Unlimited habit tracking', 'Basic contribution graph', '2 AI pattern insights', '3 AI Coach messages'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              disabled 
              className="w-full py-4 rounded-xl font-bold bg-gray-100 text-gray-500 cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* Pro Tier */}
          <div className="w-full md:w-1/2 bg-green-600 rounded-3xl p-8 border-2 border-emerald-400 shadow-xl flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 right-6 transform -translate-y-1/2">
              <span className="bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Most Popular
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">GrowO Pro</h3>
            <div className="flex items-baseline gap-2 mb-6 text-white">
              <span className="text-4xl font-extrabold">$9</span>
              <span className="text-green-100 font-medium">/ month</span>
            </div>
            <p className="text-green-100 mb-8">Supercharge your growth with personalized AI coaching.</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                'Everything in Basic',
                'Unlimited AI Pattern Insights',
                'Unlimited 24/7 AI Growth Coach',
                'Priority support',
                'Early access to new features'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-200 shrink-0" />
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={handleUpgrade}
              disabled={isLoading || user?.plan === 'pro'}
              className="w-full py-4 rounded-xl font-bold bg-white text-green-700 hover:bg-green-50 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Preparing Checkout...</>
              ) : user?.plan === 'pro' ? (
                'You are a Pro'
              ) : (
                'Upgrade to Pro'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
