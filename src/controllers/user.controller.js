import bcrypt from "bcrypt";
import process from "process";
import db from "../models/index.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt.js";
import HttpStatus from "http-status";

const { User } = db;

// Register user
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: "Email already registered" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });
    res
      .status(HttpStatus.CREATED)
      .json({ user: { id: user.id, username, email } });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Login user (return access token in body, set refresh token in HttpOnly cookie)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Email and password required" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    // Store refresh token in DB for rotation/blacklist
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({
      accessToken,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Refresh access token using refresh token from cookie (with rotation/blacklist)
export const refresh = async (req, res) => {
  try {
    const token = req.cookies["refresh_token"];
    if (!token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "No refresh token" });
    }
    const payload = verifyToken(token, "refresh");
    if (!payload) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Invalid refresh token" });
    }
    // Check if user exists and token matches stored one (rotation/blacklist)
    const user = await User.findByPk(payload.id);
    if (!user || user.refreshToken !== token) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Refresh token revoked" });
    }
    // Generate new tokens (rotation)
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();
    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({ accessToken });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Check auth (ambil user dari req.user hasil middleware authenticateJWT)
export const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Not authenticated" });
    }
    // Optionally, fetch fresh user data from DB
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "email"],
    });
    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "User not found" });
    }
    res.json({
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Get all users (admin/demo)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "createdAt", "updatedAt"],
    });
    res.json(users);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "username", "email", "createdAt", "updatedAt"],
    });
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ id: user.id, username: user.username, email: user.email });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Logout user (clear refresh token cookie and DB)
export const logout = async (req, res) => {
  try {
    const token = req.cookies["refresh_token"];
    if (token) {
      // Remove refresh token from DB if possible
      const payload = verifyToken(token, "refresh");
      if (payload) {
        const user = await User.findByPk(payload.id);
        if (user) {
          user.refreshToken = null;
          await user.save();
        }
      }
    }
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(HttpStatus.OK).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
