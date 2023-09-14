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
const { hashPassword } = require("../../pkg/helpers/bcrypt");
const { setRedisValue } = require("../../pkg/helpers/redis");

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
    const otp = otpCodeGenerator(4);
    const hashedOtp = await hashPassword(otp, 11);

    // store hashed otp in redis
    const redisSetValErr = await setRedisValue(
      req.body.email,
      hashedOtp,
      4 * 60
    );
    if (redisSetValErr) {
      throw new Error(redisSetValErr);
    }

    // send otp to user's mail
    const { error: errSendEmail } = await sendVerificationEmail(user, otp);
    if (errSendEmail) {
      throw new Error(errSendEmail);
    }

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
