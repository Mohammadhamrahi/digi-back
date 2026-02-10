const createHttpError = require("http-errors");
const { OrderStatus } = require("../../common/constant/product.const");
const { OrderModel, OrderItems } = require("./order.model");
const {
  Product,
  ProductColor,
  ProductSize,
} = require("../product/product.model");

async function OrderHandler(req, res, next) {
  try {
    const { id: userId } = req.user;
    const status = req.query;
    if (!status || Object.values(OrderStatus).includes(status)) {
      throw createHttpError(400, "status not found");
    }
    const orders = await OrderModel.findAll({
      where: status,
    });
    return res.json({ orders });
  } catch (error) {
    next(error);
  }
}
async function OrderDetailHandler(req, res, next) {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    const orders = await OrderModel.findOne({
      where: {
        id,
        userId,
      },
      include: [
        {
          model: OrderItems,
          as: "items",
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
        },
      ],
    });
    return res.json({ orders });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  OrderHandler,
  OrderDetailHandler,
};
