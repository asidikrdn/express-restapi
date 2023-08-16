const httpStatus = require("http-status");
const {
  findUserByID,
  findUserByEmailAndPhone,
  updateUser,
} = require("../../repositories/userRepository");
const {
  validateUpdateUserRequest,
  singleUserResponse,
} = require("../../serializers/userSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const imageUrlGenerator = require("../../pkg/helpers/imgUrlGenerator");
const { sendVerificationEmail } = require("../../pkg/helpers/sendMail");
const otpCodeGenerator = require("../../pkg/helpers/otpCodeGenerator");

module.exports = async (req, res) => {
  try {
    // validate the new user
    const error = validateUpdateUserRequest(req.body);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    // get user by id
    const { data: user, error: errorFindUser } = await findUserByID(
      req.params.id
    );
    if (errorFindUser) {
      const errors = new Error(errorFindUser);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    // update fullname
    if (
      req.body.fullname !== null &&
      req.body.fullname !== undefined &&
      req.body.fullname !== user.fullname
    ) {
      user.fullname = req.body.fullname;
    }

    // update email
    if (
      req.body.email !== null &&
      req.body.email !== undefined &&
      req.body.email !== user.email
    ) {
      const { data } = await findUserByEmailAndPhone(req.body.email, null);
      if (data) {
        const errors = new Error("email already used");
        errors.status = httpStatus.BAD_REQUEST;
        throw errors;
      }
      user.email = req.body.email;
      user.isEmailVerified = false;
      // generate otp code
      // const otpCode = otpCodeGenerator(4);
      // store otp in redis for 5 minutes
      // setValue(user.email, otp, 5 * 60);
      // send otp to user's mail
      // sendVerificationEmail(user, otpCode);
    }

    // update phone
    if (
      req.body.phone !== null &&
      req.body.phone !== undefined &&
      req.body.phone !== user.phone
    ) {
      const { data } = await findUserByEmailAndPhone(null, req.body.phone);
      if (data) {
        const errors = new Error("phone already used");
        errors.status = httpStatus.BAD_REQUEST;
        throw errors;
      }
      user.phone = req.body.phone;
      user.isPhoneVerified = false;
    }

    // update address
    if (
      req.body.address !== null &&
      req.body.address !== undefined &&
      req.body.address !== user.address
    ) {
      user.address = req.body.address;
    }

    // update role
    if (
      req.body.roleId !== null &&
      req.body.roleId !== undefined &&
      parseInt(req.body.roleId) !== user.roleId
    ) {
      user.roleId =
        req.userData.roleId == 1 ? parseInt(req.body.roleId) : user.roleId; // only superadmin can update role
    }

    // update profile picture
    if (req.file) {
      user.image = imageUrlGenerator(req, req.file.filename);
    }

    const { error: errorOnUpdateteUser } = await updateUser(user);
    if (errorOnUpdateteUser) {
      const errors = new Error(errorOnUpdateteUser);
      errors.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw errors;
    }

    // get user by id
    const { data: userUpdated, errorGetUser } = await findUserByID(user.id);
    if (errorGetUser) {
      const errors = new Error(errorGetUser);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    // send success response
    successResponse({
      res: res,
      status: httpStatus.OK,
      data: singleUserResponse(userUpdated),
    });
  } catch (error) {
    // send error response
    errorResponse({
      res: res,
      error: error,
    });
  }
};
