'use strict';

module.exports = (sequelize, DataTypes) => {

  const transaksi = sequelize.define('transaksi', {
    nama: {
      type: DataTypes.STRING
    },
    notelp: {
      type: DataTypes.STRING
    },
    koordinat: {
      type: DataTypes.STRING
    },
    catatan: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    typebayar: {
      type: DataTypes.INTEGER
    },
    keranjang: {
      type: DataTypes.TEXT
    },
    idtransaksi: {
      type: DataTypes.INTEGER,
      unique:true
    },
    typetransaksi: {
      type: DataTypes.INTEGER
    },
    idpenjual: {
      type: DataTypes.INTEGER
    },
    idpembeli: {
      type: DataTypes.INTEGER
    },
    ongkir: {
      type: DataTypes.INTEGER
    },
  }, {
    tableName: "transaksis"
  });

  transaksi.associate = function(models) {

  };

  return transaksi;
};