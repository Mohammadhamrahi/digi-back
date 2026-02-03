const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/sequelize");
const { ProductType } = require("../../common/constant/product.const");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    active_discount: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(ProductType)),
    },
    count: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    modelName: "product",
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);
const ProductDetail = sequelize.define(
  "productDetail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "productDetail",
    timestamps: false,
    freezeTableName: true,
  }
);
const ProductColor = sequelize.define(
  "productColor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    colorName: {
      type: DataTypes.STRING,
    },
    colorCode: {
      type: DataTypes.STRING,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activeDiscount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
  },
  {
    modelName: "productColor",
    timestamps: false,
    freezeTableName: true,
  }
);
const ProductSize = sequelize.define(
  "productSize",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    size: {
      type: DataTypes.STRING,
    },

    productId: {
      type: DataTypes.INTEGER,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activeDiscount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
  },
  {
    modelName: "productSize",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = {
  Product,
  ProductDetail,
  ProductColor,
  ProductSize,
};
