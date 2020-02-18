const UserService = require('../services/user_service');
const Util = require('../utils/util');

const util = new Util();

class UsersController {
  static async addUser(req, res) {
    const newUser = req.body;

    try {
      await UserService.addUser(newUser);
      util.setSuccess(201, 'New user is added', {});

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();
      if (allUsers.length > 0) {
        util.setSuccess(200, 'Users data are retrieved', allUsers);
      } else {
        util.setSuccess(200, 'No users are found', []);
      }

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getUser(req, res) {
    const userNum = req.params.num;

    if (!Number(userNum)) {
      util.setError(400, 'Invalid user number');
      return util.send(res);
    }

    try {
      const user = await UserService.getUser(userNum);
      
      if (!user) {
        util.setError(404, `User ${userId} is not found`);
      } else {
        util.setSuccess(200, 'User is found', user);
      }

      return util.send(res);

    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async updateUser(req, res) {
    const updatedData = req.body;
    const userNum = req.params.num;

    if (!Number(userNum)) {
      util.setError(400, 'Invalid user number');
      return util.send(res);
    }

    try {
      const alteredUser = await UserService.updateUser(userNum, updatedData);

      if (!alteredUser) {
        util.setError(404, `User ${userNum} is not found`);
      } else {
        util.setSuccess(200, 'User is updated', alteredUser);
      }

      return util.send(res);
    
    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async deleteUser(req, res) {
    const userNum = req.params.num;

    if (!Number(userNum)) {
      util.setError(400, 'Invalid user number');
      return util.send(res);
    }

    try {
      const deletedUser = await UserService.deleteUser(userId);

      if (deletedUser) {
        util.setSuccess(200, 'User is deleted');
      } else {
        util.setError(404, `User ${userId} is not found`);
      }

      return util.send(res);
      
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

module.exports = UsersController;