import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Film extends Model {}

Film.init({
  film_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  genre: { type: DataTypes.STRING },
  rating: { type: DataTypes.STRING },
  duration: { type: DataTypes.INTEGER }
}, {
  sequelize,
  modelName: 'Film',
  tableName: 'Films',
  timestamps: true
});

export default Film;