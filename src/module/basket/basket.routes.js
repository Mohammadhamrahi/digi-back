const { Router } = require("express");
const {
  AddToBasketHandler,
  RemoveToBasketHandler,
  GetBasketUserHandler,
} = require("./basket.service");
const { AuthGurd } = require("../auth/auth.gurd");

const router = Router();

router.post("/add-to-basket", AuthGurd, AddToBasketHandler);
router.post("/remove-to-basket", AuthGurd, RemoveToBasketHandler);
router.get("/get-basket", AuthGurd, GetBasketUserHandler);

module.exports = {
  BasketRouter: router,
};
