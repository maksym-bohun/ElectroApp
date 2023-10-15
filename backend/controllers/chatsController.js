const ChatModel = require("../models/chatModel");

exports.createChat = async (req, res) => {
  try {
    const chatData = req.body;
    const chat = await ChatModel.create(chatData);
    const savedChat = await chat.save();
    res.json({ status: "success", chat: savedChat });
  } catch (error) {
    res.status(500).json({ error: "Failed to create chat" });
  }
};

exports.getChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat" });
  }
};

exports.updateChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chatData = req.body;
    const updatedChat = await ChatModel.findByIdAndUpdate(chatId, chatData, {
      new: true,
    });
    if (!updatedChat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.json(updatedChat);
  } catch (error) {
    res.status(500).json({ error: "Failed to update chat" });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const deletedChat = await ChatModel.findByIdAndDelete(chatId);
    if (!deletedChat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.json(deletedChat);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete chat" });
  }
};
