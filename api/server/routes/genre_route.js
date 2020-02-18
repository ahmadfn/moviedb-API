const express = require('express');
const router = express.Router();
const GenresController = require('../controllers/genres');
const auth = require('../middlewares/authentication');
const adminAuth = require('../middlewares/admin_auth');

router.get('/', GenresController.getAllGenres);
router.post('/', auth, adminAuth, GenresController.addGenre);
router.get('/:id', GenresController.getGenre);
router.put('/:id', auth, adminAuth, GenresController.updateGenre);
router.delete('/:id', auth, adminAuth, GenresController.deleteGenre);

module.exports = router;