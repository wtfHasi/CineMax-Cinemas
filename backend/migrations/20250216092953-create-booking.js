'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Bookings', {
    booking_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { 
      type: Sequelize.INTEGER, 
      allowNull: false, 
      references: { model: 'Users', key: 'user_id' }, 
      onDelete: 'CASCADE' 
    },
    showtime_id: { 
      type: Sequelize.INTEGER, 
      allowNull: false, 
      references: { model: 'Showtimes', key: 'showtime_id' }, 
      onDelete: 'CASCADE' 
    },
    seat_numbers: { type: Sequelize.STRING, allowNull: false },
    total_price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Bookings');
}