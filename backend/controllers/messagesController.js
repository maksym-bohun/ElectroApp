const MessageModel = require("../models/messageModel");
const ChatModel = require("../models/chatModel");
const catchAsync = require("../utils/catchAsync");

exports.addMessage = catchAsync(async (req, res, next) => {
  const { from, to, message, advertismentId } = req.body;
  let chat_id;
  const chatExists = await ChatModel.find({
    "users.sender": from,
    "users.author": to,
  });

  if (chatExists && chatExists.length === 0) {
    const newChat = await ChatModel.create({
      users: { sender: from, author: to },
      advertisement_id: advertismentId,
      created_at: Date.now(),
    });
    chat_id = newChat._id;
  } else {
    chat_id = chatExists[0]._id;
  }

  const data = await MessageModel.create({
    message: { text: message },
    users: [from, to],
    sender: from,
    chat_id,
  });
  if (data) {
    return res.json({ status: "success", msg: "Message added successfully" });
  }
  return req.json({
    status: "fail",
    msg: "Failed to add message to the database",
  });
});

exports.getMessagesFromChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await MessageModel.find({ chat_id: chatId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const deletedMessage = await MessageModel.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json(deletedMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};

exports.getAllMessages = catchAsync(async (req, res, next) => {
  console.log(req.body, "\n\n\n\n");
  const { from, to } = req.body;
  const chat = await ChatModel.find({
    "users.sender": from,
    "users.author": to,
  });
  const allMessages = await MessageModel.find({ chat_id: chat[0]._id })
    .sort({ updatedAt: 1 })
    .select("message sender");
  res.json({ status: "success", messages: allMessages });
});
