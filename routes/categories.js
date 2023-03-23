const express = require('express');
const router = express.Router();
const CategoryModel = require("../models/category-model");

router.get("/", async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    if (categories.length > 0) {
      res.status(200).json(categories);
    } else {
      res.status(404).json("No categories found");
    }
  } catch (error) {
      res.status(400).json(error);
  }
});

router.post("/add", async (req, res, next) => {
  const { token } = req.body;
  try {
    if (token === "1234key1234") {
      const category = new CategoryModel(req.body);
      console.log(category);
      await category.save();
      res.status(200).json(category);
    } else {
      res.status(401).json("not authorized to do that")
    }
  } catch (error) {
    res.status(400).json(error)
  }
});

module.exports = router;