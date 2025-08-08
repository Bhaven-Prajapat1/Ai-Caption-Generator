const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { isAuthenticated } = require("../middlewares/auth.middleware");
const createPostController = require("../controllers/post.controller");

const router = express.Router();

// Post api
router.post("/", 
  isAuthenticated,
  upload.single("image"),
  createPostController,
);

module.exports = router;
