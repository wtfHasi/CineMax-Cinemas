'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Films', {
    film_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false },
    genre: { type: Sequelize.STRING, allowNull: false },
    rating: { type: Sequelize.STRING, allowNull: false },
    duration: { type: Sequelize.INTEGER, allowNull: false },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Films');
}