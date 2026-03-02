const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const videoRoutes = require("./routes/video.routes");
const channelRoutes = require("./routes/channel.routes");
const commentRoutes = require("./routes/comment.routes");
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

// ================= Middleware ===================

app.use(express.json());

// ================== routes ======================

authRoutes(app);
userRoutes(app);
videoRoutes(app);
channelRoutes(app);
commentRoutes(app);

module.exports = app;
