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

async function GetBasketUserHandler(req, res, next) {
  try {
    const { id: userId } = req.user;
    const result = await GetBasketUserId(userId);

    return res.json(result);
  } catch (error) {
    next(error);
  }
}

async function GetBasketUserId(userId) {
  // پیدا کردن محصول داخل سبد خرید
  const basket = await BasketModel.findAll({
    where: { userId },
    include: [
      {
        model: Product,
        as: "product",
      },
      {
        model: ProductColor,
        as: "color",
      },
      {
        model: ProductSize,
        as: "size",
      },
    ],
  });

  let totalAmount = 0;
  let totalDiscount = 0;
  let finalAmount = 0;
  let finalBasket = [];

  for (const item of basket) {
    const { product, color, size, count } = item;

    // پیدا کرد محصولی که چند تا باشید با color id ,size id مختلف
    let productIndex = finalBasket.findIndex((item) => item?.id == product.id);
    let productData = finalBasket.find((item) => item?.id == product.id);

    // ساخت دیتای خروجی
    if (!productData) {
      productData = {
        id: product.id,
        title: product.title,
        price: product.price,
        type: product.type,
        count,
        sizes: [],
        colors: [],
      };
    } else {
      productData.count + count;
    }

    if (product.type == ProductType.Colors && color) {
      let price = color?.price * count;
      totalAmount += price;
      let discountAmount = 0;
      let finalPrice = price;
      // بررسی وجود کد تخفیف و اعمال
      if (color?.activeDiscount && color?.discount > 0) {
        discountAmount = price * (color?.discount / 100);
        totalDiscount += discountAmount;
      }
      finalPrice = price - discountAmount;
      finalAmount += finalPrice;
      // ساخت دیتای نهایی
      productData["colors"].push({
        id: color?.id,
        color_name: color?.colorName,
        color_code: color?.colorCode,
        productPrice: color?.price,
        price,
        discountAmount,
        finalPrice,
        count,
      });
    } else if (product.type == ProductType.Sizing && size) {
      let price = size?.price * count;
      totalAmount += price;
      let discountAmount = 0;
      let finalPrice = price;
      if (size?.activeDiscount && size?.discount > 0) {
        discountAmount = price * (size?.discount / 100);
        totalDiscount = discountAmount;
      }
      finalPrice = price - discountAmount;
      finalAmount += finalPrice;
      productData["sizes"].push({
        id: size?.id,
        size: size?.size,
        price,
        discountAmount,
        finalPrice,
        count,
      });
    } else if (product.type == ProductType.Single && product) {
      let price = product?.price * count;
      totalAmount += price;
      let discountAmount = 0;
      let finalPrice = price;
      if (product?.activeDiscount && product?.discount > 0) {
        discountAmount = price * (product?.discount / 100);
        totalDiscount = discountAmount;
      }
      finalPrice = price - discountAmount;
      finalAmount += finalPrice;
      productData["finalPrice"] = finalPrice;
      productData["discountAmount"] = discountAmount;
    }
    if (productIndex > -1) {
      finalBasket[productIndex] = productData;
    } else {
      finalBasket.push(productData);
    }
  }
  return {
    totalDiscount,
    totalAmount,
    finalAmount,
    basket: finalBasket,
  };
}
module.exports = {
  AddToBasketHandler,
  RemoveToBasketHandler,
  GetBasketUserHandler,
  GetBasketUserId,
};
