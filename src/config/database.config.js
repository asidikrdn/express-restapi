// Import environment variables from utility
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_SCHEMA,
  DB_USERNAME,
} from "../utils/env.util.js";

// Helper to generate config for each environment
const createConfig = (overrides = {}) => ({
  username: DB_USERNAME || "root",
  password: DB_PASSWORD || "password",
  database: DB_NAME || "servant",
  host: DB_HOST || "127.0.0.1",
  schema: DB_SCHEMA,
  dialect: "postgresql",
  ...overrides, // Allow environment-specific overrides
});

// Export configuration for different environments
export default {
  development: createConfig(),
  test: createConfig(),
  production: createConfig({ logging: false }), // Disable logging in production
};
