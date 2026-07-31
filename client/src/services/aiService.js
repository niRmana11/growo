// import api from './api.js';

// // Get the weekly coaching summary
// export const getWeeklySummary = async () => {
//   try {
//     const response = await api.get('/ai/summary');
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to fetch weekly summary');
//   }
// };

// // Send a message to the AI coach
// export const chatWithCoach = async (message) => {
//   try {
//     const response = await api.post('/ai/chat', { message });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to send message to coach');
//   }
// };

// // Get pattern insights from habit data
// export const getInsights = async () => {
//   try {
//     const response = await api.get('/ai/insights');
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to fetch pattern insights');
//   }
// };

// MOCKED FOR UI TESTING
import api from './api.js';

// Get the weekly coaching summary
export const getWeeklySummary = async () => {
  // --- MOCKED FOR UI TESTING ---
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isGated: false, // Change to true if you want to test the Lock UI
        message: 'You have used all your free AI coaching summaries.',
        data: 'This is a mocked summary to save your API tokens while you design! You did a fantastic job tracking your habits this week.',
        usage: { used: 0, allowed: 10 },
      });
    }, 1000);
  });
};

// Send a message to the AI coach
export const chatWithCoach = async (message) => {
  // --- MOCKED FOR UI TESTING ---
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isGated: false, // Change to true if you want to test the Lock UI
        message: 'Upgrade to keep the conversation going with your AI Coach.',
        data: `This is a mocked response to your message: "${message}". Your UI looks great!`,
      });
    }, 1000);
  });
};

// Get pattern insights from habit data
export const getInsights = async () => {
  // --- MOCKED FOR UI TESTING ---
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          'Mocked insight 1: Your consistency is improving heavily on weekends.',
          'Mocked insight 2: You tend to skip your coding habit when you miss your reading habit.',
          'Mocked insight 3: Your completion rate drops by 20% on Thursdays.',
        ],
      });
    }, 1000);
  });
};
