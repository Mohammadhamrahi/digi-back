const createHttpError = require("http-errors");
const { ProductType } = require("../../common/constant/product.const");
const {
  Product,
  ProductDetail,
  ProductColor,
  ProductSize,
} = require("./product.model");

async function createProductHandler(req, res, next) {
  try {
    const {
      title,
      price = undefined,
      discount = undefined,
      active_discount = undefined,
      count = undefined,
      type,
      details,
      colors,
      sizes,
      desctiption,
    } = req.body;

    if (!Object.values(ProductType).includes(type)) {
      throw createHttpError(400, "Invalid product type");
    }

    const product = await Product.create({
      title,
      price,
      discount,
      desctiption,
      active_discount,
      type,
      count,
    });

    if (details && Array.isArray(details)) {
      let productDetail = [];
      for (const items of details) {
        productDetail.push({
          key: items?.key,
          value: items.value,
          productId: product.id,
        });
      }
      if (productDetail.length > 0) {
        await ProductDetail.bulkCreate(productDetail);
      }
    }
    if (type == ProductType.Colors) {
      if (colors && Array.isArray(colors)) {
        let productColors = [];
        for (const items of colors) {
          productColors.push({
            colorName: items?.colorName,
            colorCode: items.colorCode,
            productId: product.id,
            count: items.count,
            discount: items.discount,
            active_discount: items.active_discount,
            price: items.price,
          });
        }
        console.log("type", productColors, colors);

        if (productColors.length > 0) {
          await ProductColor.bulkCreate(productColors);
        }
      }
    }
    if (type == ProductType.Sizing) {
      if (sizes && Array.isArray(sizes)) {
        let productSizes = [];
        for (const items of sizes) {
          productSizes.push({
            size: items?.size,
            productId: product.id,
            count: items.count,
            discount: items.discount,
            active_discount: items.active_discount,
            price: items.price,
          });
        }
        if (productSizes.length > 0) {
          await ProductSize.bulkCreate(productSizes);
        }
      }
    }
    return res.json({
      message: "product created",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
}
async function getProductHandler(req, res, next) {
  try {
    const products = await Product.findAll({});
    return res.json({
      products,
    });
  } catch (error) {
    next(error);
  }
}
async function getProductDetailHandler(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [
        { model: ProductDetail, as: "details" },
        { model: ProductColor, as: "colors" },
        { model: ProductSize, as: "sizes" },
      ],
    });

    if (!product) throw new createHttpError(404, "not found products");

    return res.json({
      product,
    });
  } catch (error) {
    next(error);
  }
}
async function deleteProductHandler(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.destroy({ where: { id } });
    if (!product) throw new createHttpError(404, "not found products");
    return res.json({
      message: "delete successfuly.",
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createProductHandler,
  getProductHandler,
  getProductDetailHandler,
  deleteProductHandler,
};
