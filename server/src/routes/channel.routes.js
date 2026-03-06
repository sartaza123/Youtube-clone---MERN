import authMiddleware from "../middleware/auth.middleware.js";
import {
  createChannel,
  getChannelById,
  getMyChannel,
  updateChannel,
  deleteChannel,
} from "../controller/channel.controller.js";

function channelRoutes(app) {
  // Public routes
  app.get("/api/channels/:id", getChannelById);

  // Protected routes
  app.post("/api/channels", authMiddleware, createChannel);
  app.get("/api/my-channel", authMiddleware, getMyChannel);
  app.put("/api/channels/:id", authMiddleware, updateChannel);
  app.delete("/api/channels/:id", authMiddleware, deleteChannel);
}

export default channelRoutes;
