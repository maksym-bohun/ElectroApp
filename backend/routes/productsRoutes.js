const express = require("express");
const productsController = require("../controllers/productsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, productsController.getAllProducts)
  .post(productsController.createProduct);

router.route("/:id").get(productsController.getProduct).patch();

module.exports = router;
