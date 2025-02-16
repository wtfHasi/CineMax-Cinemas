import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {}

User.init({
  user_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  username: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  password_hash: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  role: { 
    type: DataTypes.ENUM('Booking Staff', 'Admin', 'Manager'), 
    allowNull: false 
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
  timestamps: true,
});

export default User;
