const express = require("express");
const {
  loginUser,
  signupUser,
  searchUsername,
  getUser
} = require("../controllers/userController");

const router = express.Router();

// Login Route
router.post("/login", loginUser);

// Signup Route
router.post("/signup", signupUser);

// Search Username
router.post("/username/search", searchUsername);

// Get User By Login Id
router.get("/:id", getUser);

module.exports = router;
