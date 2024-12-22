'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    return queryInterface.bulkInsert('products', [{
      id: uuidv4(),
      name: 'Roti Bakar',
      description: 'Description 1',
      price: 5000,
      stock: 10,
      category: 'makanan',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      name: 'Kopi',
      description: 'Description 2',
      price: 2000,
      stock: 20,
      category: 'minuman',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      name: 'Susu Jahe',
      description: 'Description 2',
      price: 2000,
      stock: 10,
      category: 'minuman',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
