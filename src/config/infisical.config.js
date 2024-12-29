import { InfisicalSDK } from "@infisical/sdk";
import {
  INFISICAL_CLIENT_ID,
  INFISICAL_CLIENT_SECRET,
  INFISICAL_PROJECT_ID,
  INFISICAL_PROJECT_PATH,
  NODE_ENV,
} from "../utils/env.util.js";

/**
 * Retrieves secrets from Infisical using the Infisical SDK.
 *
 * This function authenticates with Infisical using client credentials and retrieves
 * all secrets for a specified project and environment. The secrets are returned as
 * an object where the keys are the secret keys and the values are the corresponding
 * secret values.
 *
 * @async
 * @returns {Promise<Object|undefined>} - A promise that resolves to an object containing
 * the secrets, or undefined if an error occurs during the process.
 *
 * @throws {Error} Will log an error if the connection to Infisical fails or if
 * authentication fails.
 */
const getSecretFromInfisical = async () => {
  try {
    const client = new InfisicalSDK();

    await client.auth().universalAuth.login({
      clientId: INFISICAL_CLIENT_ID,
      clientSecret: INFISICAL_CLIENT_SECRET,
    });

    const allSecrets = await client.secrets().listSecrets({
      environment: NODE_ENV == "production" ? "prod" : "dev", // stg, dev, prod, or custom environment slugs
      projectId: INFISICAL_PROJECT_ID,
      secretPath: INFISICAL_PROJECT_PATH || "/",
    });

    const secrets = {};
    allSecrets.secrets.forEach((el) => {
      secrets[el.secretKey] = el.secretValue;
    });

    return secrets;
  } catch (error) {
    console.error(
      "Failed connect to infisical ! The apps will read local environtment variabels on this system"
    );
    console.error("Error message :", error.message);
  }
};

export default getSecretFromInfisical;
