import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env.js";

/**
 * Generate JWT access token for a user object
 * @param {Object} user - user instance (must have id, username, email)
 * @returns {string} JWT access token
 */
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email, type: "access" },
    JWT_SECRET,
    { expiresIn: "15m" }
  );
};

/**
 * Generate JWT refresh token for a user object
 * @param {Object} user - user instance (must have id)
 * @returns {string} JWT refresh token
 */
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, type: "refresh" },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/**
 * Verify JWT token and check type
 * @param {string} token
 * @param {string} expectedType - 'access' or 'refresh'
 * @returns {object|null} Decoded payload or null if invalid
 */
export const verifyToken = (token, expectedType) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.type !== expectedType) return null;
    return payload;
  } catch {
    return null;
  }
};
