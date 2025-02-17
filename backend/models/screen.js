import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Screen extends Model {}

Screen.init({
  screen_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  cinema_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { 
      model: 'Cinemas', 
      key: 'cinema_id' 
    }, 
    onDelete: 'CASCADE' 
  },
  screen_number: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  seating_capacity: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  }
}, {
  sequelize,
  modelName: 'Screen',
  tableName: 'Screens',
  timestamps: true
});

export default Screen;

