import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useHabits } from '../hooks/useHabits.js';
import * as habitService from '../services/habitService.js';
import { HabitList } from '../components/habits/HabitList.jsx';
import { HabitModal } from '../components/habits/HabitModal.jsx';
import { LogOut, Plus, TrendingUp, Flame } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import growoLogo from '../assets/growo-logo.png';
import flameIcon from '../assets/icons/fire.png';
import listIcon from '../assets/icons/list.png';
import checkIcon from '../assets/icons/check.png';
import bestIcon from '../assets/icons/best.png';
import { TodayProgress } from '../components/dashboard/TodayProgress.jsx';
import { ContributionGraph } from '../components/dashboard/ContributionGraph.jsx';

export function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    habits,
    isLoading,
    error,
    fetchHabits,
    createNew,
    update,
    remove,
    logCompletion,
    getTotalStats,
    clearError,
  } = useHabits();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingHabit, setEditingHabit] = useState(null);
  const [stats, setStats] = useState({ totalHabits: 0, maxStreak: 0, totalCompletions: 0 });
  const [globalStats, setGlobalStats] = useState({ currentStreak: 0, maxStreak: 0, logDates: [] });

  // Load habits on mount
  useEffect(() => {
    fetchHabits();

    // Fetch global stats from our newly updated endpoint
    habitService
      .getHabitStats()
      .then((res) => {
        if (res.success) {
          setGlobalStats({
            currentStreak: res.data.currentStreak || 0,
            maxStreak: res.data.maxStreak || 0,
            logDates: res.data.recentLogs || [],
          });
        }
      })
      .catch((err) => console.error('Failed to load global stats:', err));
  }, []);

  // Update stats when habits change
  useEffect(() => {
    setStats(getTotalStats());
  }, [habits]);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Open create modal
  const openCreateModal = () => {
    setModalMode('create');
    setEditingHabit(null);
    setModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (habit) => {
    setModalMode('edit');
    setEditingHabit(habit);
    setModalOpen(true);
  };

  // Handle form submission
  const handleModalSubmit = async (formData) => {
    try {
      if (modalMode === 'create') {
        await createNew(formData);
      } else {
        await update(editingHabit._id, formData);
      }
      setModalOpen(false);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Handle delete
  const handleDelete = async (habitId) => {
    if (confirm('Are you sure you want to delete this habit?')) {
      await remove(habitId);
    }
  };

  // TESTING
  // Handle reset for testing
  const handleReset = async (habitId) => {
    try {
      const response = await habitService.resetHabitCompletion(habitId);
      if (response.success) {
        // Update habit in store with reset data
        update(habitId, response.data);
      }
    } catch (err) {
      console.error('Reset error:', err);
    }
  };

  // Handle mark complete
  const handleMarkComplete = async (habitId) => {
    await logCompletion(habitId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <Navbar user={user} onLogout={handleLogout} />
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600 mt-2">Track your daily habits and build consistency</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Habits</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalHabits}</p>
              </div>
              <div>
                <img src={listIcon} alt="Total Habits" className="w-12 h-12" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Best Streak</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-3xl font-bold text-gray-900">{globalStats.maxStreak}</p>
                  <img src={flameIcon} className="w-6 h-6" />
                </div>
              </div>
              <div>
                <img src={bestIcon} alt="Best Streak" className="w-12 h-12" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCompletions}</p>
              </div>
              <div>
                <img src={checkIcon} alt="Completions" className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
            <p className="text-red-700">{error}</p>
            <button onClick={clearError} className="text-red-600 hover:text-red-700 font-medium">
              Dismiss
            </button>
          </div>
        )}

        <TodayProgress habits={habits} />
        <ContributionGraph
          logDates={globalStats.logDates}
          totalHabits={stats.totalHabits}
          userCreatedAt={user?.createdAt}
        />

        {/* Create habit button */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            <Plus size={20} />
            New Habit
          </button>
        </div>

        {/* Loading state */}
        {isLoading && habits.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="text-gray-600 mt-4">Loading your habits...</p>
          </div>
        )}

        {/* Habits list */}
        {!isLoading || habits.length > 0 ? (
          <HabitList
            habits={habits}
            isLoading={isLoading}
            onMarkComplete={handleMarkComplete}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onReset={handleReset}
          />
        ) : null}
      </main>

      <Footer />

      {/* Modal */}
      <HabitModal
        isOpen={modalOpen}
        mode={modalMode}
        habitData={editingHabit}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
