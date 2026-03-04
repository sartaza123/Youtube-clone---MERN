const authMiddleware = require("../middleware/auth.middleware");
const {
  createChannel,
  getChannelById,
  getMyChannel,
  updateChannel,
  deleteChannel,
} = require("../controller/channel.controller");

function channelRoutes(app) {
  // Public routes
  app.get("/api/channels/:id", getChannelById);

  // Protected routes
  app.post("/api/channels", authMiddleware, createChannel);
  app.get("/api/my-channel", authMiddleware, getMyChannel);
  app.put("/api/channels/:id", authMiddleware, updateChannel);
  app.delete("/api/channels/:id", authMiddleware, deleteChannel);
}

module.exports = channelRoutes;
