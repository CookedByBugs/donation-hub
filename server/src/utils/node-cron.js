const cron = require("node-cron");
const Campaign = require("../models/campaign/campaign.model");

cron.schedule("*/5 * * * *", async () => {
  const now = new Date();

  await Campaign.updateMany(
    {
      endDate: { $lt: now },
      status: "active",
    },
    {
      status: "inactive",
    },
  );

  console.log("Checked expired campaigns");
});
