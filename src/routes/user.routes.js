import express from "express";
import {
  register,
  login,
  checkAuth,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";
import { authenticateJWT } from "../middlewares/auth.js";

const publicUserRouter = express.Router();
const protectedUserRouter = express.Router();

// Public routes
publicUserRouter.post("/register", register);
publicUserRouter.post("/login", login);

// Protected routes (require JWT)
protectedUserRouter.get("/me", authenticateJWT, checkAuth);
protectedUserRouter.get("/", authenticateJWT, getAllUsers);
protectedUserRouter.get("/:id", authenticateJWT, getUserById);
protectedUserRouter.put("/:id", authenticateJWT, updateUser);
protectedUserRouter.delete("/:id", authenticateJWT, deleteUser);

export { publicUserRouter, protectedUserRouter };
