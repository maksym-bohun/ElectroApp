const express = require("express");
const chatsController = require("../controllers/chatsController");
const messagesController = require("../controllers/messagesController");

const router = express.Router();

router
  .route("/")
  .post(chatsController.getChatByUsers, chatsController.createChat);
router
  .route("/:chatId")
  .post(chatsController.getChat)
  .put(chatsController.updateChat)
  .delete(chatsController.deleteChat);

router.route("/message").post(messagesController.sendMessage);
router.route("/message/:messageId").delete(messagesController.sendMessage);
router
  .route("/message/chat/:chatId")
  .get(messagesController.getMessagesFromChat);

module.exports = router;
