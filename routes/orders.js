var express = require("express");
var router = express.Router();
const OrderModel = require("../models/order-model");
const ProductModel = require("../models/product-model");

router.get("/all", async (req, res, next) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res, next) => {
  const { user, products } = req.body;

  try {
    const order = await OrderModel.create(req.body);
    console.log(order);

    for (const { productId, quantity } of products) {
      const product = await ProductModel.findById({ _id: productId });
      if (product) {
        product.lager -= quantity;
        await product.save();
      }
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
