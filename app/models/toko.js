

'use strict';

module.exports = (sequelize, DataTypes) => {

  const toko = sequelize.define('tokos', {
    name: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING
    },
    longitude: {
      type: DataTypes.STRING
    },
    jambuka: {
      type: DataTypes.DATE,
    },
    jamtutup: {
      type: DataTypes.DATE,
    },
    jumlahpembelian: {
      type: DataTypes.INTEGER,
    },
    status:{
      type: DataTypes.BOOLEAN,
    }
  }, {
    tableName: "tokos"
  });

  toko.associate = function(models) {
    toko.belongsTo(models.kecamatans,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "kecamatanId"})
    toko.belongsTo(models.kelurahans,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "kelurahanId"})
    toko.belongsTo(models.auths,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "authId"})
    toko.hasMany(models.products,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "toko"})


  };

  return toko;
};