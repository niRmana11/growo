import HabitLog from '../models/HabitLog.js';

export const calculateGlobalStreak = async (userId) => {
  const logs = await HabitLog.find({ userId }).sort({ completedAt: -1 });

  if (logs.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const uniqueDates = [
    ...new Set(
      logs.map((log) => {
        const d = new Date(log.completedAt);
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];
      })
    ),
  ];

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  for (let i = 0; i < uniqueDates.length; i++) {
    const currentDate = new Date(uniqueDates[i]);
    currentDate.setHours(0, 0, 0, 0);

    if (i === 0) {
      longestStreak = 1;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const diffDays = Math.round(Math.abs(today - currentDate) / (1000 * 60 * 60 * 24));

      if (diffDays <= 1) {
        currentStreak = 1;
      }
    } else {
      const prevDate = new Date(uniqueDates[i - 1]);
      prevDate.setHours(0, 0, 0, 0);
      const diffDays = Math.round(Math.abs(prevDate - currentDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        tempStreak++;

        if (currentStreak > 0 && i === tempStreak - 1) {
          currentStreak = tempStreak;
        }
      } else {
        tempStreak = 1;
      }

      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    }
  }

  return { currentStreak, longestStreak };
};
