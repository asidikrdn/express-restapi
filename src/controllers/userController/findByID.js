const httpStatus = require("http-status");
const { findUserByID } = require("../../repositories/userRepository");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const { singleUserResponse } = require("../../serializers/userSerializer");

module.exports = async (req, res) => {
  try {
    // get user by id
    const { data: user, error } = await findUserByID(req.params.id);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    // send success response
    successResponse({
      res: res,
      status: httpStatus.OK,
      data: singleUserResponse(user),
    });
  } catch (error) {
    // send error response
    errorResponse({
      res: res,
      error: error,
    });
  }
};
