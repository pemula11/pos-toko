'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await  queryInterface.createTable('products', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: 'No description'
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        defaultValue: 'Uncategorized',
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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
