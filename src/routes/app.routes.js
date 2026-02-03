const { Router } = require("express");
const { ProductRoutes } = require("../module/product/product.routes");
const { authRouter } = require("../module/auth/auth.routes");

const mainRouter = Router();

mainRouter.use("/product", ProductRoutes);
mainRouter.use("/auth", authRouter);

module.exports = {
  mainRouter,
};
