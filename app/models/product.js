'use strict';

module.exports = (sequelize, DataTypes) => {

  const product = sequelize.define('products', {
    nama: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.TEXT,
    },
    harga: {
      type: DataTypes.INTEGER,
    },
    status:{
      type: DataTypes.BOOLEAN,
    }
  }, {
    tableName: "products"
  });

  product.associate = function(models) {
    product.belongsTo(models.tokos,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "tokoId"})

  };

  return product;
};