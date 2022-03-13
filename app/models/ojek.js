'use strict';

module.exports = (sequelize, DataTypes) => {

  const ojek = sequelize.define('ojeks', {
    nama: {
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
    platnomor: {
      type: DataTypes.STRING,
    },
    namamotor: {
      type: DataTypes.STRING,
    },
    status:{
      type: DataTypes.BOOLEAN,
    }
  }, {
    tableName: "ojeks"
  });

  ojek.associate = function(models) {
    ojek.belongsTo(models.kecamatans,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "kecamatanId"})
    ojek.belongsTo(models.kelurahans,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "kelurahanId"})
    ojek.belongsTo(models.auths,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "authId"})
  };

  return ojek;
};