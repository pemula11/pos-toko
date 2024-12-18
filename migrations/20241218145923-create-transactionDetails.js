'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transaction_detail', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      transaction_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      subtotal: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      created_at: {
       type: Sequelize.DATE,
       allowNull: false
      },
      updated_at: {
       type: Sequelize.DATE,
       allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('transaction_detail', {
      fields: ['product_id'],
      name: 'transactionDetail_product_fkey',
      type: 'foreign key',
      references: {
        table: 'products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('transaction_detail', {
      fields: ['transaction_id'],
      name: 'transactionDetail_transactions_fkey',
      type: 'foreign key',
      references: {
        table: 'transactions',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeConstraint('transaction_detail', 'transactionDetail_product_fkey');
    await queryInterface.removeConstraint('transaction_detail', 'transactionDetail_transactions_fkey');
    await queryInterface.dropTable('transactionDetails');
  }
};
