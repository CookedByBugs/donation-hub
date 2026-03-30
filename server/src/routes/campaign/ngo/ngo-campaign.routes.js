const express = require("express");
const multer = require("multer");
const verifyToken = require("../../../middlewares/verifyToken");
const ngoCampaignRouter = express.Router();
const upload = multer({ dest: "uploads/" });

const createController = require("../../../controllers/campaign/ngo/create-campaign.controller");
const activeController = require("../../../controllers/campaign/ngo/get-active.campaign.controller");
const getSingleController = require("../../../controllers/campaign/ngo/get-single.campaign.controller");
const updateController = require("../../../controllers/campaign/ngo/update-campaign.controller");
const deleteController = require("../../../controllers/campaign/delete-campaign.controller");
const setCompletedController = require("../../../controllers/campaign/ngo/set-completed.campaign.controller");
const getCompletedCampaignController = require("../../../controllers/campaign/ngo/get-completeed.campaign.controller");

ngoCampaignRouter.post(
  "/create",
  verifyToken,
  upload.array("images"),
  createController,
);
ngoCampaignRouter.get("/active", verifyToken, activeController);
ngoCampaignRouter.get("/get/:id", verifyToken, getSingleController);
ngoCampaignRouter.put(
  "/update/:id",
  verifyToken,
  upload.array("images"),
  updateController,
);
ngoCampaignRouter.delete("/delete/:id", verifyToken, deleteController);
ngoCampaignRouter.put(
  "/set-completed/:id",
  verifyToken,
  setCompletedController,
);
ngoCampaignRouter.get(
  "/get-completed",
  verifyToken,
  getCompletedCampaignController,
);

module.exports = ngoCampaignRouter;
