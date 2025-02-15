import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Film = sequelize.define('Film', {
  film_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  genre: { type: DataTypes.STRING },
  rating: { type: DataTypes.STRING },
  duration: { type: DataTypes.INTEGER } // duration in minutes
});

export default Film;