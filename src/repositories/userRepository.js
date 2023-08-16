const { MstUsers, MstRoles } = require("../../db/models");
const { Op } = require("sequelize");

exports.findAllUsers = async (offset = 0, limit = 10, filter = {}) => {
  const response = { data: null, error: null, count: 0 };

  try {
    response.data = await MstUsers.findAll({
      offset: offset,
      limit: limit,
      where: filter,
      include: [{ model: MstRoles, as: "role" }],
    });
    if (!response.data) {
      throw new Error("users data not found");
    }

    response.count = await MstUsers.count();
  } catch (error) {
    response.error = `error on get data : ${error.message}`;
  }

  return response;
};

exports.findUserByID = async (userId) => {
  const response = { data: null, error: null };

  try {
    response.data = await MstUsers.findOne({
      where: {
        id: userId,
      },
      include: [{ model: MstRoles, as: "role" }],
    });

    if (!response.data) {
      throw new Error(`user not found`);
    }
  } catch (error) {
    response.error = `error on get data : ${error.message}`;
  }

  return response;
};

exports.createUser = async (user) => {
  const response = { data: null, error: null };

  try {
    response.data = await MstUsers.create({
      fullname: user.fullname,
      email: user.email,
      isEmailVerified: false,
      phone: user.phone,
      isPhoneVerified: false,
      address: user.address,
      password: user.password,
      roleId: user.roleId,
      image: user.image,
    });
  } catch (error) {
    response.error = `error on create data : ${error.message}`;
  }

  return response;
};

exports.updateUser = async (user) => {
  const response = { data: null, error: null };

  try {
    response.data = await user.save();
  } catch (error) {
    response.error = `error on update data : ${error.message}`;
  }

  return response;
};

exports.deleteUser = async (user) => {
  const response = { data: null, error: null };

  try {
    response.data = await user.destroy();
  } catch (error) {
    response.error = `error on delete data : ${error.message}`;
  }

  return response;
};

exports.findUserByEmailAndPhone = async (email, phone) => {
  const response = { data: null, error: null };

  try {
    response.data = await MstUsers.findOne({
      where: {
        [Op.or]: [email && { email: email }, phone && { phone: phone }],
      },
      include: [{ model: MstRoles, as: "role" }],
    });

    if (!response.data) {
      throw new Error(`user not found`);
    }
  } catch (error) {
    response.error = `error on get data : ${error.message}`;
  }

  return response;
};
