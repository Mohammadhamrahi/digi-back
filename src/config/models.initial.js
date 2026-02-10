const { BasketModel } = require("../module/basket/basket.model");
const { DiscountModel } = require("../module/discount/discount.model");
const { OrderModel, OrderItems } = require("../module/odrer/order.model");
const { PaymentModel } = require("../module/payment/payment.model");
const {
  Product,
  ProductDetail,
  ProductColor,
  ProductSize,
} = require("../module/product/product.model");
const RefreshTokenUser = require("../module/user/refreshToken.model");

const { UserModel, OtpCode } = require("../module/user/user.model");
const { sequelize } = require("./sequelize");

async function initDatabase() {
  Product.hasMany(ProductDetail, {
    foreignKey: "productId",
    sourceKey: "id",
    as: "details",
  });
  ProductDetail.belongsTo(Product, {
    foreignKey: "productId",
    targetKey: "id",
  });

  Product.hasMany(ProductColor, {
    foreignKey: "productId",
    sourceKey: "id",
    as: "colors",
  });
  ProductColor.belongsTo(Product, { foreignKey: "productId", targetKey: "id" });

  Product.hasMany(ProductSize, {
    foreignKey: "productId",
    sourceKey: "id",
    as: "sizes",
  });
  ProductSize.belongsTo(Product, {
    foreignKey: "productId",
    targetKey: "id",
  });

  UserModel.hasOne(OtpCode, {
    foreignKey: "userId",
    as: "otp",
    sourceKey: "id",
  });

  OtpCode.belongsTo(UserModel, {
    foreignKey: "userId",
    targetKey: "id",
  });

  Product.hasMany(BasketModel, {
    foreignKey: "productId",
    as: "basket",
    sourceKey: "id",
  });

  ProductColor.hasMany(BasketModel, {
    foreignKey: "colorId",
    as: "basket",
    sourceKey: "id",
  });
  ProductSize.hasMany(BasketModel, {
    foreignKey: "sizeId",
    as: "basket",
    sourceKey: "id",
  });
  UserModel.hasMany(BasketModel, {
    foreignKey: "userId",
    as: "basket",
    sourceKey: "id",
  });

  BasketModel.belongsTo(Product, {
    foreignKey: "productId",
    targetKey: "id",
    as: "product",
  });
  BasketModel.belongsTo(ProductColor, {
    foreignKey: "colorId",
    targetKey: "id",
    as: "color",
  });
  BasketModel.belongsTo(ProductSize, {
    foreignKey: "sizeId",
    targetKey: "id",
    as: "size",
  });
  BasketModel.belongsTo(UserModel, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
  });

  OrderModel.hasMany(OrderItems, {
    foreignKey: "orderId",
    sourceKey: "id",
    as: "items",
  });
  UserModel.hasMany(OrderModel, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "orders",
  });
  OrderItems.belongsTo(OrderModel, { foreignKey: "orderId", targetKey: "id" });

  OrderModel.hasOne(PaymentModel, {
    foreignKey: "orderId",
    sourceKey: "id",
    as: "payment",
    onDelete: "CASCADE",
  });
  UserModel.hasMany(PaymentModel, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "payment",
  });
  PaymentModel.hasOne(OrderModel, {
    foreignKey: "paymentId",
    sourceKey: "id",
    as: "order",
    onDelete: "CASCADE",
  });

  OrderItems.belongsTo(Product, {
    foreignKey: "productId",
    targetKey: "id",
    as: "product",
  });
  OrderItems.belongsTo(ProductColor, {
    foreignKey: "colorId",
    targetKey: "id",
    as: "color",
  });
  OrderItems.belongsTo(ProductSize, {
    foreignKey: "sizeId",
    targetKey: "id",
    as: "size",
  });

  // RefreshTokenUser.sync();
  // DiscountModel.sync();

  // await sequelize.sync({ alter: true });
}

module.exports = {
  initDatabase,
};
