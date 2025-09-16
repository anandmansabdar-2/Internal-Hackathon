const mongoose = require("mongoose");

const deviceTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    platform: { type: String, enum: ["ios", "android", "web"], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    fullName: { type: String },
    phone: { type: String },
    language: { type: String, default: "en" },
    defaultLocation: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
    addressString: { type: String },
    preferences: {
      receivePush: { type: Boolean, default: true },
    },
    deviceTokens: { type: [deviceTokenSchema], default: [] },
  },
  { timestamps: true }
);

profileSchema.index({ defaultLocation: "2dsphere" });

module.exports = mongoose.model("Profile", profileSchema);
