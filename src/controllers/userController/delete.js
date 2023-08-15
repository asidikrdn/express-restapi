const httpStatus = require("http-status");
const {
  findUserByID,
  deleteUser,
} = require("../../repositories/userRepository");
const { singleUserResponse } = require("../../serializers/userSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    // get user by id
    const { data: user, error } = await findUserByID(req.params.id);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    const { error: errorOnDeleteUser } = await deleteUser(user);
    if (errorOnDeleteUser) {
      const errors = new Error(errorOnDeleteUser);
      errors.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw errors;
    }

    // get user by id
    const { data: userDeleted, errorGetUser } = await findUserByID(user.id);
    if (errorGetUser) {
      const errors = new Error(errorGetUser);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    // send success response
    successResponse({
      res: res,
      status: httpStatus.OK,
      data: singleUserResponse(userDeleted),
    });
  } catch (error) {
    // send error response
    errorResponse({
      res: res,
      error: error,
    });
  }
};
