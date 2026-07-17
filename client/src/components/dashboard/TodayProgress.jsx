import React from 'react';

export function TodayProgress({ habits }) {
  const today = new Date().toDateString();

  const total = habits.length;

  // Count how many habits have a lastCompletedAt date matching today
  const completed = habits.filter((habit) => {
    const lastCompleted = habit.lastCompletedAt
      ? new Date(habit.lastCompletedAt).toDateString()
      : null;
    return lastCompleted === today;
  }).length;

  const progressPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Today's Progress</h3>
          <p className="text-sm text-gray-500">
            {completed} of {total} habits completed
          </p>
        </div>
        <div className="text-3xl font-bold text-green-600">{progressPercentage}%</div>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden mt-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {progressPercentage === 100 && total > 0 && (
        <p className="text-sm text-green-600 font-medium mt-4 text-center bg-green-50 py-2 rounded-md">
          🎉 Incredible work! You crushed all your habits today!
        </p>
      )}
    </div>
  );
}
