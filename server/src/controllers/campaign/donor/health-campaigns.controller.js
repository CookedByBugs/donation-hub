const mongoose = require("mongoose");
const Campaign = require("../../../models/campaign/campaign.model");
const User = require("../../../models/user/user.model");

const healthCampaigns = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    // console.log(user);
    const campaigns = await Campaign.find({
      category: "health",
      status: "active",
    })
      .sort({ createdAt: -1 })
      .populate("createdBy");
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = healthCampaigns;
