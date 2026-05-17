// const mongoose = require("mongoose");
// require("dotenv").config();
// const dns = require("node:dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const connectDB = async () => {
//   await mongoose
//     .connect(process.env.MONGODB_URL)
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.log("MongoDB connection error", err));
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb && mongoose.connection.readyState >= 1) {
    return cachedDb;
  }
  const db = await mongoose.connect(process.env.MONGODB_URL);
  cachedDb = db;
  console.log("MongoDB connected");
  return db;
};

module.exports = connectDB;
