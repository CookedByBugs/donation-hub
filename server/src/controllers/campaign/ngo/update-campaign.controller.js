const Campaign = require("../../../models/campaign/campaign.model");
const fs = require("fs");
const { upload } = require("../../../utils/cloudinary/cloudinary");
const updateController = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ msg: "Campaign not found" });
    }
    const {
      title,
      goalAmount,
      category,
      endDate,
      description,
      existingImages,
    } = req.body;

    let existing = existingImages;
    if (!Array.isArray(existing)) {
      existing = [existing];
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
      })
    );
    console.log("existingImages: ", existingImages);
    console.log("uploadResult: ", uploadResult);
    let images = [];
    if (existing && existing[0]) {
      images.push(...existing);
    }
    if (uploadResult && uploadResult.length > 0) {
      images.push(...uploadResult);
    }
    if (
      !title.trim() ||
      !goalAmount.trim() ||
      !category.trim() ||
      !endDate.trim() ||
      !description.trim()
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      {
        title,
        goalAmount,
        category,
        endDate,
        description,
        image: images,
        createdBy: req.user._id || req.user.id,
      },
      { new: true }
    );
    console.log(updatedCampaign);
    res.status(200).json({ campaign: updatedCampaign, msg: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating campaign", error });
  }
};
module.exports = updateController;
