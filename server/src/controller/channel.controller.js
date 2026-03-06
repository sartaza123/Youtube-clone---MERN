import channelModel from "../models/channel.model.js";

/* ================= CREATE CHANNEL ================= */

async function createChannel(req, res) {
  try {
    const { channelName, description, banner, avatar } = req.body;

    if (!channelName || !channelName.trim()) {
      return res.status(400).json({
        message: "Channel name is required",
      });
    }

    // Check if user already has a channel
    const existingChannel = await channelModel.findOne({
      owner: req.user.id,
    });

    if (existingChannel) {
      return res.status(400).json({
        message: "User already has a channel",
      });
    }

    const newChannel = await channelModel.create({
      channelName: channelName.trim(),
      description: description || "",
      banner: banner || "",
      avatar: avatar || "",
      owner: req.user.id,
    });

    res.status(201).json(newChannel);
  } catch (error) {
    console.error("Create Channel Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

/* ================= GET CHANNEL BY ID ================= */

async function getChannelById(req, res) {
  try {
    const channel = await channelModel
      .findById(req.params.id)
      .populate("owner", "-password");

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.status(200).json(channel);
  } catch (error) {
    console.error("Get Channel By ID Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

/* ================= GET MY CHANNEL ================= */

async function getMyChannel(req, res) {
  try {
    const channel = await channelModel.findOne({
      owner: req.user.id,
    });

    // IMPORTANT FIX:
    // return null instead of 404 if user has no channel
    if (!channel) {
      return res.status(200).json(null);
    }

    res.status(200).json(channel);
  } catch (error) {
    console.error("Get My Channel Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

/* ================= UPDATE CHANNEL ================= */

async function updateChannel(req, res) {
  try {
    const channel = await channelModel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedChannel = await channelModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json(updatedChannel);
  } catch (error) {
    console.error("Update Channel Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

/* ================= DELETE CHANNEL ================= */

async function deleteChannel(req, res) {
  try {
    const channel = await channelModel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await channel.deleteOne();

    res.status(200).json({
      message: "Channel deleted successfully",
    });
  } catch (error) {
    console.error("Delete Channel Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export {
  createChannel,
  getChannelById,
  getMyChannel,
  updateChannel,
  deleteChannel,
};
