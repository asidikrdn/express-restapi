"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MstUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // parent
      this.belongsTo(models.MstRoles, {
        foreignKey: "roleId",
        as: "role",
      });
    }
  }
  MstUsers.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fullname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      isEmailVerified: DataTypes.BOOLEAN,
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      isPhoneVerified: DataTypes.BOOLEAN,
      address: DataTypes.TEXT,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MstUsers",
      underscored: true,
      paranoid: true,
    }
  );
  return MstUsers;
};
