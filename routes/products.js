var express = require("express");
var router = express.Router();
const ProductModel = require("../models/product-model");

router.get("/", async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json("No products found");
    }
  } catch (error) {
      res.status(400).json(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const findProduct = await ProductModel.findById({ _id: req.params.id });
    console.log(findProduct);
    if (findProduct) {
      res.status(200).json(findProduct);
    } else {
      res.status(404).json("No product found");
    }
  } catch (error) {
    res.status(400).json(error)
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const product = new ProductModel(req.body);
    console.log(product);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error)
  }
});

module.exports = router;
