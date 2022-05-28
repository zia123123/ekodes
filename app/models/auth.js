'use strict';

module.exports = (sequelize, DataTypes) => {

  const auth = sequelize.define('auths', {
    name: {
      type: DataTypes.STRING,
    },
    notelp: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    roleid: {
      type: DataTypes.INTEGER
    },
    token: {
      type: DataTypes.TEXT,
    },
    status:{
      type: DataTypes.BOOLEAN,
    }
  }, {
    tableName: "auths"
  });

  auth.associate = function(models) {
    auth.belongsTo(models.kecamatans,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "kecamatanId"})
    auth.belongsTo(models.kelurahans,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "kelurahanId"})
    auth.hasMany(models.tokos,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "authId"})
  };

  return auth;
};