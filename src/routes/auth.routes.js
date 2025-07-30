const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
} = require("../controllers/auth.controller");
const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get User
router.get("/getuser", getUser);

// Logout User
router.get("/logout", logoutUser);

module.exports = router;
