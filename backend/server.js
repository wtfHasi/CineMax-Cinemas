import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Import database connections
import sequelize from './config/database.js';
import mongoose from './config/mongoose.js';

// Import your models so they get registered with Sequelize
import './models/index.js';

const app = express();
app.use(express.json());

// Synchronize Sequelize models with the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log("PostgreSQL models synchronized");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Backend Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error synchronizing models:", err);
  });