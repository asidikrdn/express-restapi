const httpStatus = require("http-status");
const {
  findRoleByID,
  deleteRole,
} = require("../../repositories/roleRepository");
const { singleRoleResponse } = require("../../serializers/roleSerializer");
const {
  errorResponse,
  successResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    // get role by id
    const { data: role, error: errorGetOneRole } = await findRoleByID(
      req.params.id
    );
    if (errorGetOneRole) {
      const error = new Error(errorGetOneRole);
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    // delete role
    const { data: deletedRole, error: errorDeleteRole } = await deleteRole(
      role
    );
    if (errorDeleteRole) {
      const error = new Error(errorDeleteRole);
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    // send success response
    successResponse({
      res: res,
      status: httpStatus.CREATED,
      data: singleRoleResponse(deletedRole),
    });
  } catch (error) {
    // send error response
    errorResponse({
      res: res,
      error: error,
    });
  }
};
