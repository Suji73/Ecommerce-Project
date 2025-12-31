const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "My_Secret_Key", { expiresIn: "30d" });
};

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      isAdmin: isAdmin || false, // Editable for admin account
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        }
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// REFRESH TOKEN
router.post("/refresh", async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Try to verify with current secret first, then old secret
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "My_Secret_Key", { ignoreExpiration: true });
    } catch (err) {
      try {
        decoded = jwt.verify(token, "your_jwt_secret", { ignoreExpiration: true });
      } catch (oldErr) {
        return res.status(401).json({ message: "Invalid token" });
      }
    }
    
    // Generate a new token with the current secret
    const newToken = generateToken(decoded.userId);
    
    res.json({ token: newToken });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
