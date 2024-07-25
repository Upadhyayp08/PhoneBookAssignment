const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://upadhyayparth080:upadhyayparth080@cluster0.2cmuabt.mongodb.net/phoneBook"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
