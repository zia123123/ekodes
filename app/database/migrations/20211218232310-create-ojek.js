'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ojeks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      platnomor: {
        type: Sequelize.STRING
      },
      namamotor: {
        type: Sequelize.STRING
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
      authId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "auths",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('ojeks');
  }
};