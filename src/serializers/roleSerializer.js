const joi = require("joi");
const { MstRoles } = require("../../db/models");

exports.singleRoleResponse = (roleData) => {
  const role =
    roleData instanceof MstRoles ? roleData.get({ plain: true }) : roleData;

  return {
    id: role.id,
    role: role.role,
  };
};

exports.multipleRoleResponse = (rolesData) => {
  return rolesData.map((el) => {
    return this.singleRoleResponse(el);
  });
};

exports.validateRoleRequest = (roleData) => {
  const schema = joi.object({
    role: joi.string().required(),
  });

  try {
    const { error } = schema.validate(roleData);
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};
