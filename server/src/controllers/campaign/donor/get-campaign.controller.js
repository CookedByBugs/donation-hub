const Campaign = require("../../../models/campaign/campaign.model");

const getCampaigns = async (req, res) => {
  try {
    const { category, page, limit, status } = req.query;
    if (!category || !page || !limit || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const total = await Campaign.countDocuments({ category, status });
    const campaigns = await Campaign.find({ category, status })
      .sort({ createdAt: -1 })
      .populate("createdBy")
      .limit(limit)
      .skip((page - 1) * limit);
    res.status(200).json({
      message: "Campaigns fetched successfully",
      campaigns,
      totalPages: Math.ceil(total / limit),
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = getCampaigns;
