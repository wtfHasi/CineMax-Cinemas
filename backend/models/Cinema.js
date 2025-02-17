import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Cinema extends Model {}

Cinema.init({
  cinema_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  city: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  location: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  screen_count: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  }
}, {
  sequelize,
  modelName: 'Cinema',
  tableName: 'Cinemas',
  timestamps: true
});

export default Cinema;