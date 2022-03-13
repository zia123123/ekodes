'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  transaksi.init({
    nama: DataTypes.STRING,
    notelp: DataTypes.STRING,
    koordinat: DataTypes.STRING,
    catatan: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    typebayar: DataTypes.INTEGER,
    keranjang: DataTypes.TEXT,
    idtransaksi: DataTypes.INTEGER,
    typetransaksi: DataTypes.INTEGER,
    idpenjual: DataTypes.INTEGER,
    idpembeli: DataTypes.INTEGER,
    ongkir: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};