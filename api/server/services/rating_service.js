const models = require('../src/models');

class RatingService {
  static async addRating(newRating) {
    try {
      return await models.Rating.create(newRating);
    }
    catch (error) { throw new Error(error) }
  }

  static async getAllRatings() {
    try {
      return await models.Rating.findAll();
    }
    catch (error) { throw new Error(error) }
  }

  static async getRating(ratingId) {
    try {
      const rating = await models.Rating.findOne({
        where: { id: Number(ratingId) }
      });

      return rating;
    }
    catch (error) { throw new Error(error) }
  }

  static async updateRating(ratingId, data) {
    try {
      const ratingToUpdate = await models.Rating.findOne({
        where: { id: Number(ratingId) }
      });

      if (ratingToUpdate) {
        const updatedRating = await models.Rating.update(data, {
          where: { id: Number(ratingId) }
        });

        return updatedRating;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }

  static async deleteRating(ratingId) {
    try {
      const rating = await models.Rating.findOne({
        where: { id: Number(ratingId) }
      });

      if (rating) {
        const deletedRating = await models.Rating.destroy({
          where: { id: Number(ratingId) }
        });

        return deletedRating;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }
}

module.exports = RatingService;