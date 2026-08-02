import React from 'react';

export function ContributionGraph({ logDates = [], totalHabits = 0, userCreatedAt }) {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Normalize the user creation date so we don't penalize them for days before they joined
  const joinedDate = userCreatedAt ? new Date(userCreatedAt) : new Date();
  joinedDate.setHours(0, 0, 0, 0);

  const dateCounts = {};
  logDates.forEach((dateStr) => {
    const d = new Date(dateStr);
    const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
    dateCounts[localDate] = (dateCounts[localDate] || 0) + 1;
  });

  const getIntensityColor = (count, date) => {
    // 1. If this date was BEFORE the user created their account, make it neutral gray
    if (date < joinedDate) return 'bg-slate-100';

    // 2. Fixed thresholds (No more percentages!)
    if (count === 0) return 'bg-red-500';
    if (count === 1) return 'bg-green-100';
    if (count === 2) return 'bg-green-200';
    if (count === 3) return 'bg-green-300';
    if (count === 4) return 'bg-green-400';
    if (count === 5) return 'bg-green-500';
    return 'bg-green-600'; // 4 or more habits is max green!
  };

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateString = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];

    const count = dateCounts[dateString] || 0;

    days.push({
      date: d,
      count,
      colorClass: getIntensityColor(count, d),
    });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-4">30-Day Activity Heatmap</h3>

      <div className="flex flex-wrap gap-1.5 md:gap-2">
        {days.map((day, idx) => (
          <div
            key={idx}
            title={`${day.date.toDateString()}: ${day.date < joinedDate ? 'Before Joined' : day.count + ' habits completed'}`}
            // CHANGED: Removed cursor-help, added cursor-default so no question mark appears!
            className={`w-6 h-6 md:w-8 md:h-8 rounded-[4px] transition-colors cursor-default hover:opacity-80 ${day.colorClass}`}
          />
        ))}
      </div>

      <div className="mt-4 flex gap-3 text-xs font-medium items-center text-gray-500">
        <span>Empty</span>
        <div className="w-3.5 h-3.5 bg-slate-500 rounded-[3px]"></div>

        <span className="ml-2">Missed</span>
        <div className="w-3.5 h-3.5 bg-red-500 rounded-[3px]"></div>

        <span className="ml-2">Some</span>
        <div className="flex gap-1">
          <div className="w-3.5 h-3.5 bg-green-200 rounded-[3px]"></div>
          <div className="w-3.5 h-3.5 bg-green-300 rounded-[3px]"></div>
          <div className="w-3.5 h-3.5 bg-green-400 rounded-[3px]"></div>
        </div>

        <span className="ml-2">100%</span>
        <div className="w-3.5 h-3.5 bg-green-600 rounded-[3px]"></div>
      </div>
    </div>
  );
}
