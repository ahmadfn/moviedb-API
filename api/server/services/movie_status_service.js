const models = require('../src/models');

class MovieStatusService {
  static async addMovieStatus(newMovieStatus) {
    try {
      return await models.MovieStatus.create(newMovieStatus);
    }
    catch (error) { throw new Error(error) }
  }

  static async getAllMovieStatus() {
    try {
      return await models.MovieStatus.findAll();
    }
    catch (error) { throw new Error(error) }
  }

  static async getMovieStatus(statusId) {
    try {
      const movieStatus = await models.MovieStatus.findOne({
        where: { id: Number(statusId) }
      });

      return movieStatus;
    }
    catch (error) { throw new Error(error) }
  }

  static async updateMovieStatus(statusId, data) {
    try {
      const statusToUpdate = await models.MovieStatus.findOne({
        where: { id: Number(statusId) }
      });

      if (statusToUpdate) {
        const updatedMovieStatus = await models.MovieStatus.update(data, {
          where: { id: Number(statusId) }
        });

        return updatedMovieStatus;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }

  static async deleteMovieStatus(statusId) {
    try {
      const movieStatus = await models.MovieStatus.findOne({
        where: { id: Number(statusId) }
      });

      if (movieStatus) {
        const deletedMovieStatus = await models.MovieStatus.destroy({
          where: { id: Number(statusId) }
        });

        return deletedMovieStatus;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }
}

module.exports = MovieStatusService;