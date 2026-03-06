import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    banner: {
      type: String,
      default: "",
    },

    // avatar
    avatar: {
      type: String,
      default: "",
    },

    // subscribers list
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // channel owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const channelModel = mongoose.model("Channel", channelSchema);

export default channelModel;
