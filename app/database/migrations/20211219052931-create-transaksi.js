'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaksis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      notelp: {
        type: Sequelize.STRING
      },
      koordinat: {
        type: Sequelize.STRING
      },
      catatan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      typebayar: {
        type: Sequelize.INTEGER
      },
      keranjang: {
        type: Sequelize.TEXT
      },
      idtransaksi: {
        type: Sequelize.INTEGER,
        unique:true
      },
      typetransaksi: {
        type: Sequelize.INTEGER
      },
      idpenjual: {
        type: Sequelize.INTEGER
      },
      idpembeli: {
        type: Sequelize.INTEGER
      },
      ongkir: {
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transaksis');
  }
};