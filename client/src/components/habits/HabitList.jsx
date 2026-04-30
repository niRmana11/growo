import { useState } from 'react';
import { HabitCard } from './HabitCard.jsx';

// after testing completed remove onReset
export function HabitList({ habits, isLoading, onMarkComplete, onEdit, onDelete, onReset }) {
  const [filter, setFilter] = useState('all');

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'coding', label: 'Coding' },
    { value: 'learning', label: 'Learning' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'health', label: 'Health' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'fun', label: 'Fun' },
    { value: 'other', label: 'Other' },
  ];

  const filteredHabits =
    filter === 'all' ? habits : habits.filter((habit) => habit.category === filter);

  // Sort by current streak (highest first)
  const sortedHabits = [...filteredHabits].sort((a, b) => b.currentStreak - a.currentStreak);

  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No habits yet</p>
        <p className="text-gray-400 text-sm mt-1">Create your first habit to get started</p>
      </div>
    );
  }

  return (
    <div>
      {/* Category filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm font-medium ${
              filter === cat.value
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Habits count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {filteredHabits.length} habit{filteredHabits.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Habits grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedHabits.map((habit) => (
          <HabitCard
            key={habit._id}
            habit={habit}
            onMarkComplete={onMarkComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            onReset={onReset}
            isLoading={isLoading}
          />
        ))}
      </div>

      {filteredHabits.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No habits in {filter} category</p>
        </div>
      )}
    </div>
  );
}
