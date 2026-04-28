import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import validator from 'validator';

// User schema definition
const userSchema = new mongoose.Schema(
  {
    // Basic Info
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't include password by default
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },

    // Subscription & Plan
    plan: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free',
    },
    stripeCustomerId: {
      type: String,
      default: null,
    },

    // AI Usage Tracking (for free tier limits)
    aiSummariesUsed: {
      type: Number,
      default: 0,
    },
    aiMessagesUsed: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Get public user data (without password)
userSchema.methods.getPublicData = function () {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
    plan: this.plan,
    aiSummariesUsed: this.aiSummariesUsed,
    aiMessagesUsed: this.aiMessagesUsed,
    createdAt: this.createdAt,
  };
};

// Create and export User model
const User = mongoose.model('User', userSchema);
export default User;
