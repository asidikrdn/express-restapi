import { configDotenv } from "dotenv";
import process from "process";

/**
 * Loads environment variables from a specified .env file based on the provided environment.
 *
 * @param {string} env - The environment to load variables for.
 */
const loadEnv = (env) => {
  let envFile;
  let envLabel;

  if (env === "development") {
    envFile = ".env.development.local";
    envLabel = "development";
  } else if (env === "production") {
    envFile = ".env.production.local";
    envLabel = "production";
  }

  if (envFile) {
    try {
      configDotenv({ path: `${process.cwd()}/${envFile}` });
      console.info(`=== using ${envLabel} environment ===`);
    } catch (error) {
      console.warn(
        "Error loading environment variables file, the app will read global environment variables on this system"
      );
      console.warn("Error message:", error.message);
    }
  } else {
    console.info(
      "=== the app will read global environment variables on this system ==="
    );
  }
};

export default loadEnv;
