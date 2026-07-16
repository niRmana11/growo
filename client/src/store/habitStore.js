import { create } from 'zustand';

export const useHabitStore = create((set) => ({
  // State
  habits: [],
  isLoading: false,
  error: null,

  // Actions
  setHabits: (habits) => set({ habits }),

  addHabit: (habit) =>
    set((state) => ({
      habits: [habit, ...state.habits],
    })),

  updateHabit: (habitId, updates) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit._id === habitId ? { ...habit, ...updates } : habit
      ),
    })),

  removeHabit: (habitId) =>
    set((state) => ({
      habits: state.habits.filter((habit) => habit._id !== habitId),
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  // Helper: Get single habit by ID
  getHabitById: (habitId) => useHabitStore.getState().habits.find((habit) => habit._id === habitId),

  // Helper: Get habits by category
  getHabitsByCategory: (category) =>
    useHabitStore.getState().habits.filter((habit) => habit.category === category),

  // Helper: Get total stats
  getTotalStats: () => {
    const state = useHabitStore.getState();
    return {
      totalHabits: state.habits.length,
      maxStreak:
        state.habits.length > 0 ? Math.max(...state.habits.map((h) => h.currentStreak)) : 0,
      totalCompletions: state.habits.reduce((sum, h) => sum + h.completedDates.length, 0),
    };
  },

  // Helper: Get habits sorted by streak
  getHabitsByStreak: () =>
    [...useHabitStore.getState().habits].sort((a, b) => b.currentStreak - a.currentStreak),
}));
