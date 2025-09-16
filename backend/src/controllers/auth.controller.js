const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { name, phone, email, password } = req.body;

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    phone,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token);

  return res
    .status(201)
    .json({ message: "User created successfully", user, token });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await userModel.findOne({ email });

  if (!userExists) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Invalid password.",
    });
  }

  const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token);

  return res
    .status(200)
    .json({ message: "Login successful", user: userExists, token });
};

const logoutController = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
