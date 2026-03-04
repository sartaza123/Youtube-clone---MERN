const videoModel = require("../models/video.model");
const channelModel = require("../models/channel.model");

// ================= CREATE VIDEO =================
async function createVideo(req, res) {
  try {
    const { title, description, thumbnailUrl, videoUrl, category, channel } =
      req.body;

    const channelData = await channelModel.findById(channel);

    if (!channelData) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (channelData.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const newVideo = await videoModel.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channel,
    });

    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// ================= GET ALL VIDEOS =================
async function getAllVideos(req, res) {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const videos = await videoModel
      .find(filter)
      .populate("channel")
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// ================= GET VIDEOS BY CHANNEL =================
async function getVideosByChannel(req, res) {
  try {
    const videos = await videoModel
      .find({ channel: req.params.channelId })
      .populate("channel")
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// ================= GET SINGLE VIDEO =================
async function getVideoById(req, res) {
  try {
    const video = await videoModel.findById(req.params.id).populate("channel");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// ================= UPDATE VIDEO =================
async function updateVideo(req, res) {
  try {
    const video = await videoModel.findById(req.params.id).populate("channel");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (video.channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedVideo = await videoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// ================= DELETE VIDEO =================
async function deleteVideo(req, res) {
  try {
    const video = await videoModel.findById(req.params.id).populate("channel");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (video.channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await video.deleteOne();

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  getVideosByChannel,
};
