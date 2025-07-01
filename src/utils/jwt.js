import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env.js";

/**
 * Generate JWT token for a user object
 * @param {Object} user - user instance (must have id, username, email)
 * @returns {string} JWT token
 */
export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};
