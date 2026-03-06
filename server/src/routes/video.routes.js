import authMiddleware from "../middleware/auth.middleware.js";

import {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  getVideosByChannel,
} from "../controller/video.controller.js";

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

export default videoRoutes;
