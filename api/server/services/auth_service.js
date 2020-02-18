const models = require('../src/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthService {
  static async findByCredentials(email, password) {
    try {
      const user = await models.User.findOne({
        where: {  email: email },
        include: [{
          model: models.UserLevel,
          attributes: ['name']
        }]
      });
      if (!user) { return null }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      
      if (!isPasswordMatch) { return null }

      return user;
    }
    catch (error) { throw new Error(error) }
  }

  static async generateAuthToken(user) {
    try {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY);
      
      user.tokens = [...user.tokens, token]
      await user.save();

      return token
    }
    catch (error) { throw new Error(error) }
  }
}

module.exports = AuthService;