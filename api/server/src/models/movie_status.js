'use strict';

module.exports = (sequelize, DataTypes) => {
  const MovieStatus = sequelize.define('MovieStatus', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ['rumored', 'planning', 'post-production',
        'released', 'cancelled'],
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    charset: 'utf8',
    tableName: 'movie_status',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  MovieStatus.associate = function(models) {
    MovieStatus.hasMany(models.Movie, { foreignKey: 'movie_status' });
  }
  return MovieStatus;
}