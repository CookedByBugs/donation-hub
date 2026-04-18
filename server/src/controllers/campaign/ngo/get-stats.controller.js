const mongoose = require("mongoose");
const Donation = require("../../../models/campaign/donation.model");
const Campaign = require("../../../models/campaign/campaign.model");

const getStats = async (req, res) => {
  try {
    const ngoId = req.user._id || req.user.id;

    const donorsAgg = await Donation.aggregate([
      {
        $lookup: {
          from: "campaigns",
          localField: "campaignId",
          foreignField: "_id",
          as: "campaign",
        },
      },
      { $unwind: "$campaign" },

      {
        $match: {
          "campaign.createdBy": new mongoose.Types.ObjectId(ngoId),
        },
      },

      {
        $group: {
          _id: null,

          // total unique donors
          // donors: { $addToSet: "$donorId" },

          // total donation amount
          totalAmount: { $sum: "$amount" },
        },
      },

      {
        $project: {
          _id: 0,
          // totalDonors: { $size: "$donors" },
          totalAmount: 1,
        },
      },
    ]);
    // const totalDonors = donorsAgg[0]?.totalDonors || 0;

    const runningCampaigns = await Campaign.countDocuments({
      createdBy: ngoId,
      status: "active",
    });

    const successfulCampaigns = await Campaign.countDocuments({
      createdBy: ngoId,
      status: "completed",
    });

    res.json({
      success: true,
      data: {
        // totalDonors,
        runningCampaigns,
        successfulCampaigns,
        totalAmount: donorsAgg[0]?.totalAmount || 0,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = getStats;
