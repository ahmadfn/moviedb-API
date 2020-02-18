const express = require('express');
const router = express.Router();
const UserLevelsController = require('../controllers/user_levels');
const auth = require('../middlewares/authentication');
const adminAuth = require('../middlewares/admin_auth');

router.get('/', auth, adminAuth, UserLevelsController.getAllUserLevels);
router.post('/', auth, adminAuth, UserLevelsController.addUserLevel);
router.get('/:id', auth, adminAuth, UserLevelsController.getUserLevel);
router.put('/:id', auth, adminAuth, UserLevelsController.updateUserLevel);
router.delete('/:id', auth, adminAuth, UserLevelsController.deleteUserLevel);

module.exports = router;