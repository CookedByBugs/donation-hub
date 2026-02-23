const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    category: {
      type: String,
      enum: ["education", "health", "disaster", "others"],
      required: true,
    },
    endDate: { type: String, required: true },
    image: [{ type: String }],
    description: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // ngo: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
