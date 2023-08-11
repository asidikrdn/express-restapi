const httpStatus = require("http-status");
const joi = require("joi");
const {
  findAllRoles,
  findOneRole,
  createRole,
  updateRole,
  deleteRole,
} = require("../repositories/mstRoleRepository");
const {
  singleRoleResponse,
  multipleRoleResponse,
  validateRoleRequest,
} = require("../serializers/mstRoleSerializer");

exports.getAllRoles = async (req, res) => {
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
      throw new Error(error);
    }

    // send success response
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "OK",
      totalData: totalRole,
      totalPage: Math.ceil(totalRole / limit) || 1,
      currentPage: parseInt(req.query.page) || 1,
      data: multipleRoleResponse(roles),
    });
  } catch (error) {
    // send error response
    res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus.NOT_FOUND,
      message: error.message,
      data: null,
    });
  }
};

exports.getOneRole = async (req, res) => {
  try {
    // get role by id
    const { data: role, error } = await findOneRole(req.params.id);
    if (error) {
      throw new Error(error);
    }

    // send success response
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "OK",
      data: singleRoleResponse(role),
    });
  } catch (error) {
    // send error response
    res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus.NOT_FOUND,
      message: error.message,
      data: null,
    });
  }
};

exports.createRole = async (req, res) => {
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
    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "OK",
      data: singleRoleResponse(role),
    });
  } catch (error) {
    // send error response
    res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: error.message,
      data: null,
    });
  }
};

exports.updateRole = async (req, res) => {
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
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "OK",
      data: singleRoleResponse(updatedRole),
    });
  } catch (error) {
    // send error response
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
      status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: null,
    });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    // get role by id
    const { data: role, error: errorGetOneRole } = await findOneRole(
      req.params.id
    );
    if (errorGetOneRole) {
      throw new Error(errorGetOneRole);
    }

    // delete role
    const { data: deletedRole, error: errorDeleteRole } = await deleteRole(
      role
    );
    if (errorDeleteRole) {
      throw new Error(errorDeleteRole);
    }

    // send success response
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "OK",
      data: singleRoleResponse(deletedRole),
    });
  } catch (error) {
    // send error response
    res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus.NOT_FOUND,
      message: error.message,
      data: null,
    });
  }
};
