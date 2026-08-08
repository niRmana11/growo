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
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { Loader2, Lock } from 'lucide-react';
import { UpgradeModal } from '../components/common/UpgradeModel.jsx';
import { ContributionGraph } from '../components/dashboard/ContributionGraph.jsx';

export function Analytics() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [streakData, setStreakData] = useState([]);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  const isPro = user?.plan === 'pro';

  // Custom colors for our Pie Chart to match the GrowO theme
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#6b7280'];

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

          // Process Category Data for Pie Chart
          const categoryCounts = {};
          res.data.habits.forEach((h) => {
            if (!categoryCounts[h.category]) categoryCounts[h.category] = 0;
            categoryCounts[h.category] += h.totalCompletions;
          });
          const catData = Object.keys(categoryCounts).map((key) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize category
            value: categoryCounts[key],
          }));
          setCategoryData(catData);

          // Process Total Completions Data for Bar Chart
          const completionsData = res.data.habits.map((h) => ({
            name: h.name.length > 12 ? h.name.substring(0, 12) + '...' : h.name,
            Completions: h.totalCompletions,
          }));
          setStreakData(completionsData); // We'll keep the same state name for simplicity
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
            {/* TOP ROW GRID (Free Tier) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Side: 30-Day Trend (Takes up 2/3 width) */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-bold text-gray-800 mb-6">30-Day Completion Trend</h2>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={trendData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
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

              {/* Right Side: Heatmap (Takes up 1/3 width) */}
              <div className="lg:col-span-1 h-full">
                <ContributionGraph
                  logDates={stats.recentLogs}
                  totalHabits={stats.totalHabits}
                  userCreatedAt={user?.createdAt}
                  className="h-full flex flex-col justify-center"
                />
              </div>
            </div>

            {/* Advanced Charts Grid (PRO Only) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative mt-6">
              {/* THE FREEMIUM BLUR OVERLAY */}
              {!isPro && (
                <div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[6px] rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:bg-white/30 transition-colors"
                  onClick={() => setIsUpgradeOpen(true)}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm text-center border border-emerald-100 transform transition-transform hover:scale-105">
                    <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner">
                      <Lock className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced Analytics</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      Unlock deep insights into your habit categories and streak comparisons to
                      optimize your growth.
                    </p>
                    <button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all">
                      Upgrade to Pro
                    </button>
                  </div>
                </div>
              )}

              {/* Pie Chart: Categories */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Completions by Category</h2>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: '12px',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart: Total Completions */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Total Completions per Habit
                </h2>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={streakData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6b7280', fontSize: 11 }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        dx={-10}
                        allowDecimals={false}
                      />
                      <Tooltip
                        cursor={{ fill: '#f3f4f6' }}
                        contentStyle={{
                          borderRadius: '12px',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      {/* Only one bar now, showing total lifetime completions! */}
                      <Bar
                        dataKey="Completions"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={60}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FREEMIUM Upgrade Modal */}
      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        featureName="Advanced Analytics & Charts"
      />
    </div>
  );
}
