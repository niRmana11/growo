import { X, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import api from '../../services/api';

export function UpgradeModal({ isOpen, onClose, featureName = 'This feature' }) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    try {
      setIsLoading(true);
      const res = await api.post('/lemonsqueezy/create-checkout');
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error('Failed to start checkout:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Graphic */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-8 text-center text-white">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md shadow-inner">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Upgrade to Pro</h2>
          <p className="text-green-100 text-sm">
            {featureName} is a premium feature. Upgrade to unlock unlimited access.
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-gray-700">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              Unlimited AI Pattern Insights
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              Unlimited 24/7 AI Coach access
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              Support future development
            </li>
          </ul>

          <button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Upgrade Now for $4.99/mo'}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            Secure payment powered by Lemon Squeezy
          </p>
        </div>
      </div>
    </div>
  );
}
