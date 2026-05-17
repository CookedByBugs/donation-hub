const stripe = require("../../utils/stripe");
const Campaign = require("../../models/campaign/campaign.model");
const Donation = require("../../models/campaign/donation.model");
const pusher = require("../../pusher");

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, campaignId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: "usd",
      metadata: {
        campaignId,
        donorId: req.user.id,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ error: "Payment has not succeeded" });
    }

    const amount = paymentIntent.amount / 100;
    const campaignId = paymentIntent.metadata.campaignId;
    const donorId = paymentIntent.metadata.donorId;

    const existing = await Donation.findOne({ paymentIntentId });
    if (existing) {
      return res.status(200).json({ message: "Donation already recorded" });
    }

    await Donation.create({
      amount,
      donorId,
      campaignId,
      paymentIntentId,
      status: paymentIntent.status,
    });

    const campaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { $inc: { raisedAmount: amount } },
      { new: true },
    );

    await pusher.trigger("campaigns", "donation_received", {
      amount,
      donorId,
      campaignId,
      paymentIntentId,
      status: paymentIntent.status,
    });

    if (
      campaign.raisedAmount >= campaign.goalAmount &&
      campaign.status === "active"
    ) {
      campaign.status = "inactive";
      await campaign.save();

      await pusher.trigger("campaigns", "campaign_completed", {
        campaignId: campaign._id,
      });
    }

    res.status(200).json({ message: "Donation confirmed and recorded" });
  } catch (error) {
    console.error("confirmPayment error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaymentIntent, confirmPayment };
