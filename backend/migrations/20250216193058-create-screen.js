'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Screens', {
    screen_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    cinema_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Cinemas', key: 'cinema_id' }, onDelete: 'CASCADE' },
    screen_number: { type: Sequelize.INTEGER, allowNull: false },
    seating_capacity: { type: Sequelize.INTEGER, allowNull: false }
  });
}

  export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Screens');
  }