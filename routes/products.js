var express = require("express");
var router = express.Router();
const ProductModel = require("../models/product-model");

router.get("/", async (req, res, next) => {
  const products = await ProductModel.find();
  res.status(200).json(products);
});

router.get("/:id", async (req, res, next) => {
  const findProduct = await ProductModel.findById({ _id: req.params.id });
  console.log(findProduct);
  res.send(findProduct);
});

router.post("/add", async (req, res, next) => {
  const product = new ProductModel(req.body);
  console.log(product);
  await product.save();
  res.status(201).json(product);
});

module.exports = router;
