import User from '../models/User.js';
import Habit from '../models/Habit.js';
import HabitLog from '../models/HabitLog.js';
import * as aiService from '../services/ai.service.js';
import { PLANS } from '../config/constants.js';

// 1. Get Weekly Coaching Summary
export const getWeeklySummary = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    // Soft Gate Check: Free users get limited summaries (Trigger 2)
    if (user.plan === 'free' && user.aiSummariesUsed >= PLANS.free.aiSummariesAllowed) {
      return res.status(200).json({
        success: true,
        isGated: true,
        message: 'You have used all your free AI coaching summaries.',
      });
    }

    // Fetch the data to give to Gemini
    const habits = await Habit.find({ userId: req.userId });

    // Get last 7 days of logs
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const logs = await HabitLog.find({
      userId: req.userId,
      completedAt: { $gte: sevenDaysAgo },
    });

    // Ask Gemini for the summary
    const summary = await aiService.generateWeeklySummary(user, habits, logs);

    // Track usage for free users using atomic $inc to prevent VersionError crashes
    if (user.plan === 'free') {
      await User.updateOne({ _id: user._id }, { $inc: { aiSummariesUsed: 1 } });
      user.aiSummariesUsed += 1; // update local object for the response below
    }

    return res.status(200).json({
      success: true,
      isGated: false,
      data: summary,
      usage: {
        used: user.aiSummariesUsed,
        allowed: PLANS.free.aiSummariesAllowed,
      },
    });
  } catch (error) {
    console.error('Weekly summary error:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate AI summary' });
  }
};

// 2. Chat with AI Coach
export const chatWithCoach = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const user = await User.findById(req.userId);

    // Soft Gate Check: Mid-conversation limits for free users (Trigger 3)
    if (user.plan === 'free' && user.aiMessagesUsed >= PLANS.free.aiMessagesPreview) {
      return res.status(200).json({
        success: true,
        isGated: true,
        message: 'Upgrade to keep the conversation going with your AI Coach.',
      });
    }

    const habits = await Habit.find({ userId: req.userId });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentLogs = await HabitLog.find({
      userId: req.userId,
      completedAt: { $gte: sevenDaysAgo },
    });

    const reply = await aiService.generateCoachReply(user, habits, recentLogs, message);

    if (user.plan === 'free') {
      await User.updateOne({ _id: user._id }, { $inc: { aiMessagesUsed: 1 } });
    }

    return res.status(200).json({
      success: true,
      isGated: false,
      data: reply,
    });
  } catch (error) {
    console.error('Coach chat error:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate coach reply' });
  }
};

//  3. Get Pattern Insights
export const getInsights = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const habits = await Habit.find({ userId: req.userId });
    const logs = await HabitLog.find({ userId: req.userId }); // All logs for deep patterns

    // Generate 3 insights
    const allInsights = await aiService.generateInsights(user, habits, logs);

    // Soft Gate: Show 1, hide the rest! (Trigger 5)
    let finalInsights = allInsights;
    if (user.plan === 'free') {
      finalInsights = [allInsights[0], 'BLURRED', 'BLURRED'];
    }

    return res.status(200).json({
      success: true,
      data: finalInsights,
    });
  } catch (error) {
    console.error('Insights error:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate insights' });
  }
};
