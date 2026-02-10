const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/sequelize");

const PaymentModel = sequelize.define(
  "payment",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
    amount: { type: DataTypes.DECIMAL },
    refId: { type: DataTypes.STRING, allowNull: true },
    authrity: { type: DataTypes.STRING, allowNull: true },
    orderId: { type: DataTypes.INTEGER, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    timestamps: false,
    modelName: "payment",
    createdAt: "created_at",
  }
);

module.exports = {
  PaymentModel,
};
