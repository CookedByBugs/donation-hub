const userRouter = require("./user/user.api");
const ngoCampaignRouter = require("./campaign/ngo/ngo-campaign.api");
const donorCampaignRouter = require("./campaign/donor/donar-campaign.api");
const paymentRouter = require("./campaign/payments/payment.api");

const api = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/campaign/", ngoCampaignRouter);
  app.use("/api/campaign/", donorCampaignRouter);
  app.use("/api/payment/", paymentRouter);
};

module.exports = api;
