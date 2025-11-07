const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './src/.env' });

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://regalia-frontend.vercel.app",
    "https://regalia-backend.vercel.app",
    "http://localhost:4000",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0,
  maxPoolSize: 10,
  minPoolSize: 5
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const planLimitRoutes = require('./Route/planLimitRoutes/planLimitRoutes');
const banquetBookingRoutes = require('./Route/planLimitRoutes/banquetBookingRoutes');
const banquetCategoryRoutes = require('./Route/planLimitRoutes/banquetCategoryRoutes');
const banquetMenuRoutes = require('./Route/planLimitRoutes/banquetMenuRoutes');
const menuItemRoutes = require('./Route/planLimitRoutes/menuItemRoutes');

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Regalia Banquet Backend API' });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working', timestamp: new Date() });
});

app.use('/api/plan-limits', planLimitRoutes);
app.use('/api/bookings', banquetBookingRoutes);
app.use('/api/categories', banquetCategoryRoutes);
app.use('/api/menus', banquetMenuRoutes);
app.use('/api/menu-items', menuItemRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});