const httpStatus = require("http-status");
const { findAllUsers } = require("../../repositories/userRepository");
const { multipleUserResponse } = require("../../serializers/userSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    let offset, limit;

    if (req.query.page) {
      // default limit = 10
      limit = req.query.limit ? parseInt(req.query.limit) : 10;
      offset = req.query.page == 1 ? 0 : (parseInt(req.query.page) - 1) * limit;
    }

    // get all users
    const {
      data: users,
      count: totalUser,
      error,
    } = await findAllUsers(offset, limit);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    // send success response
    successResponse({
      res: res,
      status: httpStatus.OK,
      data: multipleUserResponse(users),
      totalData: totalUser,
      page: req.query.page,
      limit: limit,
    });
  } catch (error) {
    // send error response
    errorResponse({
      res: res,
      error: error,
    });
  }
};
