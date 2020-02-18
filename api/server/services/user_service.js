const models = require('../src/models');

class UserService {
  static async addUser(newUser) {
    try {
      return await models.User.create(newUser);
    }
    catch (error) { throw new Error(error) }
  }

  static async getAllUsers() {
    try {
      return await models.User.findAll({
        include: [{
          model: models.UserLevel,
          attributes: ['name']
        }],
        limit: 10
      });
    }
    catch (error) { throw new Error(error) }
  }

  static async getUser(userNum) {
    try {
      const user = await models.User.findOne({
        where: { order_num: Number(userNum) },
        include: [{
          model: models.UserLevel,
          attributes: ['name']
        }]
      });
      return user;
    }
    catch (error) { throw new Error(error) }
  }

  static async updateUser(userNum, data) {
    try {
      const userToUpdate = await models.User.findOne({
        where: { order_num: Number(userNum) }
      });

      if (userToUpdate) {
        const updatedUser = await models.User.update(data, {
          where: { order_num: Number(userNum) }
        });

        return updatedUser;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }

  static async deleteUser(userNum) {
    try {
      const user = await models.User.findOne({
        where: { order_num: Number(userNum) }
      });

      if (user) {
        const deletedUser = await models.User.destroy({
          where: { order_num: Number(userNum) }
        });

        return deletedUser;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }
}

module.exports = UserService;