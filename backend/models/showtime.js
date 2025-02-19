import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Showtime extends Model {}

Showtime.init({
  showtime_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  film_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Films', key: 'film_id' }, onDelete: 'CASCADE' },
  screen_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Screens', key: 'screen_id' }, onDelete: 'CASCADE' },
  showtime: { type: DataTypes.DATE, allowNull: false },
  lower_hall_seats: { type: DataTypes.INTEGER, allowNull: false }, // 30% of total
  upper_gallery_seats: { type: DataTypes.INTEGER, allowNull: false }, // 60% of total
  vip_seats: { type: DataTypes.INTEGER, allowNull: false }, // Max 10 seats
  base_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false } // Price for Lower Hall seats
}, {
  sequelize,
  modelName: 'Showtime',
  tableName: 'Showtimes',
  timestamps: true
});

export default Showtime;


