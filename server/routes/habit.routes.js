import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import {
  createHabit,
  getUserHabits,
  getHabitStats,
  updateHabit,
  deleteHabit,
  logHabitCompletion,
  resetHabitCompletion,
} from '../controllers/habit.controller.js';

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Get all user habits
router.get('/', getUserHabits);

// Get aggregated stats for dashboard
router.get('/stats', getHabitStats);

// Create new habit
router.post('/', createHabit);

// Update habit
router.put('/:id', updateHabit);

// Delete habit
router.delete('/:id', deleteHabit);

// Log completion for today
router.post('/:id/log', logHabitCompletion);

// ONLY FOR TESTING PURPOSE
router.post('/:id/reset-completion', resetHabitCompletion);

export default router;
