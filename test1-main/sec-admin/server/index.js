import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';
import analyticsRoutes from './routes/analytics.js';
import staffRoutes from './routes/staff.js';
import { errorHandler } from './middleware/errorHandler.js';
import { seedDatabase } from './seeders/createAdmin.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve images statically for all routes
app.use('/images', express.static(path.join(process.cwd(), 'public/images')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/staff', staffRoutes);

// Error handling middleware
app.use(errorHandler);

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    console.log('Attempting to connect to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    });
    
    console.log('✅ Connected to MongoDB successfully');
    
    // Seed database with demo data
    await seedDatabase();
    
    // Start server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📱 Frontend URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
      console.log('\n🔐 Demo Login Credentials:');
      console.log('📧 Email: admin@lenskart.com');
      console.log('🔑 Password: admin123');
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n📋 Troubleshooting steps:');
    console.log('1. Check if MONGODB_URI is correctly set in .env file');
    console.log('2. For local MongoDB: Ensure MongoDB service is running');
    console.log('3. For MongoDB Atlas: Verify connection string and network access');
    console.log('4. Check if your IP is whitelisted in MongoDB Atlas');
    
    // Exit process on connection failure
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📡 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('📡 MongoDB connection closed');
  process.exit(0);
});

// Connect to database
connectDB();