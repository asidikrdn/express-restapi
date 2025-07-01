import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import { publicRouter, protectedRouter } from "./routes/index.js";
import { generateCsrfToken, verifyCsrfToken } from "./middlewares/auth.js";
import {
  NODE_ENV,
  CORS_ORIGIN,
  PORT,
  CORS_HEADER,
  CORS_METHOD,
  SESSION_SECRET,
} from "./utils/env.js";

// Initialize Express app
const app = express();

// Configure CORS
app.use(
  cors({
    origin: CORS_ORIGIN ? CORS_ORIGIN.split(",") : "*",
    methods: CORS_METHOD ? CORS_METHOD.split(",") : "*",
    allowedHeaders: CORS_HEADER ? CORS_HEADER.split(",") : "*",
  })
);

// Set up HTTP request logger
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

// Parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: NODE_ENV === "production" },
  })
);

// Public routes
app.use("/api", publicRouter);

// Protected routes (pasang CSRF & auth middleware di sini)
app.use("/api", generateCsrfToken, verifyCsrfToken, protectedRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
