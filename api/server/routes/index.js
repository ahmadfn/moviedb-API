const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth_route'));
router.use('/users', require('./user_route'));
router.use('/movies', require('./movie_route'));
router.use('/user-levels', require('./user_level_route'));
router.use('/genres', require('./genre_route'));
router.use('/ratings', require('./rating_route'));
router.use('/movie-status', require('./movie_status_route'));
router.use('/favourites', require('./favourite_route'));

module.exports = router;