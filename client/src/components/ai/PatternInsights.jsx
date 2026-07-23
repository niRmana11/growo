import { useState, useEffect, useRef } from 'react';
import { getInsights } from '../../services/aiService.js';
import { Lightbulb, Lock } from 'lucide-react';

export function PatternInsights() {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Create a ref to track if we already fetched
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchInsights = async () => {
      try {
        const response = await getInsights();
        setInsights(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="text-amber-500 w-5 h-5" />
        <h3 className="text-lg font-bold text-gray-900">Deep Pattern Insights</h3>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <ul className="space-y-4">
          {insights.map((insight, index) => {
            const isBlurred = insight === 'BLURRED';
            return (
              <li key={index} className="flex gap-3 items-start relative">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </span>

                {isBlurred ? (
                  <div className="flex-1 relative cursor-not-allowed">
                    <p className="text-gray-900 text-sm leading-relaxed blur-[4px] select-none opacity-40">
                      This is a fake blurred insight to show the user that there is incredibly
                      valuable personalized data waiting for them if they upgrade to the Pro plan.
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200 shadow-sm flex items-center gap-1 hover:bg-gray-50 transition-colors">
                        <Lock className="w-3 h-3 text-gray-500" />
                        <span className="text-xs font-semibold text-gray-700">
                          Unlock Pro Insight
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 text-sm leading-relaxed">{insight}</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
