const Campaign = require("../../../models/campaign/campaign.model");

const getCampaigns = async (req, res) => {
  const { status, limit, page, search } = req.query;
  if (!status || !limit || !page) {
    return res.status(400).json({ msg: "Missing required fields" });
  }
  try {
    let campaigns;
    let total;
    if (search) {
      campaigns = await Campaign.find({
        createdBy: req.user._id || req.user.id,
        status,
        title: { $regex: search, $options: "i" },
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      total = await Campaign.countDocuments({
        createdBy: req.user._id || req.user.id,
        status,
        title: { $regex: search, $options: "i" },
      });
    } else {
      campaigns = await Campaign.find({
        createdBy: req.user._id || req.user.id,
        status,
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      total = await Campaign.countDocuments({
        createdBy: req.user._id || req.user.id,
        status,
      });
    }

    res.status(200).json({
      campaigns,
      msg: "success",
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching campaigns", error });
  }
};

module.exports = getCampaigns;
