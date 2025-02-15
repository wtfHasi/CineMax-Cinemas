import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Cinema from './Cinema.js';
import Film from './Film.js';

const Booking = sequelize.define('Booking', {
  booking_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  showtime: { type: DataTypes.DATE, allowNull: false },
  seat_numbers: { type: DataTypes.STRING }, // e.g., a comma-separated list
  total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

// Associations
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Cinema.hasMany(Booking, { foreignKey: 'cinema_id' });
Booking.belongsTo(Cinema, { foreignKey: 'cinema_id' });

Film.hasMany(Booking, { foreignKey: 'film_id' });
Booking.belongsTo(Film, { foreignKey: 'film_id' });

export default Booking;
