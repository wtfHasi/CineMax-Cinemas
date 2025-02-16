'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    user_id: DataTypes.INTEGER,
    cinema_id: DataTypes.INTEGER,
    film_id: DataTypes.INTEGER,
    showtime: DataTypes.DATE,
    seat_numbers: DataTypes.STRING,
    total_price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};