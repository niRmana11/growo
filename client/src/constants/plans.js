// Single source of truth for feature limits
// Must mirror exactly in server/config/constants.js

export const PLANS = {
  free: {
    maxHabits: 5,
    aiSummariesAllowed: 2,
    aiMessagesPreview: 3,
    analyticsHistoryDays: 7,
    contributionGraphDays: 30,
    insightsPreview: 3,
    defaultCategories: ['coding', 'learning', 'health', 'reading'],
  },
  pro: {
    maxHabits: Infinity,
    aiSummariesAllowed: Infinity,
    aiMessagesPreview: Infinity,
    analyticsHistoryDays: Infinity,
    contributionGraphDays: Infinity,
    insightsPreview: Infinity,
    defaultCategories: 'custom',
  },
};
