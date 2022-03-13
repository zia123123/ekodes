'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('auths', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      notelp: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.TEXT
      },
      roleid: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      kecamatanId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "kecamatans",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      kelurahanId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "kelurahans",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('auths');
  }
};