const express = require("express");
const donorRouter = express.Router();
const verifyToken = require("../../../middlewares/verifyToken");

const getCampaigns = require("../../../controllers/campaign/donor/get-campaign.controller");
const getDonations = require("../../../controllers/campaign/donor/get-donations.controller");

donorRouter.get("/", verifyToken, getCampaigns);
donorRouter.get("/donations", verifyToken, getDonations);

module.exports = donorRouter;
