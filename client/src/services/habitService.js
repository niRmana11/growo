import api from './api.js';

// Create new habit
export const createHabit = async (habitData) => {
  try {
    const response = await api.post('/habits', habitData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Get all user habits
export const getUserHabits = async () => {
  try {
    const response = await api.get('/habits');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Get habit statistics for dashboard
export const getHabitStats = async () => {
  try {
    const response = await api.get('/habits/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Update habit
export const updateHabit = async (habitId, habitData) => {
  try {
    const response = await api.put(`/habits/${habitId}`, habitData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Delete habit
export const deleteHabit = async (habitId) => {
  try {
    const response = await api.delete(`/habits/${habitId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Log habit completion for today
export const logHabitCompletion = async (habitId) => {
  try {
    const response = await api.post(`/habits/${habitId}/log`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// only for TESTING
// Reset habit completion for testing (remove today's entry)
export const resetHabitCompletion = async (habitId) => {
  try {
    const response = await api.post(`/habits/${habitId}/reset-completion`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};
