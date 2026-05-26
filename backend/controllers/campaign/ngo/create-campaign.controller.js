const Campaign = require("../../../models/campaign/campaign.model");
const fs = require("fs");
const { upload } = require("../../../utils/cloudinary");
const createController = async (req, res) => {
  try {
    if (!req.user || (!req.user._id && !req.user.id)) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "No images uploaded" });
    }

    const uploadResult = await Promise.all(
      req.files.map(async (file) => {
        try {
          const result = await upload(file.path, {
            folder: "campaign",
          });
          return result.secure_url;
        } catch (error) {
          console.log(error);
        } finally {
          fs.unlinkSync(file.path);
        }
      }),
    );

    const { title, goalAmount, category, endDate, description } = req.body;
    const campaign = new Campaign({
      title,
      raisedAmount: 0,
      goalAmount,
      category,
      endDate,
      image: uploadResult,
      description,
      createdBy: req.user._id || req.user.id,
    });
    await campaign.save();
    res.status(201).json({ campaign, msg: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error uploading images", error });
  }
};

module.exports = createController;
