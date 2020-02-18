'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(1234),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        min: 60
      }
    },
    level_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'cascade',
      defaultValue: 2,
      references: {
        model: 'user_levels',
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
    order_num: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isNumeric: true,
        isInt: true,
        min: 1 
      }
    },
    tokens: {
      type: DataTypes.ARRAY(DataTypes.STRING(1234)),
      defaultValue: []
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE
    }
  }, {
    charset: 'utf8',
    tableName: 'users',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  });

  User.associate = function(models) {
    User.belongsTo(models.UserLevel, { foreignKey: 'level_id' });
    User.hasMany(models.Rating);
    User.hasMany(models.Movie, { foreignKey: 'author_id' });
  }
  return User;
}