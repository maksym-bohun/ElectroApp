const MessageModel = require("../models/messageModel");

exports.sendMessage = async (req, res) => {
  try {
    const messageData = req.body; // Данные для создания сообщения, включая chat_id, sender_id, text
    const message = MessageModel.create(messageData);
    const savedMessage = await message.save();
    res.json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to create message" });
  }
};

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
