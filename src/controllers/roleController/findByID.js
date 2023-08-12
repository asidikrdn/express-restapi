const httpStatus = require("http-status");
const { findRoleByID } = require("../../repositories/roleRepository");
const { singleRoleResponse } = require("../../serializers/roleSerializer");
const {
  errorResponse,
  successResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    // get role by id
    const { data: role, error } = await findRoleByID(req.params.id);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    // send success response
    successResponse({
      res: res,
      status: httpStatus.OK,
      data: singleRoleResponse(role),
    });
  } catch (error) {
    // send error response
    errorResponse({
      res: res,
      error: error,
    });
  }
};
