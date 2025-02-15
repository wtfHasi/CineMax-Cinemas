// ----- Sequelize Models (PostgreSQL) -----
import User from './User.js';
import Cinema from './Cinema.js';
import Film from './Film.js';
import Booking from './Booking.js';
import sequelize from '../config/database.js';

console.log("Sequelize models loaded:", Object.keys(sequelize.models));

// ----- Mongoose Models (MongoDB) -----
import FilmListing from './FilmListing.js';
import Screening from './Screening.js';

console.log("Mongoose models loaded:", {
  FilmListing: FilmListing.modelName,
  Screening: Screening.modelName
});

export {
  User,
  Cinema,
  Film,
  Booking,

  FilmListing,
  Screening
};
