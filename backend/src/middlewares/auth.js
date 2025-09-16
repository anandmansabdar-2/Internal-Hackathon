const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // or Admin model if you separated admins

// Middleware to protect admin routes
async function requireAdminAuth(req, res, next) {
  try {
    // Extract token from "Authorization: Bearer <token>"
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user/admin from DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Ensure admin role
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Attach to req
    req.userId = user._id;
    req.role = user.role;

    next();
  } catch (err) {
    console.error("Admin auth error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { requireAdminAuth };
