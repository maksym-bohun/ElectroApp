const ChatModel = require("../models/chatModel");

exports.createChat = async (req, res) => {
  console.log(req.body);
  try {
    const chat = await ChatModel.create(req.body);
    const savedChat = await chat.save();
    console.log("CHAT CREATED🫡🫡🫡🫡🫡🫡");
    res.status(201).json({ status: "success", chat: savedChat });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
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

exports.getChatByUsers = async (req, res, next) => {
  console.log("GETTING CHAT");
  console.log(req.body);
  try {
    const currentUser = req.body.users.filter(
      (user) => user.role === "user"
    )[0];
    const advertisment = req.body.advertisement_id;

    const chat = await ChatModel.find({
      advertisement_id: advertisment,
      users: {
        $elemMatch: {
          user_id: currentUser.user_id,
        },
      },
    });
    if (!chat) {
      res.status(500).json({ status: "fail" });
    }
    if (chat.length === 0) {
      next();
    } else {
      console.log("Chat found!💙💙💙💙");
      res.status(200).json({ status: "success", chat: chat[0] });
    }
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
