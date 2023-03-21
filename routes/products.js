var express = require("express");
var router = express.Router();
const ProductModel = require("../models/product-model");

router.get("/", async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
      res.status(500).json(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const findProduct = await ProductModel.findById({ _id: req.params.id });
    console.log(findProduct);
    res.send(findProduct);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const product = new ProductModel(req.body);
    console.log(product);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
