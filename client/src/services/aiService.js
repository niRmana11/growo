import api from './api.js';

// Get the weekly coaching summary
export const getWeeklySummary = async () => {
  try {
    const response = await api.get('/ai/summary');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weekly summary');
  }
};

// Send a message to the AI coach
export const chatWithCoach = async (message) => {
  try {
    const response = await api.post('/ai/chat', { message });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send message to coach');
  }
};

// Get pattern insights from habit data
export const getInsights = async () => {
  try {
    const response = await api.get('/ai/insights');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch pattern insights');
  }
};
