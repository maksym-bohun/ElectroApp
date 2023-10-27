const MessageModel = require("../models/messageModel");
const ChatModel = require("../models/chatModel");
const catchAsync = require("../utils/catchAsync");

exports.addMessage = catchAsync(async (req, res, next) => {
  const { from, to, message, advertisement_id } = req.body;
  let chat_id;
  const chatExists = await ChatModel.findOne({
    $or: [
      { "users.sender": from, "users.author": to },
      { "users.sender": to, "users.author": from },
    ],
    advertisement_id,
  });

  if (chatExists && chatExists.length === 0) {
    const newChat = await ChatModel.create({
      users: { sender: from, author: to },
      advertisement_id,
      last_message: message,
    });
    chat_id = newChat._id;
  } else {
    chat_id = chatExists._id;
    chatExists.last_message = message;
    await chatExists.save();
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
  const { from, to, advertisement_id } = req.body;
  const chat = await ChatModel.findOne({
    $or: [
      { "users.sender": from, "users.author": to },
      { "users.sender": to, "users.author": from },
    ],
    advertisement_id,
  });

  const allMessages = await MessageModel.find({ chat_id: chat._id })
    .sort({ updatedAt: 1 })
    .select("message sender");
  res.json({ status: "success", messages: allMessages });
});
