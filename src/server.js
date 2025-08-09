import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from 'pino-http';
import { publicRouter, protectedRouter } from "./routes/index.js";
import swaggerRouter from "./routes/swagger.js";
import { NODE_ENV, CORS_ORIGIN, PORT, CORS_HEADER, CORS_METHOD } from "./utils/env.js";

// Initialize Express app
const app = express();

// Configure CORS
app.use(
  cors({
    origin: CORS_ORIGIN ? CORS_ORIGIN.split(",") : "*",
    methods: CORS_METHOD ? CORS_METHOD.split(",") : "*",
    allowedHeaders: CORS_HEADER ? CORS_HEADER.split(",") : "*",
    credentials: true, // allow cookies for refresh token
  })
);

// Set up HTTP request logger
const logger = pinoHttp({
  // Gunakan pino-pretty hanya jika tidak di production
  transport: NODE_ENV !== 'production'
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          levelFirst: true,
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        },
      }
    : undefined,
});
app.use(logger);

// Parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());

// Public routes
app.use("/api", publicRouter);
// Swagger docs
app.use("/api-docs", swaggerRouter);

// Protected routes
app.use("/api", protectedRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
