import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_SCHEMA,
  DB_USERNAME,
} from "../utils/env.util.js";

export default {
  development: {
    username: DB_USERNAME || "root",
    password: DB_PASSWORD || "password",
    database: DB_NAME || "servant",
    host: DB_HOST || "127.0.0.1",
    schema: DB_SCHEMA,
    dialect: "postgresql",
  },
  test: {
    username: DB_USERNAME || "root",
    password: DB_PASSWORD || "password",
    database: DB_NAME || "servant",
    host: DB_HOST || "127.0.0.1",
    schema: DB_SCHEMA,
    dialect: "postgresql",
  },
  production: {
    username: DB_USERNAME || "root",
    password: DB_PASSWORD || "password",
    database: DB_NAME || "servant",
    host: DB_HOST || "127.0.0.1",
    schema: DB_SCHEMA,
    dialect: "postgresql",
    logging: false,
  },
};
