const httpStatus = require("http-status");
const { findAllRoles } = require("../../repositories/roleRepository");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const { multipleRoleResponse } = require("../../serializers/roleSerializer");

module.exports = async (req, res) => {
  try {
    let offset, limit;

    if (req.query.page) {
      // default limit = 10
      limit = req.query.limit ? parseInt(req.query.limit) : 10;
      offset = req.query.page == 1 ? 0 : (parseInt(req.query.page) - 1) * limit;
    }

    // get all roles
    const {
      data: roles,
      count: totalRole,
      error,
    } = await findAllRoles(offset, limit);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    // send success response
    successResponse({
      res: res,
      status: httpStatus.OK,
      data: multipleRoleResponse(roles),
      totalData: totalRole,
      limit: limit,
      page: req.query.page,
    });
  } catch (error) {
    // send error response
    errorResponse({
      res: res,
      error: error,
    });
  }
};
