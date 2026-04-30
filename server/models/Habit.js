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
      default: 'other',
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
  return {
    name: this.name,
    category: this.category,
    currentStreak: this.currentStreak,
    bestStreak: this.bestStreak,
    totalCompletions: this.completedDates.length,
    lastCompletedAt: this.lastCompletedAt,
    createdAt: this.createdAt,
  };
};

// Create and export Habit model
const Habit = mongoose.model('Habit', habitSchema);
export default Habit;
