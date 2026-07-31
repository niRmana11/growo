import { useState, useEffect, useRef } from 'react';
import { getWeeklySummary } from '../../services/aiService.js';
import { Sparkles, Lock } from 'lucide-react';

export function WeeklySummary() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isGated, setIsGated] = useState(false);
  const [error, setError] = useState('');

  // 1. Create a ref to track if we already fetched
  const hasFetched = useRef(false);

  useEffect(() => {
    // 2. If we already fetched, instantly return to ignore the StrictMode double-fire
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchSummary = async () => {
      try {
        const response = await getWeeklySummary();
        if (response.isGated) {
          setIsGated(true);
          // Set the message from the backend explaining the gate
          setSummary(response.message);
        } else {
          setSummary(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 rounded-lg p-6 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-emerald-600 w-5 h-5" />
        <h3 className="text-lg font-bold text-emerald-900">GrowO Weekly Insights</h3>
      </div>

      {isLoading ? (
        <div className="animate-pulse flex flex-col gap-3">
          <div className="h-4 bg-emerald-200 rounded w-full"></div>
          <div className="h-4 bg-emerald-200 rounded w-5/6"></div>
          <div className="h-4 bg-emerald-200 rounded w-4/6"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <div className="relative">
          {/* If gated, we show a blurred fake message behind the lock screen */}
          <p
            className={`text-emerald-900 text-sm leading-relaxed whitespace-pre-wrap ${isGated ? 'blur-[4px] select-none opacity-50' : ''}`}
          >
            {isGated
              ? "Based on your data from this week, you are showing incredible consistency in your morning habits. However, you've missed your coding habit for 3 days straight. Next week, try setting a 15-minute timer just to open your IDE. You're doing great, keep going!"
              : summary}
          </p>

          {/* The Soft Gate Upgrade Overlay */}
          {isGated && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg text-center w-full border border-emerald-100">
                <Lock className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-gray-900 text-sm mb-1">Weekly Limit Reached</h4>
                <p className="text-xs text-gray-600 mb-3">{summary}</p>
                <button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm">
                  Upgrade to Pro
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
