import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { Navbar } from '../components/layout/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { getHabitStats } from '../services/habitService.js';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Loader2 } from 'lucide-react';

export function Analytics() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [trendData, setTrendData] = useState([]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const res = await getHabitStats();

        if (res.success) {
          setStats(res.data);

          // Process the 30-day recentLogs array into a chart-friendly format
          const logs = res.data.recentLogs || [];
          const counts = {};

          // Initialize the last 30 days with 0 so the chart timeline is complete
          for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            counts[dateStr] = 0;
          }

          // Count the actual completions per day
          logs.forEach((dateString) => {
            const d = new Date(dateString);
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            if (counts[dateStr] !== undefined) {
              counts[dateStr] += 1;
            }
          });

          // Convert to Recharts array format: [{ date: 'Aug 1', completions: 2 }, ...]
          const formattedData = Object.keys(counts).map((key) => ({
            date: key,
            completions: counts[key],
          }));

          setTrendData(formattedData);
        }
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Deep dive into your habit trends and consistency.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Free Tier Chart: 30-Day Trend */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold text-gray-800 mb-6">30-Day Completion Trend</h2>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      dy={10}
                      minTickGap={20}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      dx={-10}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                      cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="completions"
                      name="Habits Completed"
                      stroke="#10b981"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorCompletions)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
