const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const ifUserExist = await userModel.findOne({
      username,
    });
    if (ifUserExist)
      return res.status(409).json({
        message: "User Already Exist...",
      });

    const user = await userModel.create({
      username,
      password: await bcrypt.hash(password, 10),
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.cookie("authToken", token);
    res.status(200).json({ message: "User Created Sucsessfully" });
  } catch (err) {
    return res.status(401).json({ message: "Server error" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({
      username,
    });
    if (!user)
      return res.status(409).json({
        message: "User Not Exist...",
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      res.cookie("authToken", token);
      res.status(200).json({ message: "User Login Sucsessfully" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Server error" });
  }
};
const getUser = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) return res.status(403).json({ message: "Invalid token!" });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User found successfully...", user });
  } catch (err) {
    console.log("Error fetching user:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
const logoutUser = (req, res) => {
  res.clearCookie(authToken);
  res.json({ message: "User logged out" });
};
module.exports = {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
};
