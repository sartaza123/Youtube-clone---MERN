const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
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

//   =============== routes ===================

authRoutes(app);
userRoutes(app);

module.exports = app;
