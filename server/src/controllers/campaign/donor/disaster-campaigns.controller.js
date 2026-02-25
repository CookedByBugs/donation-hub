const mongoose = require("mongoose");
const Campaign = require("../../../models/campaign/campaign.model");

const disasterCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      category: "disaster",
      status: "active",
    })
      .sort({ createdAt: -1 })
      .populate("createdBy");
    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = disasterCampaigns;
