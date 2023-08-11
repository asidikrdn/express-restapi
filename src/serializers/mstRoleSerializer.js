const joi = require("joi");

exports.singleRoleResponse = (roleData) => {
  return {
    id: roleData.get({ plain: true }).id,
    role: roleData.get({ plain: true }).role,
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
