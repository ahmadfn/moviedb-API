const MovieStatusService = require('../services/movie_status_service');
const Util = require('../utils/util');

const util = new Util();

class MovieStatusController {
  static async addMovieStatus(req, res) {
    const newData = req.body;

    try {
      const createdData = await MovieStatusService.addMovieStatus(newData);
      util.setSuccess(201, 'Movie status is added', createdData);

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getAllMovieStatus(req, res) {
    try {
      const allStatus = await MovieStatusService.getAllMovieStatus();
      if (allStatus.length > 0) {
        util.setSuccess(200, 'Movie status data are retrieved', allStatus);
      } else {
        util.setSuccess(200, 'No movie status are found', []);
      }

      return util.send(res);

    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async getMovieStatus(req, res) {
    const statusId = req.params.id;

    if (!Number(statusId)) {
      util.setError(400, 'Invalid movie status ID');
      return util.send(res);
    }

    try {
      const movieStatus = await MovieStatusService.getMovieStatus(statusId);
      
      if (!movieStatus) {
        util.setError(404, `Movie status ${statusId} is not found`);
      } else {
        util.setSuccess(200, 'Movie status is found', movieStatus);
      }

      return util.send(res);

    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async updateMovieStatus(req, res) {
    const data = req.body;
    const statusId = req.params.id;

    if (!Number(statusId)) {
      util.setError(400, 'Invalid movie status ID');
      return util.send(res);
    }

    try {
      const obj = await MovieStatusService.updateMovieStatus(statusId, data);

      if (!obj) {
        util.setError(404, `Movie status ${statusId} is not found`);
      } else {
        util.setSuccess(200, 'Movie status is updated', obj);
      }

      return util.send(res);
    
    } catch (error) {
      util.setError(404, error.message);
      return util.send(res);
    }
  }

  static async deleteMovieStatus(req, res) {
    const statusId = req.params;

    if (!Number(statusId)) {
      util.setError(400, 'Invalid movie status ID');
      return util.send(res);
    }

    try {
      const deletedData = await MovieStatusService.deleteMovieStatus(statusId);

      if (deletedData) {
        util.setSuccess(200, 'Movie status is deleted');
      } else {
        util.setError(404, `Movie status ${statusId} is not found`);
      }

      return util.send(res);
      
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

module.exports = MovieStatusController;