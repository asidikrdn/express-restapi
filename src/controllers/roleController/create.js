const httpStatus = require("http-status");
const { createRole } = require("../../repositories/roleRepository");
const {
  singleRoleResponse,
  validateRoleRequest,
} = require("../../serializers/roleSerializer");
const {
  errorResponse,
  successResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    // get new role data from req body
    const newRole = {
      role: req.body.role,
    };

    // validate the new role
    const error = validateRoleRequest(newRole);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    // send new role to database
    const { data: role, error: errorCreateNewRole } = await createRole(newRole);
    if (errorCreateNewRole) {
      const error = new Error(errorCreateNewRole);
      error.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw error;
    }
    // send success response
    successResponse({
      res: res,
      status: httpStatus.CREATED,
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
