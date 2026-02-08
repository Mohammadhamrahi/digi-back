const { Router } = require("express");
const { AuthGurd } = require("../auth/auth.gurd");
const { paymentBasketHandler } = require("./peyment.service");

const router = Router();

router.post("/payment", AuthGurd, paymentBasketHandler);

module.exports = {
  PaymentRouter: router,
};
