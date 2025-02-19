'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Showtimes', 'price');
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.addColumn('Showtimes', 'price', {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  });
}