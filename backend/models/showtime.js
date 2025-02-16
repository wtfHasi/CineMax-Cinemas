'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Showtime extends Model {}

Showtime.init({
  showtime_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  film_id: { type: DataTypes.INTEGER, allowNull: false },
  screen_id: { type: DataTypes.INTEGER, allowNull: false },
  showtime: { type: DataTypes.DATE, allowNull: false },
  seating_type: { type: DataTypes.ENUM('Lower Hall', 'Upper Gallery', 'VIP'), allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
  sequelize,
  modelName: 'Showtime',
  tableName: 'Showtimes',
  timestamps: false
});

export default Showtime;
