const AuthService = require('../services/auth_service');
const Util = require('../utils/util');

const util =  new Util();

class AuthController {
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.findByCredentials(email, password);
     
      if (!user) {
        util.setError(401, 'Login failed! Check authentication credentials');
        return util.send(res);
      }

      const token = await AuthService.generateAuthToken(user);
      util.setSuccess(200, 'Login succesfull', {
        token: token,
        user_level: user.UserLevel.name
      });

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async logoutFromOneDevice(req, res) {
    try {
      // This will allow user to be logged out from one device
      // by revoking the credential token that was resided on it
      req.user.tokens = req.user.tokens.filter(token => {
        return token !== req.token;
      });

      await req.user.save();
      util.setSuccess(200, 'You are logged out', null);

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async logoutFromAllDevices(req, res) {
    try {
      // This will allow user to be logged out from all devices
      // by revoking all of the credential tokens
      req.user.tokens = []
      
      await req.user.save();
      util.setSuccess(200, 'You are logged out from all devices', null);

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

module.exports = AuthController;