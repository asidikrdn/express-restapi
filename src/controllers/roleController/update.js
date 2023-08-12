const httpStatus = require("http-status");
const {
  findOneRole,
  updateRole,
  deleteRole,
} = require("../../repositories/roleRepository");
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
    // get role by id
    const { data: role, error: errorGetOneRole } = await findOneRole(
      req.params.id
    );
    if (errorGetOneRole) {
      const error = new Error(errorGetOneRole);
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

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

    // update role
    if (newRole && newRole.role != role.role) {
      role.role = newRole.role;
    }

    // save updated role
    const { data: updatedRole, error: errorUpdateRole } = await updateRole(
      role
    );
    if (errorUpdateRole) {
      const error = new Error(errorUpdateRole);
      error.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // send success response
    successResponse({
      res: res,
      status: httpStatus.OK,
      data: singleRoleResponse(updatedRole),
    });
  } catch (error) {
    // send error response
    errorResponse({
      res: res,
      error: error,
    });
  }
};
