import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/env.js";
import HttpStatus from "http-status";

// Middleware to authenticate JWT from Authorization header
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized: No token provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Forbidden: Invalid token" });
    }
    req.user = user;
    next();
  });
};
