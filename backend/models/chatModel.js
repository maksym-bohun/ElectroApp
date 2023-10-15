const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  users: [
    {
      user_id: mongoose.Schema.ObjectId,
      role: String,
    },
  ],
  advertisement_id: mongoose.Schema.ObjectId,
  created_at: Date,
});

const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;
