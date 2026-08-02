import express from 'express';
import { createCheckoutSession, handleWebhook } from '../controllers/stripe.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// The webhook MUST use express.raw to preserve the Stripe signature body!
// If it uses JSON parsing, Stripe validation will fail.
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// The checkout session needs to know which user is buying
router.post('/create-checkout-session', verifyToken, createCheckoutSession);

export default router;
