const mongoose = require("mongoose");
const Campaign = require("../../../models/campaign/campaign.model");

const otherCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      category: "other",
      status: "active",
    });
    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = otherCampaigns;
