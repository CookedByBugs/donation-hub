const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    paymentIntentId: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
