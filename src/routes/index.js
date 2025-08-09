import express from "express";
import { publicUserRouter, protectedUserRouter } from "./user.routes.js";

const publicRouter = express.Router();
const protectedRouter = express.Router();

// Public routes
publicRouter.use("/", publicUserRouter);

// Protected routes
protectedRouter.use("/users", protectedUserRouter);

export { publicRouter, protectedRouter };
