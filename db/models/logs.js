"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Logs.init(
    {
      date: DataTypes.DATE,
      ipAddress: DataTypes.STRING,
      host: DataTypes.STRING,
      path: DataTypes.STRING,
      method: DataTypes.STRING,
      body: DataTypes.STRING,
      file: DataTypes.STRING,
      responseTime: DataTypes.STRING,
      statusCode: DataTypes.STRING,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Logs",
      underscored: true,
      paranoid: false,
      timestamps: false,
    }
  );
  return Logs;
};
