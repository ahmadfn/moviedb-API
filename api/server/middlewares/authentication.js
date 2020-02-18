const jwt = require('jsonwebtoken');
const models = require('../src/models');
require('dotenv').config();

const authentication = async (req, res, next) => {
  if (!req.header('Authorization')) {
    return next(new Error('Access denied. Token credential must be provided'));
  }

  const token = req.header('Authorization').replace('Bearer ', '');
  const data = jwt.verify(token, process.env.JWT_KEY);

  try {
    const user = await models.User.findOne({
      where: { id: data.userId },
      include: [{
        model: models.UserLevel,
        attributes: ['name']
      }]
    });
    const tokenSaved = user.tokens.find(element => element === token);
    
    if (!user || !tokenSaved) {
      return next(new Error('Access denied. Token credential is invalid'));
    }

    req.user = user;
    req.token = token;

    next();

  } catch (error) {
    return next(new Error(error))
  }
}

module.exports = authentication;