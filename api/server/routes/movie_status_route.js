const express = require('express');
const router = express.Router();
const MovieStatusController = require('../controllers/movie_status');
const auth = require('../middlewares/authentication');
const adminAuth = require('../middlewares/admin_auth');

router.get('/', MovieStatusController.getAllMovieStatus);
router.post('/', auth, adminAuth, MovieStatusController.addMovieStatus);
router.get('/:id', auth, adminAuth, MovieStatusController.getMovieStatus);
router.put('/:id', auth, adminAuth, MovieStatusController.updateMovieStatus);
router.delete('/:id', auth, adminAuth, MovieStatusController.deleteMovieStatus)

module.exports = router;