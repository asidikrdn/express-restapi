"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MstRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MstRoles.init(
    {
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MstRoles",
      paranoid: true,
      underscored: true,
    }
  );
  return MstRoles;
};
