var express = require('express');
var router = express.Router();
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/', async(req, res, next) => {
  try{
    const users = await UserModel.find().select('_id name email');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ???? 
router.post('/', async(req, res, next) => {
  try{
    const users = await UserModel.find().select('_id name email');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res, next) => {
  //let newUser = await UserModel.create(req.body)
  // const confirm = await User.find({Username : req.body.username ,email : req.body.email})
  //confirm && res.status(400).json('this user or email exist');
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
    console.log(savedUser)
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res, next) => {
  //try {
    const user = await UserModel.findOne({ username: req.body.name });
    !user && res.status(400).json("user does not exist");

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json("wrong password");

    const { password, ...loggedin } = user._doc;

    res.status(200).json(loggedin);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
});

module.exports = router;
