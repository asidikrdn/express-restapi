const httpStatus = require("http-status");
const { findUserByID } = require("../../repositories/userRepository");
const { singleUserResponse } = require("../../serializers/userSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");

// CHECK AUTH
module.exports = async (req, res) => {
  try {
    const { data: user } = await findUserByID(req.userData.id);
    if (!user) {
      const error = new Error("User not found");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    successResponse({
      res: res,
      status: httpStatus.OK,
      data: singleUserResponse(user),
    });
  } catch (error) {
    errorResponse({
      res: res,
      error: error,
    });
  }
};
