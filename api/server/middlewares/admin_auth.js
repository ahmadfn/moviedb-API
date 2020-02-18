const adminAuth = (req, res, next) => {
  try {
    userLevel = req.user.UserLevel.name;
    
    if (userLevel !== 'admin') {
      return next(new Error('You are not authorized to access this resource'));
    }
    next();
  } catch (error) {
    res.status(401).send(error);
  }
}

module.exports = adminAuth;