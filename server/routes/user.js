const express = require("express");
const {
  loginUser,
  signupUser,
  searchUsername,
} = require("../controllers/userController");

const router = express.Router();

// Login Route
router.post("/login", loginUser);

// Signup Route
router.post("/signup", signupUser);

// Search Username
router.post("/username/search", searchUsername);

module.exports = router;
