'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('refresh_tokens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        
      },
      expires_in: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
       type: Sequelize.DATE,
       allowNull: false
      },
      updated_at: {
       type: Sequelize.DATE,
       allowNull: false
      }
    });

    await queryInterface.addConstraint('refresh_tokens', {
      fields: ['user_id'],
      name: 'refresh_tokens_user_id_fkey',
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('refresh_tokens', 'refresh_tokens_user_id_fkey');
    await queryInterface.dropTable('refresh_tokens');
  }
};
