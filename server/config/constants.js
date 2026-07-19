// Single source of truth for feature limits
// Must mirror exactly in client/src/constants/plans.js

export const PLANS = {
  free: {
    maxHabits: 5,
    aiSummariesAllowed: Infinity, // Temporarily unlimited for testing
    aiMessagesPreview: Infinity, // Temporarily unlimited for testing
    analyticsHistoryDays: 7,
    contributionGraphDays: 30,
    insightsPreview: 1,
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

export const STRIPE_CONFIG = {
  monthlyPriceId: process.env.STRIPE_PRICE_ID_MONTHLY,
  yearlyPriceId: process.env.STRIPE_PRICE_ID_YEARLY,
};
