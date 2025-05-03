const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");

// Load environment variables
dotenv.config({ path: "./config.env" });

// Import Express App
const app = require("./app");

// Environment Variables
const serverENV = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;

// Database Connection String
const DBConString ="mongodb+srv://Rajhans:rajhans1234@cluster0.r29kd1u.mongodb.net/"

// MongoDB Connection Options
const DBOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB
(async () => {
  try {
    await mongoose.connect(DBConString, DBOptions);
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process if DB connection fails
  }
})();

// Start Server
const server = app.listen(port, () => {
  console.log(`🚀 Server running on port ${port} [${serverENV}]`);
});
