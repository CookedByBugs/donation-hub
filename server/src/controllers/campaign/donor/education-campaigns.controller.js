const mongoose = require("mongoose");
const Campaign = require("../../../models/campaign/campaign.model");

const educationCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      category: "education",
      status: "active",
    })
      .sort({ createdAt: -1 })
      .populate("createdBy", "firstName lastName NGO email");
    res.status(200).json(campaigns);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = educationCampaigns;
