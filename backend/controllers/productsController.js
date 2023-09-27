const Product = require("../models/productModel");
const User = require("../models/userModel");
const multer = require("multer");
const upload = require("../utils/productsStorage");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find()
    .populate("category", "name")
    .populate({
      path: "author",
      select: "name phoneNumber email photo products",
      populate: {
        path: "products",
        select: "images name _id price location technicalInfo description",
      },
    });
  res.status(200).json({ status: "success", data: products });
};

exports.createProduct = async (req, res) => {
  // try {
  //   const title = "TITLE";
  //   const price = 111;
  //   const images = req.files;
  //   images.forEach((img) => console.log(Date.now() + img.originalname));

  //   // const product = Product.create({
  //   //   name: title,
  //   //   price,
  //   //   images,
  //   // });

  //   res.status(201).json({ message: "Продукт успешно добавлен" });
  // } catch (err) {
  //   // console.error(err);
  //   res.status(500).json({ error: "Ошибка при сохранении продукта" });
  // }

  try {
    // console.log(req.body);
    // console.log(req.files);
    const images = req.files.map((file) => file.filename);
    const { technicalInfo } = req.body;

    const techInfo = JSON.parse(technicalInfo);

    const newProduct = await Product.create({
      ...req.body,
      technicalInfo: techInfo,
      images,
    });

    newProduct.author = req.user._id;
    newProduct.save();
    await User.findByIdAndUpdate(req.user.id, {
      $push: { products: newProduct._id },
    });
    res.status(201).json({ status: "success", data: { product: newProduct } });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find({}, "-__v");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при получении продуктов" });
  }

  // try {
  //   const product = await Product.findById(req.params.id).populate({
  //     path: "author",
  //     select: "name phoneNumber email photo products",
  //     populate: {
  //       path: "products",
  //       select: "images name _id price location technicalInfo",
  //     },
  //   });

  //   product.views += 1;

  //   await product.save();

  //   res.status(200).json({ status: "success", data: product });
  // } catch (error) {
  //   res.status(500).json({ status: "error", message: error.message });
  // }
};

exports.addPhoneNumberView = async (req, res) => {
  const product = await Product.findById(req.params.id);

  product.phoneNumberViews += 1;
  product.save();

  res.status(200).json({ status: "success", data: product });
};

exports.likeProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const user = await User.findById(req.user._id);

  product.likes += 1;
  user.likedProducts.push(product);

  product.save();
  user.save();

  res.status(200).json({ status: "success", message: "Product liked" });
};

exports.dislikeProduct = async (req, res) => {
  try {
    const productIdToRemove = req.params.id; // Get the product ID to remove

    const product = await Product.findById(productIdToRemove);
    const user = await User.findById(req.user._id);

    if (!product || !user) {
      return res
        .status(404)
        .json({ status: "fail", message: "Product or user not found" });
    }

    product.likes -= 1;

    // Remove the product's ObjectId from the likedProducts array
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { likedProducts: productIdToRemove } }
    );

    await product.save();
    await user.save();

    res.status(200).json({ status: "success", message: "Product disliked" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};
