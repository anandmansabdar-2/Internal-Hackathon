require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/db");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const mediaRoutes = require("./routes/media.routes");
const reportRoutes = require("./routes/report.routes");
app.use(express.json());
const corsOptions = {
  origin: [
    "http://localhost:19006", // Expo web (Metro bundler in browser)
    "http://localhost:8081", // React Native web preview
    "http://127.0.0.1:8081",
    "exp://192.168.1.5:19000", // Expo Go on device (replace with your LAN IP)
    /\.ngrok-free\.app$/, // Any ngrok tunnel (regex for subdomains)
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS
app.use(cors(corsOptions));

connectDB();

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/reports", reportRoutes);

module.exports = app;
