const { Router } = require("express");
const { createProductValidation } = require("./validation");
const {
  createProductHandler,
  getProductHandler,
  getProductDetailHandler,
  deleteProductHandler,
} = require("./product.service");

const router = Router();

router.post("/create-product", createProductValidation, createProductHandler);
router.get("/get-all", getProductHandler);
router.get("/get-by-id/:id", getProductDetailHandler);
router.delete("/delete/:id", deleteProductHandler);

module.exports = {
  ProductRoutes: router,
};
