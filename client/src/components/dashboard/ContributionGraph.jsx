import React from 'react';

export function ContributionGraph({ logDates = [] }) {
  // Generate an array for the last 30 days
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Convert logDates to a Set of simple string dates for easy O(1) lookup
  const completedSet = new Set(
    logDates.map((dateStr) => {
      const d = new Date(dateStr);
      // Adjust for timezone to get the correct local date string
      return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    })
  );

  // Fill the last 30 days backwards
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateString = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
    days.push({
      date: d,
      dateString,
      isCompleted: completedSet.has(dateString),
    });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">30-Day Activity</h3>

      {/* Grid of squares */}
      <div className="flex flex-wrap gap-1.5 md:gap-2">
        {days.map((day, idx) => (
          <div
            key={idx}
            title={`${day.date.toDateString()}${day.isCompleted ? ' (Active)' : ''}`}
            className={`w-6 h-6 md:w-8 md:h-8 rounded-[4px] transition-colors ${
              day.isCompleted ? 'bg-green-500' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex gap-4 text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 bg-gray-100 rounded-[3px]"></div>
          <span className="text-gray-500">Rest</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 bg-green-500 rounded-[3px]"></div>
          <span className="text-gray-500">Active</span>
        </div>
      </div>
    </div>
  );
}
