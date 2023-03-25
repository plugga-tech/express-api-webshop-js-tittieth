var express = require("express");
var router = express.Router();
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find().select("_id name email");
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json("No users found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const findUser = await UserModel.find({ _id: req.body.id });
    console.log(findUser);
    if (findUser.length > 0) {
      res.send(findUser);
    } else {
      res.status(404).json("No user found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let newUser = await new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(newUser);

    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user);

    if (!user) {
      return res.status(404).json("user does not exist");
    }

    const validate = await bcrypt.compare(req.body.password, user.password);

    if (!validate) {
      return res.status(401).json("wrong password");
    }

    const { password, ...loggedin } = user._doc;
    console.log(loggedin)
    return res.status(200).json(loggedin);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
