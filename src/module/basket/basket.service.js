const createHttpError = require("http-errors");
const {
  Product,
  ProductColor,
  ProductSize,
} = require("../product/product.model");
const { ProductType } = require("../../common/constant/product.const");
const { BasketModel } = require("./basket.model");

async function AddToBasketHandler(req, res, next) {
  try {
    const { id: userId = undefined } = req.user;
    const { productId, sizeId, colorId } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) throw createHttpError(404, "not found product");
    const basketItem = {
      productId: product.id,
      userId,
    };
    let productCount = undefined;
    let colorCount = undefined;
    let sizeCount = undefined;
    if (product.dataValues.type == ProductType.Colors) {
      if (!colorId) throw createHttpError(400, "color id not found");
      const productColor = await ProductColor.findByPk(colorId);
      if (!productColor) throw createHttpError(404, "not found product");
      basketItem["colorId"] = colorId;
      colorCount = productColor?.count ?? 0;
      if (colorCount == 0)
        throw createHttpError(400, "product count not enough");
    } else if (product.dataValues.type == ProductType.Sizing) {
      if (!sizeId) throw createHttpError(400, "size id not found");
      const productSize = await ProductSize.findByPk(sizeId);

      if (!productSize) throw createHttpError(404, "not found product");
      basketItem["sizeId"] = sizeId;
      sizeCount = productSize?.count ?? 0;
      if (sizeCount == 0)
        throw createHttpError(400, "product count not enough");
    } else {
      productCount = product.count ?? 0;
      if (productCount == 0)
        throw createHttpError(400, "product count not enough");
    }
    const basket = await BasketModel.findOne({ where: basketItem });
    if (basket) {
      if (sizeCount && sizeCount > basket?.count) {
        basket.count += 1;
      } else if (colorCount && colorCount > basket?.count) {
        basket.count += 1;
      } else if (product && product.count > basket?.count) {
        basket.product += 1;
      } else {
        throw createHttpError(400, "product count not enough");
      }
      await basket.save();
    } else {
      await BasketModel.create({ ...basketItem, count: 1 });
    }
    return res.json({ message: "add product" });
  } catch (error) {
    console.log(error);

    next(error);
  }
}

async function RemoveToBasketHandler(req, res, next) {
  try {
    const { id: userId } = req.user;
    const { productId, sizeId, colorId } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) throw createHttpError(404, "product not found");

    const basketItem = {
      productId,
      userId,
    };

    if (colorId) basketItem.colorId = colorId;
    if (sizeId) basketItem.sizeId = sizeId;

    const basket = await BasketModel.findOne({
      where: basketItem,
    });

    if (!basket) throw createHttpError(404, "basket item not found");

    if (basket.count <= 1) {
      await basket.destroy();
    } else {
      basket.count -= 1;
      await basket.save();
    }

    return res.json({
      message: "product removed from basket",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  AddToBasketHandler,
  RemoveToBasketHandler,
};
