const express = require("express");
const multer = require("multer");
const verifyToken = require("../../../middlewares/verifyToken");
const ngoCampaignRouter = express.Router();
const upload = multer({ dest: "uploads/" });

const createController = require("../../../controllers/campaign/ngo/create-campaign.controller");
const getCampaigns = require("../../../controllers/campaign/ngo/getCampaigns.campaign.controller");
const getSingleController = require("../../../controllers/campaign/ngo/get-single.campaign.controller");
const updateController = require("../../../controllers/campaign/ngo/update-campaign.controller");
const updateStatusController = require("../../../controllers/campaign/ngo/update-status.campaign.controller");
const getLatestDonationsController = require("../../../controllers/campaign/ngo/get-latest-donations.controller");
const getTopCampaigns = require("../../../controllers/campaign/ngo/top-campaigns.controller");
const getStats = require("../../../controllers/campaign/ngo/get-stats.controller");
ngoCampaignRouter.post(
  "/create",
  verifyToken,
  upload.array("images"),
  createController,
);
ngoCampaignRouter.put(
  "/update/:id",
  verifyToken,
  upload.array("images"),
  updateController,
);
ngoCampaignRouter.put(
  "/update-status/:id",
  verifyToken,
  updateStatusController,
);
ngoCampaignRouter.get("/get/:id", verifyToken, getSingleController);
ngoCampaignRouter.get("/", verifyToken, getCampaigns);
ngoCampaignRouter.get(
  "/latest-donations",
  verifyToken,
  getLatestDonationsController,
);
ngoCampaignRouter.get("/top-campaigns", verifyToken, getTopCampaigns);
ngoCampaignRouter.get("/stats", verifyToken, getStats);

module.exports = ngoCampaignRouter;
