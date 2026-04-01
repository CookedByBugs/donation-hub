const mongoose = require("mongoose");
const Donations = require("../../../models/campaign/donation.model");

const getDonations = async (req, res) => {
  const { id } = req.query;
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  try {
    const totalDonations = await Donations.countDocuments({
      donorId: id,
      status: "succeeded",
    });
    const donations = await Donations.find({
      donorId: id,
      status: "succeeded",
    })
      .populate("campaignId", "title image")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    if (donations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No donations found",
      });
    }
    return res.status(200).json({
      success: true,
      donations,
      totalDonations,
      page,
      limit,
      totalPages: Math.ceil(totalDonations / limit),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = getDonations;
