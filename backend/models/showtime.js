import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Showtime extends Model {}

Showtime.init({
  showtime_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  film_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: 'Films', key: 'film_id' }, 
    onDelete: 'CASCADE' 
  },
  screen_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: 'Screens', key: 'screen_id' }, 
    onDelete: 'CASCADE' 
  },
  showtime: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
  seating_type: { 
    type: DataTypes.ENUM('Lower Hall', 'Upper Gallery', 'VIP'), 
    allowNull: false 
  },
  price: { 
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false 
  }
}, {
  sequelize,
  modelName: 'Showtime',
  tableName: 'Showtimes',
  timestamps: true
});

export default Showtime;

