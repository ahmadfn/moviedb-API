const express = require('express');
const router = express.Router();
const FavouritesController = require('../controllers/favourites');
const auth = require('../middlewares/authentication');
const adminAuth = require('../middlewares/admin_auth');

router.get('/', FavouritesController.getAllFavourites);
router.post('/', auth, adminAuth, FavouritesController.addFavourite);
router.get('/:id', FavouritesController.getFavourite);
router.put('/:id', auth, adminAuth, FavouritesController.updateFavourite);
router.delete('/:id', auth, adminAuth, FavouritesController.deleteFavourite);

module.exports = router;