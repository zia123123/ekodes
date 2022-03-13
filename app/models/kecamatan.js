'use strict';

module.exports = (sequelize, DataTypes) => {

  const kecamatan = sequelize.define('kecamatans', {
    name: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
    status:{
      type: DataTypes.BOOLEAN,
    }
  }, {
    tableName: "kecamatans"
  });

  kecamatan.associate = function(models) {
    //calon.belongsTo(models.votes,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "voteId"})
    kecamatan.hasMany(models.auths,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "kecamatan"})
    kecamatan.hasMany(models.tokos,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "kecamatan"})
    kecamatan.hasMany(models.ojeks,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "kecamatan"})
  };

  return kecamatan;
};