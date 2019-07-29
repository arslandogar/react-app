const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ where: { email: `${email}` } });
  if (!user) return res.status(400).send("Invalid email or password!");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password!");

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    config.get("jwtPrivateKey")
  );
  return res.send(token);
});

module.exports = router;
