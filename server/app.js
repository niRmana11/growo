import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import habitRoutes from './routes/habit.routes.js';
import aiRoutes from './routes/ai.routes.js';
import stripeRoutes from './routes/stripe.routes.js';

const app = express();

// Security & CORS middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// STRIPE WEBHOOK ROUTE (Must be mounted BEFORE express.json())
app.use('/api/stripe', stripeRoutes);

// Logging & parsing middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));
app.use(cookieParser()); // Parse cookies from requests

// API routes
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '✓ GrowO API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Documentation endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GrowO API v1.0',
    version: '1.0.0',
    tagline: 'Grow every day. Go every day.',
    endpoints: {
      health: 'GET /api/health',
      auth: 'POST /api/auth/register, POST /api/auth/login',
      habits: 'GET/POST /api/habits',
      logs: 'GET/POST /api/logs',
      ai: 'POST /api/ai/summary, POST /api/ai/coach',
      subscription: 'GET/POST /api/subscription',
    },
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Habit routes
app.use('/api/habits', habitRoutes);

// AI routes
app.use('/api/ai', aiRoutes);

// Error handling
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;
