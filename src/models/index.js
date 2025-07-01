/**
 * Sequelize models index file.
 *
 * This file initializes Sequelize, loads all model definitions in the current directory,
 * and sets up model associations if defined.
 *
 * Usage:
 * - All models in this directory (except this file) will be imported and registered automatically.
 * - Each model file should export a function as default that defines the model.
 * - Associations between models should be defined in the model's `associate` method.
 *
 * Notes:
 * - This project uses ES Modules (`type: "module"` in package.json).
 * - Database configuration is loaded from `../config/database.js` based on the current NODE_ENV.
 * - Make sure to define your models following Sequelize conventions.
 *
 * @module models/index
 * @see {@link https://sequelize.org/master/manual/models-definition.html|Sequelize Model Definition}
 * @see {@link ../config/database.js} for database configuration
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import Sequelize from "sequelize";
import process from "process";
import configFile from "../config/database.js";

const basename = path.basename(import.meta.url);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelFiles = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
});

for (const file of modelFiles) {
  const module = await import(pathToFileURL(path.join(__dirname, file)).href);
  const model = module.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
