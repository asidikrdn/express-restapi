const { MstRoles } = require("../../db/models");

exports.findAllRoles = async (offset = 0, limit = 10, filter = {}) => {
  const response = { data: null, error: null, count: 0 };

  try {
    response.data = await MstRoles.findAll({
      offset: offset,
      limit: limit,
      where: filter,
    });
    if (!response.data) {
      throw new Error("roles data not found");
    }

    response.count = await MstRoles.count({
      where: filter,
    });
  } catch (error) {
    response.error = `error on get data : ${error.message}`;
  }

  return response;
};

exports.findRoleByID = async (roleId) => {
  const response = { data: null, error: null };

  try {
    response.data = await MstRoles.findOne({
      where: {
        id: roleId,
      },
    });

    if (!response.data) {
      throw new Error(`role with id ${roleId} not found`);
    }
  } catch (error) {
    response.error = `error on get data : ${error.message}`;
  }

  return response;
};

exports.createRole = async (role) => {
  const response = { data: null, error: null };

  try {
    response.data = await MstRoles.create({
      role: role.role,
    });
  } catch (error) {
    response.error = `error on create data : ${error.message}`;
  }

  return response;
};

exports.updateRole = async (role) => {
  const response = { data: null, error: null };

  try {
    response.data = await role.save();
  } catch (error) {
    response.error = `error on update data : ${error.message}`;
  }

  return response;
};

exports.deleteRole = async (role) => {
  const response = { data: null, error: null };

  console.log("destroy ->", role);

  try {
    response.data = await role.destroy();
  } catch (error) {
    response.error = `error on delete data : ${error.message}`;
  }

  return response;
};
