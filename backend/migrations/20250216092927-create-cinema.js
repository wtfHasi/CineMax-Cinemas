'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Cinemas', {
    cinema_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    city: { type: Sequelize.STRING, allowNull: false },
    location: { type: Sequelize.STRING, allowNull: false },
    screen_count: { type: Sequelize.INTEGER, allowNull: false },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Cinemas');
}