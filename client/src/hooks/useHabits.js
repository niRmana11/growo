import { useCallback, useEffect } from 'react';
import { useHabitStore } from '../store/habitStore.js';
import * as habitService from '../services/habitService.js';

export const useHabits = () => {
  // Get store actions and state
  const habits = useHabitStore((state) => state.habits);
  const isLoading = useHabitStore((state) => state.isLoading);
  const error = useHabitStore((state) => state.error);
  const setHabits = useHabitStore((state) => state.setHabits);
  const addHabit = useHabitStore((state) => state.addHabit);
  const updateHabit = useHabitStore((state) => state.updateHabit);
  const removeHabit = useHabitStore((state) => state.removeHabit);
  const setLoading = useHabitStore((state) => state.setLoading);
  const setError = useHabitStore((state) => state.setError);
  const clearError = useHabitStore((state) => state.clearError);
  const getTotalStats = useHabitStore((state) => state.getTotalStats);

  // Fetch all user habits
  const fetchHabits = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      const response = await habitService.getUserHabits();
      if (response.success) {
        setHabits(response.data);
      } else {
        setError(response.message || 'Failed to fetch habits');
      }
    } catch (err) {
      setError(err.message || 'Error fetching habits');
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearError, setHabits, setError]);

  // Create new habit
  const createNew = useCallback(
    async (habitData) => {
      try {
        setLoading(true);
        clearError();
        const response = await habitService.createHabit(habitData);
        if (response.success) {
          addHabit(response.data);
          return response.data;
        } else {
          setError(response.message || 'Failed to create habit');
        }
      } catch (err) {
        setError(err.message || 'Error creating habit');
      } finally {
        setLoading(false);
      }
    },
    [setLoading, clearError, addHabit, setError]
  );

  // Update existing habit
  const update = useCallback(
    async (habitId, habitData) => {
      try {
        setLoading(true);
        clearError();
        const response = await habitService.updateHabit(habitId, habitData);
        if (response.success) {
          updateHabit(habitId, response.data);
          return response.data;
        } else {
          setError(response.message || 'Failed to update habit');
        }
      } catch (err) {
        setError(err.message || 'Error updating habit');
      } finally {
        setLoading(false);
      }
    },
    [setLoading, clearError, updateHabit, setError]
  );

  // Delete habit
  const remove = useCallback(
    async (habitId) => {
      try {
        setLoading(true);
        clearError();
        const response = await habitService.deleteHabit(habitId);
        if (response.success) {
          removeHabit(habitId);
        } else {
          setError(response.message || 'Failed to delete habit');
        }
      } catch (err) {
        setError(err.message || 'Error deleting habit');
      } finally {
        setLoading(false);
      }
    },
    [setLoading, clearError, removeHabit, setError]
  );

  // Log completion (mark as done today)
  const logCompletion = useCallback(
    async (habitId) => {
      try {
        clearError();
        const response = await habitService.logHabitCompletion(habitId);
        if (response.success) {
          // Update the habit with new streak data
          updateHabit(habitId, response.data);
          return response.data;
        } else {
          setError(response.message || 'Failed to log completion');
        }
      } catch (err) {
        setError(err.message || 'Error logging completion');
      }
    },
    [clearError, updateHabit, setError]
  );

  return {
    // State
    habits,
    isLoading,
    error,

    // Actions
    fetchHabits,
    createNew,
    update,
    remove,
    logCompletion,
    getTotalStats,
    clearError,
  };
};
