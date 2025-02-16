import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Import database connections
import sequelize from './config/database.js';
import mongoose from './config/mongoose.js';

// Import your models
import { FilmListing, Screening } from './models/index.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import filmRoutes from './routes/filmRoutes.js';
import cinemaRoutes from './routes/cinemaRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/cinemas', cinemaRoutes);
app.use('/api/bookings', bookingRoutes);

mongoose.connection.once('open', async () => {
  try {
    await FilmListing.createCollection();
    await Screening.createCollection();
    console.log("Collections created");
  } catch (err) {
    console.error("Error creating MongoDB collections:", err);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend Server running on port ${PORT}`));

