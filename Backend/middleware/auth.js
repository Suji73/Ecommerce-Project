const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];

      // Try to verify with current secret first
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET || "My_Secret_Key");
      } catch (err) {
        // If that fails, try the old secret for backward compatibility
        try {
          decoded = jwt.verify(token, "your_jwt_secret");
        } catch (oldErr) {
          throw new Error("Token failed or expired");
        }
      }

      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) return res.status(401).json({ message: "User not found" });

      return next();
    }

    return res.status(401).json({ message: "No token, authorization denied" });

  } catch (err) {
    return res.status(401).json({ message: "Token failed or expired" });
  }
};

// ⭐ Admin middleware
const adminProtect = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};

// Aliases for compatibility with existing code
const verifyToken = protect;
const isAdmin = adminProtect;
const isClient = protect; // For now, same as protect

module.exports = { protect, adminProtect, verifyToken, isAdmin, isClient };
