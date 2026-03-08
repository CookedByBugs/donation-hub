const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use((req, res, next) => {
  if (req.originalUrl.includes('/webhook')) {
    next(); // Skip JSON parsing for Stripe webhook — raw body required
  } else {
    express.json()(req, res, next);
  }
});
module.exports = app;
