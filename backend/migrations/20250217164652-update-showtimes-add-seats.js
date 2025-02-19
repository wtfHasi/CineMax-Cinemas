'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Showtimes', 'lower_hall_seats', {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  });

  await queryInterface.addColumn('Showtimes', 'upper_gallery_seats', {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  });

  await queryInterface.addColumn('Showtimes', 'vip_seats', {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  });

  await queryInterface.addColumn('Showtimes', 'base_price', {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 5.00 // Default morning show price
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Showtimes', 'lower_hall_seats');
  await queryInterface.removeColumn('Showtimes', 'upper_gallery_seats');
  await queryInterface.removeColumn('Showtimes', 'vip_seats');
  await queryInterface.removeColumn('Showtimes', 'base_price');
}

