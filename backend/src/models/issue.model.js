const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ["Road", "Water", "Electricity", "Waste"], required: true },
  location: { type: String, required: true },
  imageUrl: { type: String }, // optional
  status: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Issue", issueSchema);
