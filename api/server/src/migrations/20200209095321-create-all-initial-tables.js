'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('users', {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
          password: {
            type: Sequelize.STRING(1234),
            allowNull: false
          },
          level_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onUpdate: 'cascade'
          },
          order_num: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false
          },
          tokens: {
            type: Sequelize.ARRAY(Sequelize.STRING(1234))
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          deleted_at: {
            type: Sequelize.DATE
          }
        }, {
          charset: 'utf8',
          underscored: true,
          timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
          deletedAt: 'deleted_at',
          paranoid: true
        }, {transaction: t }),
        queryInterface.createTable('movies', {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false
          },
          plot: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          main_casts: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          producer: {
            type: Sequelize.STRING,
            allowNull: false
          },
          country: {
            type: Sequelize.STRING,
            allowNull: false
          },
          movie_status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onUpdate: 'cascade'
          },
          views_count: {
            type: Sequelize.INTEGER,
            defaultValue: 0
          },
          likes_count: {
            type: Sequelize.INTEGER,
            defaultValue: 0
          },
          has_liked: {
            type: Sequelize.ARRAY(Sequelize.UUID)
          },
          genre_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onUpdate: 'cascade'
          },
          movie_poster: {
            type: Sequelize.STRING
          },
          author_id: {
            type: Sequelize.UUID,
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          released_at: {
            type: Sequelize.DATEONLY
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          deleted_at: {
            type: Sequelize.DATE,
          }
        }, {
          charset: 'utf8',
          underscored: true,
          timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
          deletedAt: 'deleted_at',
          paranoid: true
        }, { transaction: t }),
        queryInterface.createTable('genres', {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }, {
          charset: 'utf8',
          underscored: true,
          timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at'
        }, { transaction: t }),
        queryInterface.createTable('movie_status', {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: Sequelize.ENUM,
            values: ['rumored', 'planning', 'post-production',
              'released', 'cancelled'],
            allowNull: false
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }, {
          charset: 'utf8',
          underscored: true,
          timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at'
        }, { transaction: t }),
        queryInterface.createTable('user_levels', {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }, {
          charset: 'utf8',
          underscored: true,
          timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at'
        }, { transaction: t }),
        queryInterface.createTable('ratings', {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          movie_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          user_id: {
            type: Sequelize.UUID,
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          rating: {
            type: Sequelize.FLOAT,
            allowNull: false
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }, {
          charset: 'utf8',
          underscored: true,
          timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at'
        }, { transaction: t }),
        queryInterface.createTable('favourites', {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          movie_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          total_rating: {
            type: Sequelize.FLOAT,
            allowNull: false
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        }, {
          charset: 'utf8',
          underscored: true,
          timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at'
        }, { transaction: t })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('users', { transaction: t }),
        queryInterface.dropTable('movies', { transaction: t }),
        queryInterface.dropTable('genres', { transaction: t }),
        queryInterface.dropTable('movie_status', { transaction: t }),
        queryInterface.dropTable('user_levels', { transaction: t }),
        queryInterface.dropTable('ratings', { transaction: t }),
        queryInterface.dropTable('favourites', { transaction: t })
      ]);
    });
  }
};
