'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Showtimes', {
    showtime_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    film_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Films', key: 'film_id' }, onDelete: 'CASCADE' },
    screen_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Screens', key: 'screen_id' }, onDelete: 'CASCADE' },
    showtime: { type: Sequelize.DATE, allowNull: false },
    seating_type: { type: Sequelize.ENUM('Lower Hall', 'Upper Gallery', 'VIP'), allowNull: false },
    price: { type: Sequelize.DECIMAL(10, 2), allowNull: false }
  });
}

  export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Showtimes');
  }