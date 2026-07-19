import express from 'express';
import { getWeeklySummary, chatWithCoach, getInsights } from '../controllers/ai.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// All AI routes require the user to be logged in
router.use(verifyToken);

// Get the weekly coaching summary (Soft Gated)
router.get('/summary', getWeeklySummary);

// Send a message to the AI coach (Soft Gated)
router.post('/chat', chatWithCoach);

// Get pattern insights from habit data (Soft Gated)
router.get('/insights', getInsights);

export default router;
