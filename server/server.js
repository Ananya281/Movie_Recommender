const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ CORS setup (adjust the origin for production)
app.use(cors({
  origin: ['http://localhost:3000', 'https://movie-recommender-2823.vercel.app'],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());


// ✅ Define root route to test deployment
app.get('/', (req, res) => {
  res.send('🎬 Movie Recommender API is running!');
});

// ✅ Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));

// ✅ Default 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Global error handler (optional)
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
