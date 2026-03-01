const authMiddleware = require("../middleware/auth.middleware");
const {
  addComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
} = require("../controller/comment.controller");

function commentRoutes(app) {
  // Public
  app.get("/api/comments/:videoId", getCommentsByVideo);

  // Protected
  app.post("/api/comments", authMiddleware, addComment);
  app.put("/api/comments/:id", authMiddleware, updateComment);
  app.delete("/api/comments/:id", authMiddleware, deleteComment);
}

module.exports = commentRoutes;
