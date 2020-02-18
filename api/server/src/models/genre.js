'use strict';

module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: 'genres',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Genre.associate = function(models) {
    Genre.hasMany(models.Movie, { foreignKey: 'genre_id' });
  }
  return Genre;
}