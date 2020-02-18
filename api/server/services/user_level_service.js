const models = require('../src/models');

class UserLevelService {
  static async addUserLevel(newUserLevel) {
    try {
      return await models.UserLevel.create(newUserLevel);
    }
    catch (error) { throw new Error(error) }
  }

  static async getAllUserLevels() {
    try {
      return await models.UserLevel.findAll();
    }
    catch (error) { throw new Error(error) }
  }

  static async getUserLevel(levelId) {
    try {
      const userLevel = await models.UserLevel.findOne({
        where: { id: Number(levelId) }
      });

      return userLevel;
    }
    catch (error) { throw new Error(error) }
  }

  static async updateUserLevel(levelId, data) {
    try {
      const levelToUpdate = await models.UserLevel.findOne({
        where: { id: Number(levelId) }
      });

      if (levelToUpdate) {
        const updatedUserLevel = await models.UserLevel.update(data, {
          where: { id: Number(levelId) }
        });

        return updatedUserLevel;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }

  static async deleteUserLevel(levelId) {
    try {
      const userLevel = await models.userLevel.findOne({
        where: { id: Number(levelId) }
      });

      if (userLevel) {
        const deletedUserLevel = await models.UserLevel.destroy({
          where: { id: Number(levelId) }
        });

        return deletedUserLevel;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }
}

module.exports = UserLevelService;