const Campaign = require("../../models/campaign/campaign.model");
const deleteController = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.query.id, {
      status: "inactive",
    });
    if (!campaign) {
      return res.status(404).json({ msg: "Campaign not found" });
    }
    res.status(200).json({ campaign, msg: "success" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting campaign", error });
  }
};
module.exports = deleteController;
