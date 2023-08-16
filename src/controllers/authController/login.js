"use-strict";
const httpStatus = require("http-status");
const {
  findUserByEmailAndPhone,
} = require("../../repositories/userRepository");
const { validateLoginRequest } = require("../../serializers/userSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const { comparePassword } = require("../../pkg/helpers/bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    // get login data from req body
    const loginRequest = {
      username: req.body.username,
      password: req.body.password,
    };

    // validate the login request
    const error = validateLoginRequest(loginRequest);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    // check is user exist
    const { data: user, error: errorFindUser } = await findUserByEmailAndPhone(
      loginRequest.username,
      loginRequest.username
    );
    if (!user) {
      const error = new Error(errorFindUser);
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    const isMatch = await comparePassword(user.password, loginRequest.password);
    if (!isMatch) {
      const error = new Error("Wrong password");
      error.status = httpStatus.BAD_REQUEST;
      throw error;
    }

    const token = jwt.sign(
      {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        roleId: user.roleId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24 hours",
        issuer: "Ahmad Sidik Rudini",
      }
    );

    // send success response
    successResponse({
      res: res,
      status: httpStatus.OK,
      data: { id: user.id, token: token },
    });
  } catch (error) {
    // send error response
    errorResponse({
      res: res,
      error: error,
    });
  }
};
