const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/sequelize");
const { OrderStatus } = require("../../common/constant/product.const");

const OrderModel = sequelize.define(
  "order",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    paymentId: { type: DataTypes.INTEGER, allowNull: true },
    status: {
      type: DataTypes.ENUM(...Object.values(OrderStatus)),
      defaultValue: OrderStatus.Pending,
    },
    address: { type: DataTypes.TEXT },
    userId: { type: DataTypes.INTEGER },
    total_amount: { type: DataTypes.DECIMAL },
    final_amount: { type: DataTypes.DECIMAL },
    discount_amount: { type: DataTypes.DECIMAL },
    reason: { type: DataTypes.STRING, allowNull: true },
  },
  { timestamps: true, modelName: "order", updatedAt: false }
);

const OrderItems = sequelize.define(
  "orderItems",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    orderId: { type: DataTypes.INTEGER },
    productId: { type: DataTypes.INTEGER },
    colorId: { type: DataTypes.INTEGER, allowNull: true },
    sizeId: { type: DataTypes.INTEGER, allowNull: true },
    count: { type: DataTypes.INTEGER },
  },
  { timestamps: true, updatedAt: false, modelName: "orderItems" }
);
module.exports = { OrderModel, OrderItems };
