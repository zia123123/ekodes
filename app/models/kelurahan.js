'use strict';

module.exports = (sequelize, DataTypes) => {

  const kelurahan = sequelize.define('kelurahans', {
    name: {
      type: DataTypes.STRING,
    },
    status:{
      type: DataTypes.BOOLEAN,
    }
  }, {
    tableName: "kelurahans"
  });

  kelurahan.associate = function(models) {
    //calon.belongsTo(models.votes,{ onDelete: 'cascade' },{ constraints: true}, { foreignKey: "voteId"})
    kelurahan.hasMany(models.auths,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "kelurahan"})
    kelurahan.hasMany(models.tokos,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "kelurahan"})
    kelurahan.hasMany(models.ojeks,{ onDelete: 'cascade' },{ constraints: true}, { foreginKey: "kelurahan"})

  };

  return kelurahan;
};