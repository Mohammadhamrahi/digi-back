const { Router } = require("express");
const { AuthGurd } = require("../auth/auth.gurd");
const { OrderHandler, OrderDetailHandler } = require("./order.service");

const router = Router();

router.get("/get", AuthGurd, OrderHandler);
router.get("/get/:id", AuthGurd, OrderDetailHandler);

module.exports = {
  OrderRoutes: router,
};
