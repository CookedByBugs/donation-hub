const express = require("express");
const donorRouter = express.Router();
const verifyToken = require("../../../middlewares/verifyToken");

const getCampaigns = require("../../../controllers/campaign/donor/get-campaign.controller");
const getDonations = require("../../../controllers/campaign/donor/get-donations.controller");
const totalDonation = require("../../../controllers/campaign/donor/total-donation.controller");

donorRouter.get("/all", verifyToken, getCampaigns);
donorRouter.get("/donations", verifyToken, getDonations);
donorRouter.get("/total-donation/:id", verifyToken, totalDonation);

module.exports = donorRouter;
