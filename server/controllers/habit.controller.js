import Habit from '../models/Habit.js';
import HabitLog from '../models/HabitLog.js';
import User from '../models/User.js';
import { calculateGlobalStreak } from '../services/streak.service.js';

// Create new habit
export const createHabit = async (req, res) => {
  try {
    const { name, description, category, icon } = req.body;

    // SECURE FREEMIUM CHECK: limit to 5 habits for free users
    const user = await User.findById(req.userId);
    if (user.plan !== 'pro') {
      const habitCount = await Habit.countDocuments({ userId: req.userId });

      if (habitCount >= 5) {
        return res.status(403).json({
          success: false,
          message: 'Free plan is limited to 5 habits. Upgrade to Pro for unlimited habits',
        });
      }
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Habit name is required',
      });
    }

    const habit = new Habit({
      userId: req.userId,
      name,
      description: description || '',
      category: category || 'other',
      icon: icon || '⭐',
    });

    await habit.save();

    return res.status(201).json({
      success: true,
      message: 'Habit created successfully',
      data: habit,
    });
  } catch (error) {
    console.error('Create habit error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error creating habit',
    });
  }
};

// Get all habits for logged-in user
export const getUserHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: habits,
    });
  } catch (error) {
    console.error('Get habits error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching habits',
    });
  }
};

// Get habit stats and calendar data
export const getHabitStats = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    const stats = habits.map((habit) => habit.getStats());

    const totalHabits = habits.length;
    const totalCompletions = habits.reduce((sum, h) => sum + h.completedDates.length, 0);

    // Use our new global streak service
    const globalStreakData = await calculateGlobalStreak(req.userId);

    // Fetch logs for the contribution graph (last 30 days for the free tier)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentLogs = await HabitLog.find({
      userId: req.userId,
      completedAt: { $gte: thirtyDaysAgo },
    }).select('completedAt -_id');

    return res.status(200).json({
      success: true,
      data: {
        totalHabits,
        maxStreak: globalStreakData.longestStreak,
        currentStreak: globalStreakData.currentStreak,
        totalCompletions,
        habits: stats,
        recentLogs: recentLogs.map((log) => log.completedAt),
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching stats',
    });
  }
};

// Update habit
export const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, icon } = req.body;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found',
      });
    }

    // Verify ownership - user can only update their own habits
    if (habit.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this habit',
      });
    }

    if (name) habit.name = name;
    if (description !== undefined) habit.description = description;
    if (category) habit.category = category;
    if (icon) habit.icon = icon;

    await habit.save();

    return res.status(200).json({
      success: true,
      message: 'Habit updated successfully',
      data: habit,
    });
  } catch (error) {
    console.error('Update habit error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error updating habit',
    });
  }
};

// Delete habit
export const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found',
      });
    }

    // Verify ownership
    if (habit.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this habit',
      });
    }

    await Habit.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Habit deleted successfully',
    });
  } catch (error) {
    console.error('Delete habit error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error deleting habit',
    });
  }
};

// Log habit completion - mark as done today
export const logHabitCompletion = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found',
      });
    }

    // Verify ownership
    if (habit.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this habit',
      });
    }

    // Check if already logged today (use lastCompletedAt instead of completedDates)
    // This way reset can clear lastCompletedAt without affecting total count
    const today = new Date().toDateString();
    const lastCompletedDate = habit.lastCompletedAt
      ? new Date(habit.lastCompletedAt).toDateString()
      : null;
    const alreadyLogged = lastCompletedDate === today;

    if (alreadyLogged) {
      return res.status(400).json({
        success: false,
        message: 'Habit already logged today',
      });
    }

    // Add today's date to completedDates
    habit.completedDates.push(new Date());

    // Create a detailed log entry for the contribution graph
    const habitLog = new HabitLog({
      userId: req.userId,
      habitId: habit._id,
      completedAt: new Date(),
    });
    await habitLog.save();

    // Increment streak
    await habit.incrementStreak();

    return res.status(200).json({
      success: true,
      message: 'Habit completion logged successfully',
      data: habit,
    });
  } catch (error) {
    console.error('Log completion error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error logging completion',
    });
  }
};

// only for testing purposes
// Simulates next day by clearing lastCompletedAt
// This lets you mark the habit multiple times same day for testing
// Importantly: completedDates stays intact so total never decreases!

// Fully reset habit for testing
export const resetHabitCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({ success: false, message: 'Habit not found' });
    }

    // Verify ownership
    if (habit.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // 1. Wipe all habit stats clean
    habit.lastCompletedAt = null;
    habit.completedDates = [];
    habit.currentStreak = 0;
    habit.bestStreak = 0;
    await habit.save();

    // 2. Delete all logs so the Contribution Heatmap updates
    await HabitLog.deleteMany({ habitId: habit._id });

    return res.status(200).json({
      success: true,
      message: 'Habit fully wiped clean (streaks, logs, and heatmap cleared)',
      data: habit,
    });
  } catch (error) {
    console.error('Reset error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error resetting completion',
    });
  }
};
