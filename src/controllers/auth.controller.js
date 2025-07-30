const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Jwt Token

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY);
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const isUser = await userModel.findOne({
    email,
  });

  if (isUser)
    return res.status(401).json({
      message: "User already exist",
    });

  const user = await userModel.create({
    email,
    password: await bcrypt.hash(password, 10),
  });
  const token = createToken(user._id);
  res.cookie("authToken", token);
  res.status(201).json({ message: "User Created Succefully", user });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });

  if (!user)
    return res.status(400).json({
      message: "User Not Found",
    });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }
  const token = createToken(user._id);
  res.cookie("authToken", token);
  res.status(200).json({ message: "User Login Succefully", user });
};
const getUser = async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "Invalid Token" });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const user = await userModel.findById(decoded.userId).select("-password");

  res.status(200).json({ message: "User fetched successfully", user });
};
const logoutUser = (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "User Logout Succefully" });
};

module.exports = { registerUser, loginUser, getUser, logoutUser };
