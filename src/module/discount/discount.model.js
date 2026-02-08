const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/sequelize");

const DiscountModel = sequelize.define(
  "discount",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: false, primaryKey: true },
    code: { type: DataTypes.STRING, allowNull: true },
    productId: { type: DataTypes.INTEGER, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    amount: { type: DataTypes.INTEGER },
    percent: { type: DataTypes.INTEGER },
    limit: { type: DataTypes.INTEGER, allowNull: true },
    usage: { type: DataTypes.INTEGER, allowNull: true },
    type: { type: DataTypes.ENUM("basket", "product") },
    expires_in: { type: DataTypes.DATE, allowNull: false },
  },
  { timestamps: false, modelName: "discount", createdAt: true }
);

module.exports = {
  DiscountModel,
};
