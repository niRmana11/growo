import mongoose from 'mongoose';

const habitLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habit',
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

// Index for quick lookups by user and date
habitLogSchema.index({ userId: 1, completedAt: -1 });

// Index for habit completion history
habitLogSchema.index({ habitId: 1, completedAt: -1 });

export default mongoose.model('HabitLog', habitLogSchema);
