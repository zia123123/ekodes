'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tokos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      jambuka: {
        type: Sequelize.DATE
      },
      jamtutup: {
        type: Sequelize.DATE
      },
      jumlahpembelian: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('tokos');
  }
};