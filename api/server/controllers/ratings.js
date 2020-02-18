const RatingService = require('../services/rating_service');
const Util = require('../utils/util');

const util = new Util();

class RatingsController {
  static async addRating(req, res) {
    const newRating = req.body;

    try {
      const createdRating = await RatingService.addRating(newRating);
      util.setSuccess(201, 'Rating is added', createdRating);

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getAllRatings(req, res) {
    try {
      const allRatings = await RatingService.getAllRatings();
      if (allRatings.length > 0) {
        util.setSuccess(200, 'Ratings data are retrieved', allRatings);
      } else {
        util.setSuccess(200, 'No ratings are found', []);
      }

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getRating(req, res) {
    const ratingId = req.params.id;

    if (!Number(ratingId)) {
      util.setError(400, 'Invalid rating ID');
      return util.send(res);
    }

    try {
      const rating = await RatingService.getRating(ratingId);
      
      if (!rating) {
        util.setError(404, `Rating ${ratingId} is not found`);
      } else {
        util.setSuccess(200, 'Rating is found', rating);
      }

      return util.send(res);

    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async updateRating(req, res) {
    const data = req.body;
    const ratingId = req.params.id;

    if (!Number(ratingId)) {
      util.setError(400, 'Invalid rating ID');
      return util.send(res);
    }

    try {
      const alteredRating = await RatingService.updateRating(ratingId, data);

      if (!alteredRating) {
        util.setError(404, `Rating ${ratingId} is not found`);
      } else {
        util.setSuccess(200, 'Rating is updated', alteredRating);
      }

      return util.send(res);
    
    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async deleteRating(req, res) {
    const ratingId = req.params;

    if (!Number(ratingId)) {
      util.setError(400, 'Invalid rating ID');
      return util.send(res);
    }

    try {
      const deletedRating = await RatingService.deleteRating(ratingId);

      if (deletedRating) {
        util.setSuccess(200, 'Rating is deleted');
      } else {
        util.setError(404, `Rating ${ratingId} is not found`);
      }

      return util.send(res);
      
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

module.exports = RatingsController;