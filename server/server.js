// env config
import dotenv from "dotenv";
dotenv.config();

// server and Database connection
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// importing routes ================
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import videoRoutes from "./src/routes/video.routes.js";
import channelRoutes from "./src/routes/channel.routes.js";
import commentRoutes from "./src/routes/comment.routes.js";
import reactionRoutes from "./src/routes/reaction.routes.js";

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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
