import { configDotenv } from "dotenv";
import process from "process";

/**
 * Loads environment variables from a specified .env file based on the provided environment.
 *
 * @param {string} env - The environment to load variables for. Can be "development", "production", or any other string.
 * If the environment is not recognized, the application will read global environment variables.
 *
 * @throws {Error} Will log an error if loading the environment variables fails.
 */
const loadEnv = (env) => {
  switch (env) {
    case "development":
      // dev
      try {
        configDotenv({ path: `${process.cwd()}/.env.development.local` });
      } catch (error) {
        console.log(
          "Error loading environment variables file, the apps will read global environtment variabels on this system"
        );
        console.error("Error message :", error.message);
      }

      console.log("=== using development environment ===");
      break;

    case "production":
      // prod
      try {
        configDotenv({ path: `${process.cwd()}/.env.production.local` });
      } catch (error) {
        console.log(
          "Error loading environment variables file, the apps will read global environtment variabels on this system"
        );
        console.error("Error message :", error.message);
      }

      console.log("=== using production environment ===");
      break;

    default:
      console.log(
        "=== the apps will read global environtment variabels on this system ==="
      );
      break;
  }
};

export default loadEnv;
