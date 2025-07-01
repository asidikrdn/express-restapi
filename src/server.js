import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
  NODE_ENV,
  CORS_ORIGIN,
  PORT,
  CORS_HEADER,
  CORS_METHOD,
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
