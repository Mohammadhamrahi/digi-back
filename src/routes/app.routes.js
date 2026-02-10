const { Router } = require("express");
const { ProductRoutes } = require("../module/product/product.routes");
const { authRouter } = require("../module/auth/auth.routes");
const { BasketRouter } = require("../module/basket/basket.routes");
const { PaymentRouter } = require("../module/payment/payment.routes");
const { OrderRoutes } = require("../module/odrer/order.routes");

const mainRouter = Router();

mainRouter.use("/product", ProductRoutes);
mainRouter.use("/auth", authRouter);
mainRouter.use("/basket", BasketRouter);
mainRouter.use("/", PaymentRouter);
mainRouter.use("/order", OrderRoutes);

module.exports = {
  mainRouter,
};
