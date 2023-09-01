const express = require("express");
const productsController = require("../controllers/productsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  // authController.protect,
  .get(productsController.getAllProducts)
  .post(authController.protect, productsController.createProduct);

router.route("/:id").get(productsController.getProduct).patch();

router
  .route("/addPhoneNumberView/:id")
  .get(productsController.addPhoneNumberView);

router
  .route("/likeProduct/:id")
  .get(authController.protect, productsController.likeProduct);

router
  .route("/dislikeProduct/:id")
  .get(authController.protect, productsController.dislikeProduct);

module.exports = router;
