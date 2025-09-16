const jwt = require("jsonwebtoken");

// Citizen Auth
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Admin Auth
function requireAdminAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Admins only" });
    }
    req.adminId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  requireAuth,
  requireAdminAuth,
};
