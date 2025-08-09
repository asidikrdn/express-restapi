import process from "process";
import loadEnv from "../config/dotenv.js";

// Set environment mode
export const NODE_ENV = process.env.NODE_ENV;

// Load .env file based on NODE_ENV
loadEnv(NODE_ENV);

// Export environment variables with fallback/defaults
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_SCHEMA = process.env.DB_SCHEMA;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;

export const JWT_SECRET = process.env.JWT_SECRET;
export const TZ = process.env.TZ || "Asia/Jakarta";
export const PORT = process.env.PORT || 5000;

export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const CORS_METHOD = process.env.CORS_METHOD;
export const CORS_HEADER = process.env.CORS_HEADER;
