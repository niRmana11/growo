import mongoose from 'mongoose';

// Habit schema definition
const habitSchema = new mongoose.Schema(
  {
    // Relationship to User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },

    // Basic Info
    name: {
      type: String,
      required: [true, 'Habit name is required'],
      trim: true,
      maxlength: [100, 'Habit name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    category: {
      type: String,
      enum: ['coding', 'learning', 'fitness', 'health', 'productivity', 'fun', 'other'],
      required: [true, 'Category is required'],
    },
    icon: {
      type: String,
      default: '⭐',
    },

    // Habit Settings
    frequency: {
      type: String,
      enum: ['daily'],
      default: 'daily',
    },

    // Streak Tracking
    currentStreak: {
      type: Number,
      default: 0,
      min: 0,
    },
    bestStreak: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Completion History
    completedDates: {
      type: [Date],
      default: [],
    },
    lastCompletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Increment streak - called when user marks habit as complete
habitSchema.methods.incrementStreak = function () {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // If we have completed this before, check if the streak was broken
  if (this.lastCompletedAt) {
    const lastDate = new Date(this.lastCompletedAt).toDateString();
    const todayStr = today.toDateString();
    const yesterdayStr = yesterday.toDateString();

    // If the last completion was NOT today and NOT yesterday, you missed a day!
    if (lastDate !== todayStr && lastDate !== yesterdayStr) {
      this.currentStreak = 0; // Reset streak back to 0 before we add 1!
    }
  }

  this.currentStreak += 1;

  if (this.currentStreak > this.bestStreak) {
    this.bestStreak = this.currentStreak;
  }

  this.lastCompletedAt = new Date();
  return this.save();
};

// Reset streak - called if user misses a day
habitSchema.methods.resetStreak = function () {
  this.currentStreak = 0;
  return this.save();
};

// Get habit statistics
habitSchema.methods.getStats = function () {
  let displayStreak = this.currentStreak;

  // If checking the dashboard today, verify if the streak is already broken
  if (this.lastCompletedAt) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastDate = new Date(this.lastCompletedAt).toDateString();
    if (lastDate !== today.toDateString() && lastDate !== yesterday.toDateString()) {
      displayStreak = 0; // Show 0 on the UI because the streak is broken
    }
  }

  return {
    _id: this._id,
    name: this.name,
    description: this.description,
    category: this.category,
    icon: this.icon,
    currentStreak: displayStreak,
    bestStreak: this.bestStreak,
    totalCompletions: this.completedDates.length,
    lastCompletedAt: this.lastCompletedAt,
    createdAt: this.createdAt,
  };
};

// Create and export Habit model
const Habit = mongoose.model('Habit', habitSchema);
export default Habit;
