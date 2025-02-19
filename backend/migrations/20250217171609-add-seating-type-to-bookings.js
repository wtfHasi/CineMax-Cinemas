'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Bookings', 'seating_type', {
    type: Sequelize.ENUM('Lower Hall', 'Upper Gallery', 'VIP'),
    allowNull: false
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Bookings', 'seating_type');
}