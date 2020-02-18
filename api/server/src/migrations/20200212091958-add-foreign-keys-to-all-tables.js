'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addConstraint('users', ['level_id'], {
          type: 'foreign key',
          name: 'level_id_fkey',
          references: {
            table: 'user_levels',
            field: 'id'
          },
          onUpdate: 'cascade'
        }, { transaction: t }),
        queryInterface.addConstraint('movies', ['movie_status'], {
          type: 'foreign key',
          name: 'movie_status_fkey',
          references: {
            table: 'movie_status',
            field: 'id'
          },
          onUpdate: 'cascade'
        }, { transaction: t }),
        queryInterface.addConstraint('movies', ['genre_id'], {
          type: 'foreign key',
          name: 'genre_id_fkey',
          references: {
            table: 'genres',
            field: 'id'
          },
          onUpdate: 'cascade'
        }, { transaction: t }),
        queryInterface.addConstraint('movies', ['author_id'], {
          type: 'foreign key',
          name: 'author_id_fkey',
          references: {
            table: 'users',
            field: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }, { transaction: t }),
        queryInterface.addConstraint('ratings', ['movie_id'], {
          type: 'foreign key',
          name: 'movie_id_fkey',
          references: {
            table: 'movies',
            field: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }, { transaction: t }),
        queryInterface.addConstraint('ratings', ['user_id'], {
          type: 'foreign key',
          name: 'user_id_fkey',
          references: {
            table: 'users',
            field: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }, { transaction: t }),
        queryInterface.addConstraint('favourites', ['movie_id'], {
          type: 'foreign key',
          name: 'movie_id_fkey',
          references: {
            table: 'movies',
            field: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }, { transaction: t })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeConstraint('users', 'level_id_fkey', {
          transaction: t 
        }),
        queryInterface.removeConstraint('movies', 'movie_status_fkey', {
          transaction: t 
        }),
        queryInterface.removeConstraint('movies', 'genre_id_fkey', {
          transaction: t 
        }),
        queryInterface.removeConstraint('movies', 'author_id_fkey', {
          transaction: t 
        }),
        queryInterface.removeConstraint('ratings', 'movie_id_fkey', {
          transaction: t 
        }),
        queryInterface.removeConstraint('ratings', 'user_id_fkey', {
          transaction: t 
        }),
        queryInterface.removeConstraint('favourites', 'movie_id_fkey', {
          transaction: t 
        })
      ]);
    });
  }
};
