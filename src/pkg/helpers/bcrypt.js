const bcrypt = require("bcrypt");

// Its create async func for encrypt the password
/**
 * We recommend using async API if you use bcrypt on a server.
 * Bcrypt hashing is CPU intensive which will cause the sync APIs to block the event loop and prevent your application from servicing any inbound requests or events.
 * The async version uses a thread pool which does not block the main event loop.
 */

/**
 *
 * @param {*} value
 * @param {*} saltRound
 */
exports.hashPassword = async (value, saltRound) => {
  const hashedPassword = await bcrypt.hash(value, saltRound);

  return hashedPassword;
};

exports.comparePassword = async (userPassword, inputedPassword) => {
  const isValid = await bcrypt.compare(inputedPassword, userPassword);

  return isValid;
};
