const authMiddleware = require("../middleware/auth.middleware");

const {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  getVideosByChannel,
} = require("../controller/video.controller");

function videoRoutes(app) {
  // Public Routes
  app.get("/api/videos", getAllVideos);

  // 🔹 Fetch videos by channel
  app.get("/api/videos/channel/:channelId", getVideosByChannel);

  app.get("/api/videos/:id", getVideoById);

  // Protected Routes
  app.post("/api/videos", authMiddleware, createVideo);
  app.put("/api/videos/:id", authMiddleware, updateVideo);
  app.delete("/api/videos/:id", authMiddleware, deleteVideo);
}

module.exports = videoRoutes;
