const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "Unauthorized access" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userModel.findById(decoded.id).select("-password");
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error " });
  }
};

module.exports = { isAuthenticated };
