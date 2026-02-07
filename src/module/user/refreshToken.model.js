const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/sequelize");

const RefreshTokenUser = sequelize.define(
  "refreshToken",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    token: { type: DataTypes.TEXT, allowNull: false },
    user: { type: DataTypes.INTEGER, allowNull: true },
    userAgent: DataTypes.TEXT,
    ip: DataTypes.STRING,
    deviceId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
    },
  },
  {
    modelName: "refreshToken",
    createdAt: true,
  }
);

module.exports = RefreshTokenUser;
