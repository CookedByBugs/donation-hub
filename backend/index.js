const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/db");
const api = require("./api/api");
app.use(
  cors({
    origin: "https://donaroid.vercel.app",
  }),
);
app.use(express.json());

connectDB();

api(app);

app.get("/", (req, res) => {
  res.send("Server health OK");
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`server running at http://localhost:${process.env.PORT || 8000}`);
});

module.exports = app;
