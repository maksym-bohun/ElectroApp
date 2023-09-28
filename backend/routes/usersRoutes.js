const express = require("express");
const authController = require("./../controllers/authController");
const usersController = require("./../controllers/usersController");
const userPhotoUpload = require("../utils/userPhotoStorage");

const router = express.Router();

router
  .route("/signup")
  .post(userPhotoUpload.single("photo"), authController.signup);
router.route("/login").post(authController.login);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").post(authController.resetPassword);

router
  .route("/me")
  .get(authController.protect, usersController.getMe, usersController.getUser);

router.route("/:id").get(usersController.getUser);
router.route("/").get(usersController.getAllUsers);

router
  .route("/updateMyPassword")
  .post(authController.protect, authController.updatePassword);
module.exports = router;
