const mongoose = require("mongoose");
const Campaign = require("../../../models/campaign/campaign.model");

const healthCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      category: "health",
      status: "active",
    });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = healthCampaigns;
