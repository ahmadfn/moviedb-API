const FavouriteService = require('../services/favourite_service');
const Util = require('../utils/util');

const util = new Util();

class FavouritesController {
  static async addFavourite(req, res) {
    const newFavourite = req.body;

    try {
      const createdData = await FavouriteService.addFavourite(newFavourite);
      util.setSuccess(201, 'New favourite movie is added', createdData);

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getAllFavourites(req, res) {
    try {
      const allFavourites = await FavouriteService.getAllFavourites();
      if (allFavourites.length > 0) {
        util.setSuccess(200, 'Favourites data are retrieved', allFavourites);
      } else {
        util.setSuccess(200, 'No favourites are found', []);
      }

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getFavourite(req, res) {
    const favouriteId = req.params.id;

    if (!Number(favouriteId)) {
      util.setError(400, 'Invalid favourite movie ID');
      return util.send(res);
    }

    try {
      const favourite = await FavouriteService.getFavourite(favouriteId);
      
      if (!favourite) {
        util.setError(404, `Favourite movie ${favouriteId} is not found`);
      } else {
        util.setSuccess(200, 'Favourite movie is found', favourite);
      }

      return util.send(res);

    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async updateFavourite(req, res) {
    const data = req.body;
    const favouriteId = req.params.id;

    if (!Number(favouriteId)) {
      util.setError(400, 'Invalid movie favourite ID');
      return util.send(res);
    }

    try {
      const updated = await FavouriteService.updateFavourite(favouriteId, data)

      if (!updated) {
        util.setError(404, `Favourite movie ${favouriteId} is not found`);
      } else {
        util.setSuccess(200, 'Favourite movie is updated', updated);
      }

      return util.send(res);
    
    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async deleteFavourite(req, res) {
    const favouriteId = req.params;

    if (!Number(favouriteId)) {
      util.setError(400, 'Invalid favourite movie ID');
      return util.send(res);
    }

    try {
      const deletedData = await FavouriteService.deleteFavourite(favouriteId);

      if (deletedData) {
        util.setSuccess(200, 'Favourite is deleted');
      } else {
        util.setError(404, `Favourite movie ${favouriteId} is not found`);
      }

      return util.send(res);
      
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

module.exports = FavouritesController;