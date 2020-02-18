'use strict';

module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'cascade',
      onDelete: 'cascade',
      references: {
        model: 'movies',
        key: 'id'
      },
      validate: {
        notNull: true,
        notEmpty: true,
        isNumeric: true,
        isInt: true,
        min: 1
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'cascade',
      onDelete: 'cascade',
      references: {
        model: 'users',
        key: 'id'
      },
      validate: {
        notNull: true,
        notEmpty: true,
        isNumeric: true,
        isInt: true,
        min: 1
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: false,
        notEmpty: false,
        isFloat: true,
        min: 0
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
    tableName: 'ratings',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Rating.associate = function(models) {
    Rating.belongsTo(models.Movie);
    Rating.belongsTo(models.User);
  }
  return Rating;
}