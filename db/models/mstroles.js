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
      // child
      this.hasMany(models.MstUsers, {
        foreignKey: "roleId",
        as: {
          singular: "user",
          plural: "users",
        },
      });
    }
  }
  MstRoles.init(
    {
      role: {
        type: DataTypes.STRING,
        unique: true,
      },
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
