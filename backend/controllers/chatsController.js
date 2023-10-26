const ChatModel = require("../models/chatModel");
const ProductModel = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");

exports.createChat = async (req, res) => {
  console.log(req.body);
  console.log("Creating chat 🫡🫡🫡🫡🫡🫡🫡");
  try {
    const advertisment = req.body.advertisement_id;
    const prod = await ProductModel.findById(advertisment)
      .select("author")
      .populate("author", "name email phoneNumber");
    const author = prod.author;
    const newChat = await ChatModel.create({
      users: { sender: req.body.sender, author },
      advertisement_id: advertisment,
      created_at: Date.now(),
    });
    res.status(201).json({ status: "success", chat: savedChat });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

exports.getChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await ChatModel.findById(chatId);
    // if (!chat) {
    //   return res.status(404).json({ error: "Chat not found" });
    // }
    // res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat" });
  }
};

exports.getChatByUsers = catchAsync(async (req, res, next) => {
  console.log("GETTING CHAT");
  const advertisment = req.body.advertisement_id;
  try {
    const sender = req.body.sender;
    const advertisment = req.body.advertisement_id;

    const chat = await ChatModel.find({
      advertisement_id: advertisment,
      "users.sender": sender._id,
    }).populate("users.sender users.author", "name photo");
    console.log("CHAT", chat);
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
});

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
