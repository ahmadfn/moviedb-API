const UserLevelService = require('../services/user_level_service');
const Util = require('../utils/util');

const util = new Util();

class UserLevelsController {
  static async addUserLevel(req, res) {
    const newUserLevel = req.body;

    try {
      const createdData = await UserLevelService.addUserLevel(newUserLevels);
      util.setSuccess(201, 'User level is added', createdData);

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getAllUserLevels(req, res) {
    try {
      const allUserLevels = await UserLevelService.getAllUserLevels();
      if (allUserLevels.length > 0) {
        util.setSuccess(200, 'All user levels are retrieved', allUserLevels);
      } else {
        util.setSuccess(200, 'No all user levels are found', []);
      }

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getUserLevel(req, res) {
    const levelId = req.params.id;

    if (!Number(levelId)) {
      util.setError(400, 'Invalid user level ID');
      return util.send(res);
    }

    try {
      const userLevel = await UserLevelService.getUserLevel(levelId);
      
      if (!userLevel) {
        util.setError(404, `User level ${levelId} is not found`);
      } else {
        util.setSuccess(200, 'User level is found', userLevel);
      }

      return util.send(res);

    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async updateUserLevel(req, res) {
    const updatedData = req.body;
    const levelId = req.params.id;

    if (!Number(levelId)) {
      util.setError(400, 'Invalid user level ID');
      return util.send(res);
    }

    try {
      const data = await UserLevelService.updateUserLevel(levelId, updatedData)

      if (!data) {
        util.setError(404, `User level ${levelId} is not found`);
      } else {
        util.setSuccess(200, 'User level is updated', data);
      }

      return util.send(res);
    
    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async deleteUserLevel(req, res) {
    const levelId = req.params;

    if (!Number(levelId)) {
      util.setError(400, 'Invalid user level ID');
      return util.send(res);
    }

    try {
      const deletedData = await UserLevelService.deleteUserLevel(levelId);

      if (deletedData) {
        util.setSuccess(200, 'User level is deleted');
      } else {
        util.setError(404, `User level ${levelId} is not found`);
      }

      return util.send(res);
      
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

module.exports = UserLevelsController;