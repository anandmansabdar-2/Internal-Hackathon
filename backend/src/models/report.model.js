const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    landmark: { type: String },
    imageUrl: { type: String },
    status: {
      type: String,
      enum: ["Reported", "Acknowledged", "In Progress", "Resolved"],
      default: "Reported",
    },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
