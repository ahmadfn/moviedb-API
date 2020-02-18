const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');
const auth = require('../middlewares/authentication');

router.post('/login', AuthController.loginUser);
router.post('/logout', auth, AuthController.logoutFromOneDevice);
router.post('/logoutall', auth, AuthController.logoutFromAllDevices);

module.exports = router;