const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username?.trim() || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must contain at least 6 characters" });
    }
    const existingUser = await User.findOne({ username: username.trim() });
    if (existingUser) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username: username.trim(), password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "User already exists" });
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );
    res.json({ message: "Login successful", token });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
