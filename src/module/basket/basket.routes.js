const { Router } = require("express");
const {
  AddToBasketHandler,
  RemoveToBasketHandler,
} = require("./basket.service");
const { AuthGurd } = require("../auth/auth.gurd");

const router = Router();

router.post("/add-to-basket", AuthGurd, AddToBasketHandler);
router.post("/remove-to-basket", AuthGurd, RemoveToBasketHandler);

module.exports = {
  BasketRouter: router,
};
