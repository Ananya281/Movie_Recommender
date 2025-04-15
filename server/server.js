const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ CORS setup (adjust for frontend deployment)
app.use(cors({
  origin: ['http://localhost:3000', 'https://movie-recommender-2823.vercel.app'],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Root route to confirm deployment
app.get('/', (req, res) => {
  res.send('🎬 Movie Recommender API is running!');
});

// ✅ API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/history', require('./routes/historyRoutes')); // ✅ NEW: History route added

// ✅ Default 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
