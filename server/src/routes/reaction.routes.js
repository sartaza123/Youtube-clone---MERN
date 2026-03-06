import authMiddleware from "../middleware/auth.middleware.js";

import { likeVideo, dislikeVideo } from "../controller/reaction.controller.js";

function reactionRoutes(app) {
  app.put("/api/videos/:id/like", authMiddleware, likeVideo);

  app.put("/api/videos/:id/dislike", authMiddleware, dislikeVideo);
}

export default reactionRoutes;
