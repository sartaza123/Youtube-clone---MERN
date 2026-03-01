const commentModel = require("../models/comment.model");

// ================= ADD COMMENT =================
async function addComment(req, res) {
  try {
    const { text, video } = req.body;

    const newComment = await commentModel.create({
      text,
      video,
      user: req.user.id,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// ================= GET COMMENTS BY VIDEO =================
async function getCommentsByVideo(req, res) {
  try {
    const comments = await commentModel
      .find({ video: req.params.videoId })
      .populate("user", "username");

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// ================= UPDATE COMMENT =================
async function updateComment(req, res) {
  try {
    const comment = await commentModel.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.text = req.body.text;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// ================= DELETE COMMENT =================
async function deleteComment(req, res) {
  try {
    const comment = await commentModel.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  addComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
};
