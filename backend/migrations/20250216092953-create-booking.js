'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Bookings', {
    booking_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'user_id' },
      onDelete: 'CASCADE'
    },
    cinema_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Cinemas', key: 'cinema_id' },
      onDelete: 'CASCADE'
    },
    film_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Films', key: 'film_id' },
      onDelete: 'CASCADE'
    },
    showtime: {
      type: Sequelize.DATE,
      allowNull: false
    },
    seat_numbers: {
      type: Sequelize.STRING
    },
    total_price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
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
  await queryInterface.dropTable('Bookings');
}
