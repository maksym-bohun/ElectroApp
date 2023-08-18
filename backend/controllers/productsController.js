const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().populate("category", "name");
  res.status(200).json({ status: "success", data: products });
};

exports.createProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({ status: "success", data: { product: newProduct } });
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({ status: "success", data: product });
};
