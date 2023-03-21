var express = require('express');
var router = express.Router();
const OrderModel = require("../models/order-model");

router.get('/all', async(req, res, next) => {
  try{
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res, next) => {
  const order = await OrderModel.create(req.body);
  console.log(order);
  res.status(201).json(order);
});

module.exports = router;