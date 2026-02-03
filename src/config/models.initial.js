const {
  Product,
  ProductDetail,
  ProductColor,
  ProductSize,
} = require("../module/product/product.model");

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
  // await sequelize.sync({ alter: true });
}

module.exports = {
  initDatabase,
};
