const Campaign = require("../../../models/campaign/campaign.model");

const updateStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id, status);
    const campaign = await Campaign.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!campaign) {
      return res.status(404).json({ msg: "Campaign not found" });
    }
    res.status(200).json({ campaign, msg: "success" });
  } catch (error) {
    res.status(500).json({ msg: "Error updating campaign", error });
  }
};
module.exports = updateStatusController;
