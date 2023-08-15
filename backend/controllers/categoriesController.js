const Category = require("../models/categoryModel");

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find().populate(
    "products",
    "name price _id"
  );
  res.status(200).json({ status: "success", data: categories });
};

exports.getCategory = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).populate(
    "products",
    "name price"
  );
  res.status(200).json({ status: "success", data: category });
};

exports.createCategory = async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json({ status: "success", data: newCategory });
};
