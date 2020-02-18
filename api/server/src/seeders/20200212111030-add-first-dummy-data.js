'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('user_levels', [{
          name: 'admin',
          created_at: new Date(),
          updated_at: new Date()
        }, {
          name: 'external',
          created_at: new Date(),
          updated_at: new Date()
        }], { transaction: t }),
        queryInterface.bulkInsert('movie_status', [{
          name: 'rumored',
          created_at: new Date(),
          updated_at: new Date()
        }, {
          name: 'planning',
          created_at: new Date(),
          updated_at: new Date()
        }, {
          name: 'post-production',
          created_at: new Date(),
          updated_at: new Date()
        }, {
          name: 'released',
          created_at: new Date(),
          updated_at: new Date()
        }, {
          name: 'cancelled',
          created_at: new Date(),
          updated_at: new Date()
        }], { transaction: t }),
        queryInterface.bulkInsert('genres', [{
          name: 'action',
          created_at: new Date(),
          updated_at: new Date()
        }, {
          name: 'science fiction',
          created_at: new Date(),
          updated_at: new Date()
        }, {
          name: 'comedy',
          created_at: new Date(),
          updated_at: new Date()
        }], { transaction: t })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkDelete('user_levels', null, { transaction: t }),
        queryInterface.bulkDelete('movie_status', null, { transaction:t }),
        queryInterface.bulkDelete('genres', null, { transaction:t })
      ]);
    });
  }
};
