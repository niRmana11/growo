import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
await connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║        🚀 GrowO Server Running        ║
║     Grow every day. Go every day.      ║
╠════════════════════════════════════════╣
║  Environment: ${process.env.NODE_ENV || 'development'.padEnd(23)}║
║  Server: http://localhost:${PORT}${' '.repeat(18 - PORT.toString().length)}║
║  Status: ✓ Ready to accept requests    ║
╚════════════════════════════════════════╝
  `);
});
