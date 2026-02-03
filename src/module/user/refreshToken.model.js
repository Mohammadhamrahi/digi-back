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
  },
  {
    modelName: "refreshToken",
    createdAt: true,
  }
);

module.exports = RefreshTokenUser;
