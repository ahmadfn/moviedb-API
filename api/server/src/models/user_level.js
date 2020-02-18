'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserLevel = sequelize.define('UserLevel', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'user_levels',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  UserLevel.associate = function(models) {
    UserLevel.hasMany(models.User, { foreignKey: 'level_id' });
  }
  return UserLevel;
}