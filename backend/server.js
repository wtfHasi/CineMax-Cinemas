import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Import database connections
import sequelize from './config/database.js';
import mongoose from './config/mongoose.js';

// Import your models
import { FilmListing, Screening } from './models/index.js';

const app = express();
app.use(express.json());

mongoose.connection.once('open', async () => {
  console.log('MongoDB Connection Established');

  try {
    await FilmListing.createCollection();
    console.log("FilmListing collection created");

    await Screening.createCollection();
    console.log("Screening collection created");
  } catch (err) {
    console.error("Error creating MongoDB collections:", err);
  }
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log("PostgreSQL models synchronized");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Backend Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error synchronizing PostgreSQL models:", err);
  });
