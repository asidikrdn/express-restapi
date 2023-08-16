const httpStatus = require("http-status");
const {
  findUserByEmailAndPhone,
} = require("../../repositories/userRepository");
const {
  validateResendOTPRequest,
} = require("../../serializers/userSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const otpCodeGenerator = require("../../pkg/helpers/otpCodeGenerator");
const { sendVerificationEmail } = require("../../pkg/helpers/sendMail");
const { setValue } = require("../../../config/redis");

module.exports = async (req, res) => {
  try {
    // validate request data
    const error = validateResendOTPRequest(req.body);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    const { data: user } = await findUserByEmailAndPhone(req.body.email, null);
    if (!user) {
      const error = new Error("user not found");
      error.status = httpStatus.NOT_FOUND;
      throw error;
    }

    if (user.isEmailVerified === true) {
      const error = new Error("Your email is already verified");
      error.status = httpStatus.BAD_REQUEST;
      throw error;
    }

    // generate OTP
    let otp = otpCodeGenerator(4);

    // save otp in redis
    setValue(req.body.email, otp, 4 * 60);

    // send otp to user's mail
    sendVerificationEmail(user, otp);

    successResponse({
      res: res,
      status: httpStatus.OK,
      data: "OTP successfully sent to user's email",
    });
  } catch (error) {
    errorResponse({
      res: res,
      error: error,
    });
  }
};
