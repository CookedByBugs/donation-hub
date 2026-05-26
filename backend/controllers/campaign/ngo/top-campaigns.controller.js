const mongoose = require("mongoose");
const Donation = require("../../../models/campaign/donation.model");
const getTopCampaigns = async (req, res) => {
  try {
    const ngoId = req.user._id || req.user.id;
    const topCampaigns = await Donation.aggregate([
      {
        $lookup: {
          from: "campaigns",
          localField: "campaignId",
          foreignField: "_id",
          as: "campaign",
        },
      },
      { $unwind: "$campaign" },
      { $match: { "campaign.createdBy": new mongoose.Types.ObjectId(ngoId) } }, // filter here
      {
        $group: {
          _id: "$campaignId",
          totalAmount: { $sum: "$amount" },
          totalDonors: { $addToSet: "$donorId" },
          campaign: { $first: "$campaign" },
        },
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          donorCount: { $size: "$totalDonors" },
          campaign: 1,
        },
      },
      { $sort: { totalAmount: -1 } },
      { $limit: 3 },
    ]);
    res.status(200).json({ success: true, topCampaigns });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, msg: "Error fetching top campaigns", error });
  }
};

module.exports = getTopCampaigns;
