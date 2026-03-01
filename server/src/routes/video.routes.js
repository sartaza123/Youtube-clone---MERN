const authMiddleware = require("../middleware/auth.middleware");
const {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} = require("../controller/video.controller");

function videoRoutes(app) {
  // Public Routes
  app.get("/api/videos", getAllVideos);
  app.get("/api/videos/:id", getVideoById);

  // Protected Routes
  app.post("/api/videos", authMiddleware, createVideo);
  app.put("/api/videos/:id", authMiddleware, updateVideo);
  app.delete("/api/videos/:id", authMiddleware, deleteVideo);
}

module.exports = videoRoutes;
