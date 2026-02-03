const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/sequelize");

const UserModel = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullname: { type: DataTypes.STRING, allowNull: true },
    mobile: { type: DataTypes.STRING, allowNull: false },
    // otpId: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    modelName: "user",
    createdAt: false,
    updatedAt: false,
  }
);

const OtpCode = sequelize.define(
  "userOtp",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false },
    expires_in: { type: DataTypes.DATE, allowNull: false },
  },
  {
    modelName: "userOtp",
    timestamps: false,
  }
);

module.exports = {
  UserModel,
  OtpCode,
};
