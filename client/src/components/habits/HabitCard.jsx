import { Edit2, RotateCcw, Trash2 } from 'lucide-react';
import { getHabitIcon } from '../../utils/habitIcons.js';

// after the testing completed remove onReset
export function HabitCard({ habit, onMarkComplete, onEdit, onDelete, onReset, isLoading }) {
  const today = new Date().toDateString();
  const lastCompleted = habit.lastCompletedAt
    ? new Date(habit.lastCompletedAt).toDateString()
    : null;

  const isCompletedToday = lastCompleted === today;

  const categoryColors = {
    coding: 'bg-blue-50 text-blue-700 border-blue-200',
    learning: 'bg-purple-50 text-purple-700 border-purple-200',
    fitness: 'bg-red-50 text-red-700 border-red-200',
    health: 'bg-green-50 text-green-700 border-green-200',
    productivity: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    fun: 'bg-orange-50 text-orange-700 border-orange-200',
    other: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  const getCategoryBadgeColor = () => categoryColors[habit.category] || categoryColors.other;

  const icon = getHabitIcon(habit.icon);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          {/* HABIT ICON (PNG ONLY) */}
          <img
            src={icon?.src}
            alt={icon?.label}
            className="w-8 h-8 object-contain flex-shrink-0 mt-1 transition-transform duration-300 hover:scale-110"
          />

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{habit.name}</h3>
            {habit.description && <p className="text-sm text-gray-600 mt-1">{habit.description}</p>}
          </div>
        </div>

        {/* ACTION ICONS (Lucide only here) */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(habit)}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            title="Edit habit"
            disabled={isLoading}
          >
            <Edit2 size={16} className="text-gray-500" />
          </button>

          <button
            onClick={() => onReset(habit._id)}
            className="p-1.5 hover:bg-yellow-50 rounded transition-colors"
            title="Reset for testing"
            disabled={isLoading}
          >
            <RotateCcw size={16} className="text-gray-400 hover:text-yellow-600" />
          </button>

          <button
            onClick={() => onDelete(habit._id)}
            className="p-1.5 hover:bg-red-50 rounded transition-colors"
            title="Delete habit"
            disabled={isLoading}
          >
            <Trash2 size={16} className="text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* CATEGORY */}
      <div className="mb-3">
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryBadgeColor()}`}
        >
          {habit.category}
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{habit.currentStreak}</div>
          <div className="text-xs text-gray-600">Current</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">{habit.bestStreak}</div>
          <div className="text-xs text-gray-600">Best</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">{habit.completedDates.length}</div>
          <div className="text-xs text-gray-600">Total</div>
        </div>
      </div>

      {/* STATUS */}
      <div className="text-xs text-gray-500 mb-4">
        {isCompletedToday ? (
          <span className="text-green-600 font-medium flex items-center gap-1">✅ Done today</span>
        ) : lastCompleted ? (
          <span>Last: {new Date(habit.lastCompletedAt).toLocaleDateString()}</span>
        ) : (
          <span>Never completed</span>
        )}
      </div>

      {/* MAIN BUTTON */}
      <button
        onClick={() => onMarkComplete(habit._id)}
        disabled={isLoading || isCompletedToday}
        className={`w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
          isCompletedToday
            ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {isCompletedToday ? 'Completed Today' : 'Mark Complete'}
      </button>
    </div>
  );
}
