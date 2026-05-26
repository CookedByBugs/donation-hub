const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/db");
const api = require("./api/api");

const corsOptions = {
  origin: "https://donaroid.vercel.app", // your frontend domain
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("/*", (req, res) => res.sendStatus(200));
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
