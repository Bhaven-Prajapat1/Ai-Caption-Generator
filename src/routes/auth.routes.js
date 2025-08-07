const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
} = require("../controllers/auth.controller");

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get user
router.get("/user", getUser);

// Logout user
router.get("/logout", logoutUser);

module.exports = router;
