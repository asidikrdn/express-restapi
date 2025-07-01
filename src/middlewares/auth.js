import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const CSRF_TOKEN_NAME = "x-csrf-token";
const CSRF_COOKIE_NAME = "csrf_token";

// Middleware to generate CSRF token and set it in cookie (for login/new session)
export const generateCsrfToken = (req, res, next) => {
  if (!req.session) return next(new Error("Session not initialized"));
  if (!req.session.jwt) return next(); // No need for CSRF if not logged in

  if (!req.cookies[CSRF_COOKIE_NAME]) {
    const csrfToken = randomBytes(24).toString("hex");
    res.cookie(CSRF_COOKIE_NAME, csrfToken, {
      httpOnly: false,
      sameSite: "strict",
    });
  }
  next();
};

// Middleware to authenticate JWT from session
export const authenticateJWT = (req, res, next) => {
  const token = req.session && req.session.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Middleware to verify CSRF token (double submit cookie)
export const verifyCsrfToken = (req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }

  const csrfCookie = req.cookies[CSRF_COOKIE_NAME];
  const csrfHeader = req.headers[CSRF_TOKEN_NAME];

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return res.status(403).json({ message: "Forbidden: Invalid CSRF token" });
  }
  next();
};
