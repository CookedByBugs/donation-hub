const Campaign = require("../../../models/campaign/campaign.model");
const activeController = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      createdBy: req.user._id || req.user.id,
      status: "active",
    }).sort({ createdAt: -1 });
    res.status(200).json({ campaigns, msg: "success" });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching campaigns", error });
  }
};

module.exports = activeController;
