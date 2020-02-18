const GenreService = require('../services/genre_service');
const Util = require('../utils/util');

const util = new Util();

class GenresController {
  static async addGenre(req, res) {
    const newGenre = req.body;

    try {
      const createdGenre = await GenreService.addGenre(newGenre);
      util.setSuccess(201, 'Genre is added', createdGenre);

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getAllGenres(req, res) {
    try {
      const allGenres = await GenreService.getAllGenres();
      if (allGenres.length > 0) {
        util.setSuccess(200, 'Genres data are retrieved', allGenres);
      } else {
        util.setSuccess(200, 'No genres are found', []);
      }

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getGenre(req, res) {
    const genreId = req.params.id;

    if (!Number(genreId)) {
      util.setError(400, 'Invalid genre ID');
      return util.send(res);
    }

    try {
      const genre = await GenreService.getGenre(genreId);
      
      if (!genre) {
        util.setError(404, `Genre ${genreId} is not found`);
      } else {
        util.setSuccess(200, 'Genre is found', genre);
      }

      return util.send(res);

    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async updateGenre(req, res) {
    const updatedData = req.body;
    const genreId = req.params.id;

    if (!Number(genreId)) {
      util.setError(400, 'Invalid genre ID');
      return util.send(res);
    }

    try {
      const alteredGenre = await GenreService.updateGenre(genreId, updatedData)

      if (!alteredGenre) {
        util.setError(404, `Genre ${genreId} is not found`);
      } else {
        util.setSuccess(200, 'Genre is updated', alteredGenre);
      }

      return util.send(res);
    
    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async deleteGenre(req, res) {
    const genreId = req.params;

    if (!Number(genreId)) {
      util.setError(400, 'Invalid genre ID');
      return util.send(res);
    }

    try {
      const deletedGenre = await GenreService.deleteGenre(genreId);

      if (deletedGenre) {
        util.setSuccess(200, 'Genre is deleted');
      } else {
        util.setError(404, `Genre ${genreId} is not found`);
      }

      return util.send(res);
      
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

module.exports = GenresController;