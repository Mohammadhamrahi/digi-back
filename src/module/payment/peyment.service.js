const createHttpError = require("http-errors");
const { OrderStatus } = require("../../common/constant/product.const");
const {
  GetBasketUserHandler,
  GetBasketUserId,
} = require("../basket/basket.service");
const { OrderModel, OrderItems } = require("../odrer/order.model");
const {
  ZarinpalRequest,
  ZarinpalVerify,
} = require("../zarinpal/zarinpal.service");
const { PaymentModel } = require("./payment.model");
const { BasketModel } = require("../basket/basket.model");

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

    const results = await ZarinpalRequest(
      payment?.amount,
      req?.user,
      "خرید کاغذدیواری - "
    );
    payment.authrity = results?.authority;
    await payment.save();
    return res.json(results);
  } catch (error) {
    next(error);
  }
}
async function verifyPayment(req, res, next) {
  try {
    const { Authority, Status } = req?.query;
    if (Status == "NOK" && Authority) {
      const payment = await PaymentModel.findAll({ where: { Authority } });
      if (!payment) throw createHttpError(404, "payment not found");
      const verifyResult = await ZarinpalVerify(payment.amount, Authority);
      if (verifyResult) {
        payment.status = true;
        payment.refId = verifyResult.ref_id;
        const order = await OrderModel.findByPk(payment.orderId);
        order.status = OrderStatus.Inprocess;
        await order.save();
        await payment.save();
        await BasketModel.destroy({ where: { userId: order?.userId } });
        return res.redirect("http://localhost:3000/pay?status=success");
      } else {
        OrderModel.destroy({ where: { id: payment?.orderId } });
        PaymentModel.destroy({ where: { id: payment?.id } });
      }
    }
    return res.redirect("http://localhost:3000/pay?status=faild");
  } catch (error) {
    res.redirect("http://localhost:3000/pay?status=success");
    next(error);
  }
}

module.exports = {
  paymentBasketHandler,
  verifyPayment,
};
