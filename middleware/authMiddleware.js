// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware to authenticate user and attach user object with role
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Attach full user object to req.user
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log("✅ Authenticated User:", req.user);
    next();
  } catch (error) {
    console.error("❌ JWT Error:", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Middleware to authorize specific roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles,
};
