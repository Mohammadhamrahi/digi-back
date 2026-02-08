const { OrderStatus } = require("../../common/constant/product.const");
const {
  GetBasketUserHandler,
  GetBasketUserId,
} = require("../basket/basket.service");
const { OrderModel, OrderItems } = require("../odrer/order.model");
const { PaymentModel } = require("./payment.model");

async function paymentBasketHandler(req, res, next) {
  try {
    const { id: userId } = req.user;
    const { basket, finalAmount, totalAmount, totalDiscount } =
      await GetBasketUserId(userId);

    const payment = await PaymentModel.create({
      userId,
      amount: finalAmount,
      status: false,
    });
    const order = await OrderModel.create({
      userId,
      paymentId: payment.id,
      total_amount: totalAmount,
      discount_amount: totalDiscount,
      final_amount: finalAmount,
      status: OrderStatus.Pending,
      address: "tehran - tehran - parsa - 14",
    });
    payment.orderId = order.id;
    await payment.save();
    let orderList = [];
    for (const item of basket) {
      let items = [];
      if (item?.sizes?.length > 0) {
        items = item?.sizes?.map((size) => {
          return {
            orderId: order.id,
            productId: item.id,
            sizeId: size.id,
            count: size.count,
          };
        });
      } else if (item?.colors?.length > 0) {
        items = item?.colors?.map((color) => {
          return {
            orderId: order.id,
            productId: item.id,
            colorId: color.id,
            count: color.count,
          };
        });
      } else {
        items = [
          {
            orderId: order.id,
            productId: item.id,
            count: item.count,
          },
        ];
      }
      orderList.push(...items);
    }
    await OrderItems.bulkCreate(orderList);
    return res.json({
      payUrl: "https://examplet.com",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  paymentBasketHandler,
};
