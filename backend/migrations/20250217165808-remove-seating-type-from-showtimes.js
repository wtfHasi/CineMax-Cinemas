'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Showtimes', 'seating_type');
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.addColumn('Showtimes', 'seating_type', {
    type: Sequelize.ENUM('Lower Hall', 'Upper Gallery', 'VIP'),
    allowNull: false
  });
}