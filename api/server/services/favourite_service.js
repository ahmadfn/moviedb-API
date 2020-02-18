const models = require('../src/models');

class FavouriteService {
  static async addFavourite(newFavourite) {
    try {
      return await models.Favourite.create(newFavourite);
    }
    catch (error) { throw new Error(error) }
  }

  static async getAllFavourites() {
    try {
      return await models.Favourite.findAll();
    }
    catch (error) { throw new Error(error) }
  }

  static async getFavourite(favouriteId) {
    try {
      const favourite = await models.Favourite.findOne({
        where: { id: Number(favouriteId) }
      });

      return favourite;
    }
    catch (error) { throw new Error(error) }
  }

  static async updateFavourite(favouriteId, data) {
    try {
      const favouriteToUpdate = await models.Favourite.findOne({
        where: { id: Number(favouriteId) }
      });

      if (favouriteToUpdate) {
        const updatedFavourite = await models.Favourite.update(data, {
          where: { id: Number(favouriteId) }
        });

        return updatedFavourite;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }

  static async deleteFavourite(favouriteId) {
    try {
      const favouriteToDelete = await models.Favourite.findOne({
        where: { id: Number(favouriteId) }
      });

      if (favouriteToDelete) {
        const deletedFavourite = await models.Favourite.destroy({
          where: { id: Number(favouriteId) }
        });

        return deletedFavourite;
      }

      return null;
    }
    catch (error) { throw new Error(error) }
  }
}

module.exports = FavouriteService;