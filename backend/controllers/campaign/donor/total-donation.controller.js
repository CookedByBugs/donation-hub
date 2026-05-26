const mongoose = require("mongoose");
const Donation = require("../../../models/campaign/donation.model");

const getTotalDonation = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Donation.aggregate([
      { $match: { donorId: new mongoose.Types.ObjectId(id) } },
      {
        $facet: {
          totalAmount: [
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
          ],
          totalDonations: [{ $count: "count" }],
          campaignSupported: [
            { $group: { _id: "$campaignId" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const data = result[0];
    res.json({
      success: true,
      message: "Total donation fetched successfully",
      totalAmount: data?.totalAmount || 0,
      totalDonations: data?.totalDonations || 0,
      campaignSupported: data?.campaignSupported || 0,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = getTotalDonation;
