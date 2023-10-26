const express = require("express");
const chatsController = require("../controllers/chatsController");
const messagesController = require("../controllers/messagesController");
const authController = require("../controllers/authController");

const router = express.Router();

// router
//   .route("/")
//   .post(chatsController.getChatByUsers, chatsController.createChat);
// router
//   .route("/:chatId")
//   .post(authController.protect, chatsController.getChat)
//   .put(authController.protect, chatsController.updateChat)
//   .delete(authController.protect, chatsController.deleteChat);

router.route("/addMessage").post(messagesController.addMessage);
// router.route("/message/:messageId").delete(messagesController.sendMessage);
// router
//   .route("/message/chat/:chatId")
//   .get(authController.protect, messagesController.getMessagesFromChat);

module.exports = router;
