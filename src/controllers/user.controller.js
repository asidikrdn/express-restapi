import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { generateToken } from "../utils/jwt.js";
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

// Login user (store JWT in session)
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
    const token = generateToken(user);
    req.session.jwt = token; // Simpan token di session
    res.json({
      user: { id: user.id, username: user.username, email: user.email },
    });
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

// Logout user (destroy session)
export const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Failed to destroy session" });
      }
      res.clearCookie("connect.sid"); // nama default cookie session
      res.status(HttpStatus.OK).json({ message: "Logged out successfully" });
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
