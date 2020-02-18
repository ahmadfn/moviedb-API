const MovieService = require('../services/movie_service');
const Util = require('../utils/util');

const util = new Util();

class MoviesController {
  static async addMovie(req, res) {
    req.body.author_id = req.user.id;
    const newMovie = req.body;

    try {
      await MovieService.addMovie(newMovie);
      util.setSuccess(201, 'Movie is added', {});

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getAllMovies(req, res) {
    try {
      const queryObj = req.query;
      let allMovies;

      if (queryObj.hasOwnProperty('genre')) {
        allMovies = await MovieService.getAllMoviesByGenre(queryObj.genre);
      } else if (queryObj.hasOwnProperty('title')) {
        const title = req.query.title.split('+').join(' ');
        allMovies = await MovieService.getAllMoviesByTitle(title);
      } else {
        allMovies = await MovieService.getAllMovies();
      }

      if (allMovies.rows.length > 0) {
        util.setSuccess(200, 'Movies data are retrieved', allMovies);
      } else {
        util.setSuccess(200, 'No movies are found', []);
      }

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getMovie(req, res) {
    const movieId = req.params.id;

    if (!Number(movieId)) {
      util.setError(400, 'Invalid movie ID');
      return util.send(res);
    }

    try {
      const movie = await MovieService.getMovie(movieId);
      
      if (!movie) {
        util.setError(404, `Movie ${movieId} is not found`);
      } else {
        util.setSuccess(200, 'Movie is found', movie);
      }

      return util.send(res);

    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async updateMovie(req, res) {
    const updatedData = req.body;
    const movieId = req.params.id;

    if (!Number(movieId)) {
      util.setError(400, 'Invalid movie ID');
      return util.send(res);
    }

    try {
      const alteredMovie = await MovieService.updateMovie(movieId, updatedData)

      if (!alteredMovie) {
        util.setError(404, `Movie ${movieId} is not found`);
      } else {
        util.setSuccess(200, 'Movie is updated', alteredMovie);
      }

      return util.send(res);
    
    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async deleteMovie(req, res) {
    const movieId = req.params;

    if (!Number(movieId)) {
      util.setError(400, 'Invalid movie ID');
      return util.send(res);
    }

    try {
      const deletedMovie = await MovieService.deleteMovie(movieId);

      if (deletedMovie) {
        util.setSuccess(200, 'Movie is deleted');
      } else {
        util.setError(404, `Movie ${movieId} is not found`);
      }

      return util.send(res);
      
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

module.exports = MoviesController;