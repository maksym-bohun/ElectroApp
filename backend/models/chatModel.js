const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    users: {
      sender: { type: mongoose.Schema.ObjectId, ref: "User" },
      author: { type: mongoose.Schema.ObjectId, ref: "User" },
    },

    advertisement_id: mongoose.Schema.ObjectId,
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;
