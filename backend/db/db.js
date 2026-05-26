const mongoose = require("mongoose");

let connection = false;
const connectDB = async () => {
  if (connection) return;
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    connection = true;
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
