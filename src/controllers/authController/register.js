const httpStatus = require("http-status");
const {
  createUser,
  findUserByEmailAndPhone,
  findUserByID,
} = require("../../repositories/userRepository");
const {
  singleUserResponse,
  validateCreateUserRequest,
} = require("../../serializers/userSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const { hashPassword } = require("../../pkg/helpers/bcrypt");
const otpCodeGenerator = require("../../pkg/helpers/otpCodeGenerator");
const { sendVerificationEmail } = require("../../pkg/helpers/sendMail");
const { setValue } = require("../../../config/redis");

module.exports = async (req, res) => {
  try {
    console.log(req.userData);
    // get new user data from req body
    const newUser = {
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: await hashPassword(req.body.password, 11),
      /**
       * user not logged in only can register as user
       * admin only can register new user as user or admin
       * superadmin can register new user with any role
       */
      roleId: !req.userData?.roleId
        ? 3
        : req.userData?.roleId == 2 && req.body.roleId != 1
        ? req.body.roleId
        : req.userData?.roleId == 1 && req.body.roleId,
    };

    // validate the new user
    const error = validateCreateUserRequest(newUser);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    // check is email/phone already used by another user
    const { data: userByEmailAndPhone, error: errorFindUserByEmailAndPhone } =
      await findUserByEmailAndPhone(newUser.email, newUser.phone);
    if (!errorFindUserByEmailAndPhone) {
      const error = new Error("Email or Phone already used by another user");
      error.status = httpStatus.BAD_REQUEST;
      throw error;
    }

    // send new user to database
    const { data: user, error: errorCreateNewUser } = await createUser(newUser);
    if (errorCreateNewUser) {
      const error = new Error(errorCreateNewUser);
      error.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // generate otp code
    // const otp = otpCodeGenerator(4);

    // store otp in redis for 5 minutes
    // setValue(user.email, otp, 5 * 60);

    // send otp code to email
    // sendVerificationEmail(user, otp);

    // get user by id
    const { data: userRegistered, errorGetUser } = await findUserByID(user.id);
    if (errorGetUser) {
      const errors = new Error(errorGetUser);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    // send success response
    successResponse({
      res: res,
      status: httpStatus.CREATED,
      data: singleUserResponse(userRegistered),
    });
  } catch (error) {
    console.log(error);
    // send error response
    errorResponse({
      res: res,
      error: error,
    });
  }
};
