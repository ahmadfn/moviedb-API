const models = require('../src/models');

class MovieService {
  static async addMovie(newMovie) {
    try {
      return await models.Movie.create(newMovie);
    }
    catch (error) { throw new Error(error) }
  }

  static async getAllMovies() {
    try {
      return await models.Movie.findAndCountAll({
        include: [{
          model: models.Genre,
          attributes: ['name']
        }],
        attributes: ['id', 'title', 'movie_poster', 'likes_count', 'producer'],
        offset: 0,
        limit: 15
      });
    }
    catch (error) { throw new Error(error) }
  }

  static async getAllMoviesByGenre(genre) {
    try {
      return await models.Movie.findAndCountAll({
        where: { genre_id: Number(genre) },
        attributes: ['id', 'title', 'movie_poster', 'likes_count', 'producer']
      });
    }
    catch (error) { throw new Error(error) }
  }

  static async getAllMoviesByTitle(title) {
    try {
      const movies = await models.Movie.findAndCountAll({
        include: [{
          model: models.Genre,
          attributes: ['name']
        }],
        where: { title: title },
        attributes: ['id', 'title', 'movie_poster', 'likes_count', 'producer']
      });

      if (!movies) { return [] }

      return movies;
    }
    catch (error) { throw new Error(error) }
  }

  static async getMovie(movieId) {
    try {
      const movie = await models.Movie.findOne({
        where: { id: Number(movieId) },
        include: [{
          model: models.MovieStatus,
          attributes: ['name']
        }, {
          model: models.Genre,
          attributes: ['name']
        }]
      });

      return movie;
    }
    catch (error) { throw new Error(error) }
  }

  static async updateMovie(movieId, data) {
    try {
      const movieToUpdate = await models.Movie.findOne({
        where: { id: Number(movieId) }
      });

      if (movieToUpdate) {
        const updatedMovie = await models.Movie.update(data, {
          where: { id: Number(movieId) }
        });

        return updatedMovie;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }

  static async deleteMovie(movieId) {
    try {
      const movie = await models.Movie.findOne({
        where: { id: Number(movieId) }
      });

      if (movie) {
        const deletedMovie = await models.Movie.destroy({
          where: { id: Number(movieId) }
        });

        return deletedMovie;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }
}

module.exports = MovieService;