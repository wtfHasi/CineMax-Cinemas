'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Films', {
      film_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      genre: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }
  export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Films');
  }
