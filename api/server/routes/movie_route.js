const express = require('express');
const router = express.Router();
const MoviesController = require('../controllers/movies');
const auth = require('../middlewares/authentication');
const adminAuth = require('../middlewares/admin_auth');

router.get('/', MoviesController.getAllMovies);
router.post('/', auth, adminAuth, MoviesController.addMovie);
router.get('/:id', MoviesController.getMovie);
router.put('/:id', auth, adminAuth, MoviesController.updateMovie);
router.delete('/:id', auth, adminAuth, MoviesController.deleteMovie);

module.exports = router;