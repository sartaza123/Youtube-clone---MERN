const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ================== CONNECT MONGODB ==================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = app;
