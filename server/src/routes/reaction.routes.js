const authMiddleware = require("../middleware/auth.middleware");

const {
  likeVideo,
  dislikeVideo,
} = require("../controller/reaction.controller");

function reactionRoutes(app) {
  app.put("/api/videos/:id/like", authMiddleware, likeVideo);

  app.put("/api/videos/:id/dislike", authMiddleware, dislikeVideo);
}

module.exports = reactionRoutes;
