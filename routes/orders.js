var express = require("express");
var router = express.Router();
const OrderModel = require("../models/order-model");
const ProductModel = require("../models/product-model");
const UserModel = require("../models/user-model");

router.get("/all", async (req, res, next) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(401).json(error);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const { user, products } = req.body;
    const findUser = await UserModel.findOne({ _id: user });
    console.log(findUser);

    if (findUser) {
      const order = await OrderModel.create(req.body);
      console.log(order);

      let validateOrder = true;

      for (const { productId, quantity } of products) {
        const product = await ProductModel.findOne({ _id: productId });
        if (product) {
          product.lager -= quantity;
          if (product.lager <= 0) {
            validateOrder = false;
            break;
          } else {
            await product.save();
          }
        } else {
          validateOrder = false;
          break;
        }
      }

      if (validateOrder) {
        res.status(200).json(order);
      } else {
        res.status(401).json("Produkten kunde inte hittas eller finns inte i lager");
      }
    } else {
      res.status(401).json("Användaren hittades inte");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
