import videoModel from "../models/video.model.js";

/* ================= LIKE VIDEO ================= */

async function likeVideo(req, res) {
  try {
    const video = await videoModel.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const userId = req.user.id;

    // ensure arrays exist
    if (!video.likes) video.likes = [];
    if (!video.dislikes) video.dislikes = [];

    const liked = video.likes.some((id) => id.toString() === userId);
    const disliked = video.dislikes.some((id) => id.toString() === userId);

    if (disliked) {
      video.dislikes = video.dislikes.filter((id) => id.toString() !== userId);
    }

    if (liked) {
      video.likes = video.likes.filter((id) => id.toString() !== userId);
    } else {
      video.likes.push(userId);
    }

    await video.save();

    res.status(200).json({
      likes: video.likes,
      dislikes: video.dislikes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

/* ================= DISLIKE VIDEO ================= */

async function dislikeVideo(req, res) {
  try {
    const video = await videoModel.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const userId = req.user.id;

    if (!video.likes) video.likes = [];
    if (!video.dislikes) video.dislikes = [];

    const liked = video.likes.some((id) => id.toString() === userId);
    const disliked = video.dislikes.some((id) => id.toString() === userId);

    if (liked) {
      video.likes = video.likes.filter((id) => id.toString() !== userId);
    }

    if (disliked) {
      video.dislikes = video.dislikes.filter((id) => id.toString() !== userId);
    } else {
      video.dislikes.push(userId);
    }

    await video.save();

    res.status(200).json({
      likes: video.likes,
      dislikes: video.dislikes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export { likeVideo, dislikeVideo };
