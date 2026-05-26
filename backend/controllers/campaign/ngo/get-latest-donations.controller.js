const Donation = require("../../../models/campaign/donation.model");
const getLatestDonationsController = async (req, res) => {
  try {
    const donations = await Donation.find({})
      .populate({
        path: "campaignId",
        match: { ngo: req.params.ngoId },
        select: "title ngo",
      })
      .populate("donorId", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(3);
    const filteredDonations = donations.filter((d) => d.campaignId !== null);
    res.status(200).json({
      message: "Donations fetched successfully",
      success: true,
      donations: filteredDonations,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, msg: "Error fetching donations", error });
  }
};

module.exports = getLatestDonationsController;
