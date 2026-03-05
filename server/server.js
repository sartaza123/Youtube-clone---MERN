// env config
require("dotenv").config();

// server and Dabatbase connection
const express = require("express");
const mongoose = require("mongoose");

// importing routes ================

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const videoRoutes = require("./src/routes/video.routes");
const channelRoutes = require("./src/routes/channel.routes");
const commentRoutes = require("./src/routes/comment.routes");
const reactionRoutes = require("./src/routes/reaction.routes");

const cors = require("cors");

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
app.use(cors());

// ================== routes ======================

authRoutes(app);
userRoutes(app);
videoRoutes(app);
channelRoutes(app);
commentRoutes(app);
reactionRoutes(app);

module.exports = app;

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
