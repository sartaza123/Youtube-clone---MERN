import authMiddleware from "../middleware/auth.middleware.js";
import {
  addComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
} from "../controller/comment.controller.js";

function commentRoutes(app) {
  // Public
  app.get("/api/comments/:videoId", getCommentsByVideo);

  // Protected
  app.post("/api/comments", authMiddleware, addComment);
  app.put("/api/comments/:id", authMiddleware, updateComment);
  app.delete("/api/comments/:id", authMiddleware, deleteComment);
}

export default commentRoutes;
