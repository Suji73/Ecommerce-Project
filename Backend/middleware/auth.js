const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, "your_jwt_secret");

      req.user = await User.findById(decoded.userId).select("-password");

      return next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res
    .status(401)
    .json({ message: "No token, authorization denied" });
};

// ⭐ ADD THIS FOR ADMIN ACCESS
const adminProtect = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    next();
  } else {
    res.status(403).json({ message: "Admin access denied" });
  }
};

module.exports = { protect, adminProtect };
