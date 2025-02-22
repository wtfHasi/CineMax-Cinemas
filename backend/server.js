import express from 'express';
import dotenv from 'dotenv';
import mongoose from './config/mongoose.js';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Import routes
import userRoutes from './routes/userRoutes.js';
import filmRoutes from './routes/filmRoutes.js';
import cinemaRoutes from './routes/cinemaRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import screenRoutes from './routes/screenRoutes.js';
import showtimeRoutes from './routes/showtimeRoutes.js';

const app = express();
app.use(express.json());

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/cinemas', cinemaRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/screens', screenRoutes);
app.use('/api/showtimes', showtimeRoutes);

// Log MongoDB Connection
mongoose.connection.once('open', () => {});

// Graceful shutdown handler
const shutdown = async () => {
  console.log('\nShutting down server...');
  await prisma.$disconnect();
  await mongoose.connection.close();
  console.log('Server shutted down gracefully!');
  process.exit(0);
};

// Handle termination signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend Server running on port ${PORT}`));