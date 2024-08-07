const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");

// User registration
router.post("/register", async (req, res) => {
  try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 15); // Hash the password
        const user = new User({ username, password: hashedPassword, email });
        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
      } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// User login
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Logged in successfully!", user: req.user });
});

// User logout
router.post("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.json({ message: "Logged out successfully!" });
  });
});

// Check if user is logged in
router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
