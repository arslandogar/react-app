const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/", async (req, res) => {
  let { name, email, password } = req.body;
  password = await bcrypt.hash(password, 10);
  try {
    await User.create({
      name,
      email,
      password
    });
    res.status(200).send("User Added!");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

module.exports = router;
