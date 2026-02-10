const { Router } = require("express");
const { AuthGurd } = require("../auth/auth.gurd");
const { paymentBasketHandler, verifyPayment } = require("./peyment.service");

const router = Router();

router.post("/payment", AuthGurd, paymentBasketHandler);
router.get("/callbcak", verifyPayment);

module.exports = {
  PaymentRouter: router,
};
