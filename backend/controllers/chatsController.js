const ChatModel = require("../models/chatModel");
const UserModel = require("../models/userModel");
const ProductModel = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");

exports.createChat = async (req, res) => {
  try {
    const advertisement = req.body.advertisement_id;
    const sender = await UserModel.findById(req.body.sender).select(
      "name email phoneNumber"
    );
    const prod = await ProductModel.findById(advertisement)
      .select("author")
      .populate("author", "name email phoneNumber");
    const author = prod.author;
    const newChat = await ChatModel.create({
      users: { sender, author },
      advertisement_id: advertisement,
    });
    res.status(201).json({ status: "success", chat: newChat });
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
  try {
    const sender = req.body.sender;
    const { advertisement_id } = req.body;
    const chat = await ChatModel.findOne({
      $or: [{ "users.sender": sender }, { "users.author": sender }],
      advertisement_id,
    }).populate("users.sender users.author", "name photo");
    if (!chat) {
      return next();
    } else {
      return res.status(200).json({ status: "success", chat });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch chat" });
  }
});

exports.getAllUsersChats = catchAsync(async (req, res, next) => {
  const sell = await ChatModel.find({
    "users.author": req.user._id,
    last_message: { $ne: "" },
  }).populate("advertisement_id users.sender users.author");

  const buy = await ChatModel.find({
    "users.sender": req.user._id,
    last_message: { $ne: "" },
  }).populate("advertisement_id users.sender users.author");

  res.json({ status: "success", chats: { buy, sell } });
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
