'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      transaction_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      total_amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
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

    await queryInterface.addConstraint('transactions', {
      fields: ['created_by'],
      name: 'transaction_user_id_fkey',
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
 

  

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};
