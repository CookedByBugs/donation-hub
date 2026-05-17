const stripe = require("../../utils/stripe");
const Campaign = require("../../models/campaign/campaign.model");
const Donation = require("../../models/campaign/donation.model");
const pusher = require("../../pusher");
const stripeWebhook = async (req, res) => {
  // const io = req.app.get("io");

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json(`WEBHOOK ERROR ${error.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const amount = paymentIntent.amount / 100;
    const campaignId = paymentIntent.metadata.campaignId;

    await Donation.create({
      amount,
      donorId: paymentIntent.metadata.donorId,
      campaignId,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });

    const campaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { $inc: { raisedAmount: amount } },
      { new: true },
    );

    // Fire on every successful donation so the donor-side viewer updates in real-time
    pusher.trigger("campaigns", "donation_received", { campaignId });

    if (
      campaign.raisedAmount >= campaign.goalAmount &&
      campaign.status === "active"
    ) {
      campaign.status = "inactive";
      await campaign.save();

      pusher.trigger("campaigns", "campaign_completed", {
        campaignId: campaign._id,
      });
    }
  }

  res.json({ received: true });
};

module.exports = { stripeWebhook };
