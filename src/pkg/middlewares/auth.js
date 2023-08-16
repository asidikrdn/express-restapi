const jwt = require("jsonwebtoken");
const status = require("http-status");

exports.userAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw new Error("token not found");
    }
    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        throw err;
      }
      req.userData = payload;
    });

    next();
  } catch (err) {
    res.status(status.UNAUTHORIZED).json({
      status: status.UNAUTHORIZED,
      message: err.message,
    });
  }
};

exports.adminAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw new Error("token not found");
    }
    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        throw err;
      } else if (payload.roleId !== 1 && payload.roleId !== 2) {
        throw new Error("Your'e not allowed to access this");
      }
      req.userData = payload;
    });

    next();
  } catch (err) {
    res.status(status.UNAUTHORIZED).json({
      status: status.UNAUTHORIZED,
      message: err.message,
    });
  }
};

exports.superadminAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw new Error("token not found");
    }
    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        throw err;
      } else if (payload.roleId !== 1) {
        throw new Error("Your'e not allowed to access this");
      }
      req.userData = payload;
    });

    next();
  } catch (err) {
    res.status(status.UNAUTHORIZED).json({
      status: status.UNAUTHORIZED,
      message: err.message,
    });
  }
};
