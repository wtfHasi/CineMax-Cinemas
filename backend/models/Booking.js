import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Cinema from './Cinema.js';
import Film from './Film.js';

class Booking extends Model {}

Booking.init({
  booking_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'user_id' }, onDelete: 'CASCADE' },
  cinema_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Cinemas', key: 'cinema_id' }, onDelete: 'CASCADE' },
  film_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Films', key: 'film_id' }, onDelete: 'CASCADE' },
  showtime: { type: DataTypes.DATE, allowNull: false },
  seat_numbers: { type: DataTypes.STRING },
  total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
  sequelize,
  modelName: 'Booking',
  tableName: 'Bookings',
  timestamps: true
});

// Define associations
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Cinema.hasMany(Booking, { foreignKey: 'cinema_id' });
Booking.belongsTo(Cinema, { foreignKey: 'cinema_id' });

Film.hasMany(Booking, { foreignKey: 'film_id' });
Booking.belongsTo(Film, { foreignKey: 'film_id' });

export default Booking;