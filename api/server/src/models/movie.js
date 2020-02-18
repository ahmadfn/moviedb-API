'use strict';

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    plot: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    main_casts: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    producer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    movie_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'cascade'
    },
    views_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    likes_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: true,
        isInt: true,
        notEmpty: true,
        min: 0
      }
    },
    has_liked: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      validate: {
        nonUUIDValidator(value) {
          const regex = RegExp('/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i');
          
          if (!regex.test(value)) {
            throw new Error('Input must be a user ID with UUID4 data type');
          }
        }
      }
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'cascade',
      onDelete: 'cascade',
      references: {
        model: 'genres',
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
    movie_poster: {
      type: DataTypes.STRING,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/No_image_available_400_x_600.svg/512px-No_image_available_400_x_600.svg.png',
      validate: {
        isUrl: true
      }
    },
    author_id: {
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
        isUUID: 4,
        min: 1
      }
    },
    released_at: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: true,
        isDate: true
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
    tableName: 'movies',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: async (movie) => {
        movie.title = await movie.title.toLowerCase();
      }
    }
  });

  Movie.associate = function(models) {
    Movie.hasMany(models.Rating);
    Movie.hasMany(models.Favourite);
    Movie.belongsTo(models.User, { foreignKey: 'author_id' });
    Movie.belongsTo(models.Genre, { foreignKey: 'genre_id' });
    Movie.belongsTo(models.MovieStatus, { foreignKey: 'movie_status' });
  }
  return Movie;
}