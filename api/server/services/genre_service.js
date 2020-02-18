const models = require('../src/models');

class GenreService {
  static async addGenre(newGenre) {
    try {
      return await models.Genre.create(newGenre);
    }
    catch (error) { throw new Error(error) }
  }

  static async getAllGenres() {
    try {
      return await models.Genre.findAll();
    }
    catch (error) { throw new Error(error) }
  }

  static async getGenre(genreId) {
    try {
      const genre = await models.Genre.findOne({
        where: { id: Number(genreId) }
      });

      return genre;
    }
    catch (error) { throw new Error(error) }
  }

  static async updateGenre(genreId, data) {
    try {
      const genreToUpdate = await models.Genre.findOne({
        where: { id: Number(genreId) }
      });

      if (genreToUpdate) {
        const updatedGenre = await models.Genre.update(data, {
          where: { id: Number(genreId) }
        });

        return updatedGenre;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }

  static async deleteGenre(genreId) {
    try {
      const genre = await models.Genre.findOne({
        where: { id: Number(genreId) }
      });

      if (genre) {
        const deletedGenre = await models.Genre.destroy({
          where: { id: Number(genreId) }
        });

        return deletedGenre;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }
}

module.exports = GenreService;