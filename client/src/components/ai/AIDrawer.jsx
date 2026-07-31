import { X, Sparkles, ArrowRight } from 'lucide-react';
import { WeeklySummary } from './WeeklySummary.jsx';
import { PatternInsights } from './PatternInsights.jsx';
import { Link } from 'react-router-dom';

export function AIDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Dark Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-Out Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-gray-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-1.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">AI Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* We embed the existing components here! */}
          <WeeklySummary />
          <PatternInsights />

          {/* Upsell / Link to full coach */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-md text-center mt-8">
            <h3 className="font-bold text-lg mb-2">Need more help?</h3>
            <p className="text-indigo-100 text-sm mb-4">
              Chat directly with your personalized AI Growth Coach to dive deeper into your habits.
            </p>
            <Link
              to="/coach"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-sm hover:shadow"
            >
              Open Coach Chat
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
