import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useHabits } from '../hooks/useHabits.js';
import { HabitList } from '../components/habits/HabitList.jsx';
import { HabitModal } from '../components/habits/HabitModal.jsx';
import { LogOut, Plus, TrendingUp } from 'lucide-react';

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

  // Load habits on mount
  useEffect(() => {
    fetchHabits();
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

  // Handle mark complete
  const handleMarkComplete = async (habitId) => {
    await logCompletion(habitId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">GrowO</h1>
              <p className="text-sm text-gray-600">Grow every day. Go every day.</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h2>
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
              <div className="bg-blue-50 p-3 rounded-lg">
                <Plus size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Best Streak</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.maxStreak} 🔥</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCompletions}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <TrendingUp size={24} className="text-purple-600" />
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
          />
        ) : null}
      </main>

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
