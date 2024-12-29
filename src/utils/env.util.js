import process from "process";
import getSecretFromInfisical from "../config/infisical.config.js";
import loadEnv from "../config/dotenv.config.js";

export const NODE_ENV = process.env.NODE_ENV;

loadEnv(NODE_ENV);

export const INFISICAL_CLIENT_ID = process.env.INFISICAL_CLIENT_ID;
export const INFISICAL_CLIENT_SECRET = process.env.INFISICAL_CLIENT_SECRET;
export const INFISICAL_PROJECT_ID = process.env.INFISICAL_PROJECT_ID;
export const INFISICAL_PROJECT_PATH = process.env.INFISICAL_PROJECT_PATH;

const secrets = await getSecretFromInfisical();

export const DB_HOST = secrets?.DB_HOST || process.env.DB_HOST;
export const DB_PORT = secrets?.DB_PORT || process.env.DB_PORT;
export const DB_NAME = secrets?.DB_NAME || process.env.DB_NAME;
export const DB_SCHEMA = secrets?.DB_SCHEMA || process.env.DB_SCHEMA;
export const DB_USERNAME = secrets?.DB_USERNAME || process.env.DB_USERNAME;
export const DB_PASSWORD = secrets?.DB_PASSWORD || process.env.DB_PASSWORD;

export const API_KEY = secrets?.API_KEY || process.env.API_KEY;
export const TZ = secrets?.TZ || process.env.TZ;
export const PORT = process.env.PORT || 5000;

export const CORS_ORIGIN = secrets?.CORS_ORIGIN || process.env.CORS_ORIGIN;
export const CORS_METHOD = secrets?.CORS_METHOD || process.env.CORS_METHOD;
export const CORS_HEADER = secrets?.CORS_HEADER || process.env.CORS_HEADER;
