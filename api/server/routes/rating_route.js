const express = require('express');
const router = express.Router();
const RatingsController = require('../controllers/ratings');
const auth = require('../middlewares/authentication');
const adminAuth = require('../middlewares/admin_auth');

router.get('/', auth, adminAuth, RatingsController.getAllRatings);
router.post('/', auth, adminAuth, RatingsController.addRating);
router.get('/:id', auth, adminAuth, RatingsController.getRating);
router.put('/:id', auth, adminAuth, RatingsController.updateRating);
router.delete('/:id', auth, adminAuth, RatingsController.deleteRating);

module.exports = router;