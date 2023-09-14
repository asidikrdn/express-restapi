const httpStatus = require("http-status");
const {
  findUserByEmailAndPhone,
  updateUser,
} = require("../../repositories/userRepository");
const {
  singleUserResponse,
  validateUserVerificationRequest,
} = require("../../serializers/userSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const { getRedisValue } = require("../../pkg/helpers/redis");
const { comparePassword } = require("../../pkg/helpers/bcrypt");

// VERIFY EMAIL BY OTP
module.exports = async (req, res) => {
  try {
    // validate request data
    const error = validateUserVerificationRequest(req.body);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    // get user by email
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

    // get hashed otp from redis
    const { data: hashedOtp, error: errGetOtp } = await getRedisValue(
      req.body.email
    );
    if (errGetOtp) {
      throw new Error(errGetOtp);
    }

    // validate otp token
    if (!hashedOtp) {
      const error = new Error("OTP is not found or expired");
      error.status = httpStatus.BAD_REQUEST;
      throw error;
    } else {
      const isOtpValid = comparePassword(hashedOtp, req.body.otp);

      if (!isOtpValid) {
        const error = new Error("OTP token is not valid");
        error.status = httpStatus.BAD_REQUEST;
        throw error;
      }
    }

    // update isEmailVerified to true
    user.isEmailVerified = true;
    const { data: updatedUser } = await updateUser(user);

    // send response
    successResponse({
      res: res,
      status: httpStatus.OK,
      data: singleUserResponse(updatedUser),
    });
  } catch (error) {
    errorResponse({ res: res, error: error });
  }
};
