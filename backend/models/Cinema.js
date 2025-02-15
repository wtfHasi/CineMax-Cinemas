import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cinema = sequelize.define('Cinema', {
  cinema_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  city: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  screen_count: { type: DataTypes.INTEGER, allowNull: false }
});

export default Cinema;
