const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const auth = require('../middlewares/authentication');
const adminAuth = require('../middlewares/admin_auth');

router.get('/', auth, adminAuth, UsersController.getAllUsers);
router.post('/', UsersController.addUser);
router.get('/:num', auth, adminAuth, UsersController.getUser);
router.put('/:num', auth, UsersController.updateUser);
router.delete('/:num', auth, UsersController.deleteUser);

module.exports = router;