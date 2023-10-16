const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
