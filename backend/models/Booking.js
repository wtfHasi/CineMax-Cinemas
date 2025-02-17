import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Booking extends Model {}

Booking.init({
  booking_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true },
  user_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: 'Users', key: 'user_id' }, 
    onDelete: 'CASCADE' 
  },
  showtime_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: 'Showtimes', key: 'showtime_id' }, 
    onDelete: 'CASCADE' 
  },
  seat_numbers: { type: DataTypes.STRING },
  total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
  sequelize,
  modelName: 'Booking',
  tableName: 'Bookings',
  timestamps: true
});

export default Booking;
