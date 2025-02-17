// ----- Mongoose Models (MongoDB) -----
import FilmListing from './FilmListing.js';
import Screening from './screening.js';
// ----- Sequelize Models (Postgre) -----
import User from './user.js';
import Booking from './Booking.js';
import Cinema from './Cinema.js';
import Film from './Film.js';
import Screen from './screen.js';
import Showtime from './showtime.js';

// Define Associations
Cinema.hasMany(Screen, { foreignKey: 'cinema_id' });
Screen.belongsTo(Cinema, { foreignKey: 'cinema_id' });

Film.hasMany(Showtime, { foreignKey: 'film_id' });
Showtime.belongsTo(Film, { foreignKey: 'film_id' });

Screen.hasMany(Showtime, { foreignKey: 'screen_id' });
Showtime.belongsTo(Screen, { foreignKey: 'screen_id' });

User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Showtime.hasMany(Booking, { foreignKey: 'showtime_id' });
Booking.belongsTo(Showtime, { foreignKey: 'showtime_id' });

export { User, Booking, Cinema, Film, Screen, Showtime,
  FilmListing, Screening};