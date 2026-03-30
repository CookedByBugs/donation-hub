const express = require("express");
const donorRouter = express.Router();
const verifyToken = require("../../../middlewares/verifyToken");

const getCampaigns = require("../../../controllers/campaign/donor/get-campaign.controller");

donorRouter.get("/", verifyToken, getCampaigns);

module.exports = donorRouter;
